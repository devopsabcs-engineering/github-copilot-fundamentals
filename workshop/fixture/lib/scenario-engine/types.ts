/**
 * Shared contract for the synthetic content-request validator.
 *
 * This module is intentionally small. It holds the enums the validator checks
 * membership against, the shape of a well-formed request, and the discriminated
 * result type the validator returns.
 *
 * Everything here is synthetic classroom material. It models a request to
 * produce a short piece of written content and nothing else.
 */

/** Kind of content the request is asking for. Required on every request. */
export enum ContentCategory {
  Tutorial = 'tutorial',
  Reference = 'reference',
  Overview = 'overview',
}

/** How much detail the finished content should carry. Optional. */
export enum DetailLevel {
  Basic = 'basic',
  Standard = 'standard',
  Extended = 'extended',
}

/** Rough size of the finished content. Optional. */
export enum OutputLength {
  Short = 'short',
  Medium = 'medium',
  Long = 'long',
}

/**
 * A request that has passed validation.
 *
 * Free-text fields are already trimmed. Optional fields are `undefined` when
 * the caller omitted them; the validator never substitutes a default.
 */
export interface GenerateRequest {
  title: string;
  category: ContentCategory;
  summary: string;
  detailLevel?: DetailLevel;
  outputLength?: OutputLength;
}

/**
 * Discriminated result. Narrow on `success` before reading `data` or `error`.
 *
 * A `success: true` result guarantees a fully normalized `GenerateRequest`.
 * A `success: false` result guarantees an `error` string and carries no data.
 */
export type ValidationResult =
  | { success: true; data: GenerateRequest }
  | { success: false; error: string };
