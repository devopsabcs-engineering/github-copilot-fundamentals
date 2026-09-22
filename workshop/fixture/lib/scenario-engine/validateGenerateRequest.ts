import {
  ContentCategory,
  DetailLevel,
  OutputLength,
  type GenerateRequest,
  type ValidationResult,
} from './types';

/**
 * Field names that must be present and non-blank on every request.
 *
 * The rejection message lists all of them rather than only the offending one,
 * so the message stays stable no matter which field is blank.
 */
const REQUIRED_FIELDS = ['title', 'category', 'summary'] as const;

/**
 * Private guard for free-text fields.
 *
 * A value counts as present only when it is a string that still has content
 * after trimming, so a whitespace-only value is treated as absent.
 */
function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

/**
 * Private guard for enum-backed fields.
 *
 * Membership is exact and case-sensitive, and the value is not trimmed before
 * the comparison.
 */
function isAllowedValue<T extends string>(
  value: unknown,
  allowed: readonly T[],
): value is T {
  return (
    typeof value === 'string' && (allowed as readonly string[]).includes(value)
  );
}

/**
 * Validate an unknown request body.
 *
 * The validation order is fixed and every step returns on the first failure:
 *
 * 1. the body must be a plain JSON object
 * 2. every required field must be a non-blank string
 * 3. the required enum-backed field `category` must be a known member
 * 4. each supplied optional enum-backed field must be a known member
 * 5. free text is trimmed and omitted optional fields stay `undefined`
 *
 * Step 2 runs before step 3, so on a baseline build a whitespace-only
 * `category` is reported as a missing required field rather than as an
 * unsupported enum value. A non-blank but unknown `category` reaches step 3 and
 * is reported as unsupported. That difference is the ordering made visible.
 *
 * @param body - unvalidated input, typically a parsed JSON payload
 * @returns a discriminated result; narrow on `success` before reading further
 */
export function validateGenerateRequest(body: unknown): ValidationResult {
  if (typeof body !== 'object' || body === null || Array.isArray(body)) {
    return { success: false, error: 'Request body must be a JSON object' };
  }

  const candidate = body as Record<string, unknown>;

  const hasEveryRequiredField = REQUIRED_FIELDS.every((field) =>
    isNonEmptyString(candidate[field]),
  );
  if (!hasEveryRequiredField) {
    return {
      success: false,
      error: `Missing required fields: ${REQUIRED_FIELDS.join(', ')}`,
    };
  }

  if (!isAllowedValue(candidate.category, Object.values(ContentCategory))) {
    return {
      success: false,
      error: `Unsupported category: ${String(candidate.category)}`,
    };
  }

  if (
    candidate.detailLevel !== undefined &&
    !isAllowedValue(candidate.detailLevel, Object.values(DetailLevel))
  ) {
    return {
      success: false,
      error: `Unsupported detailLevel: ${String(candidate.detailLevel)}`,
    };
  }

  if (
    candidate.outputLength !== undefined &&
    !isAllowedValue(candidate.outputLength, Object.values(OutputLength))
  ) {
    return {
      success: false,
      error: `Unsupported outputLength: ${String(candidate.outputLength)}`,
    };
  }

  const data: GenerateRequest = {
    title: (candidate.title as string).trim(),
    category: candidate.category,
    summary: (candidate.summary as string).trim(),
    detailLevel: candidate.detailLevel as DetailLevel | undefined,
    outputLength: candidate.outputLength as OutputLength | undefined,
  };

  return { success: true, data };
}
