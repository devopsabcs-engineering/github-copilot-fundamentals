import { describe, expect, it } from 'vitest';

import { ContentCategory, DetailLevel, OutputLength } from './types';
import { validateGenerateRequest } from './validateGenerateRequest';

/**
 * Baseline suite for the synthetic content-request validator.
 *
 * Every request below is invented classroom material. The suite pins the four
 * behaviors the validator promises: a fixed validation order, trimmed free
 * text, exact enum membership, and omitted optional fields left undefined.
 */

const validRequest = {
  title: '  Sorting coloured cards  ',
  category: 'tutorial',
  summary: '  Group the cards by colour, then by size.  ',
};

describe('normalization on success', () => {
  it('trims free text and returns a fully normalized request', () => {
    expect(
      validateGenerateRequest({
        ...validRequest,
        detailLevel: 'standard',
        outputLength: 'medium',
      }),
    ).toStrictEqual({
      success: true,
      data: {
        title: 'Sorting coloured cards',
        category: ContentCategory.Tutorial,
        summary: 'Group the cards by colour, then by size.',
        detailLevel: DetailLevel.Standard,
        outputLength: OutputLength.Medium,
      },
    });
  });

  it('trims only the outer whitespace and keeps inner spacing intact', () => {
    const result = validateGenerateRequest({
      ...validRequest,
      title: '\t  Two   inner   spaces  \n',
    });

    expect(result).toMatchObject({
      success: true,
      data: { title: 'Two   inner   spaces' },
    });
  });

  it('leaves omitted optional fields undefined instead of defaulting them', () => {
    const result = validateGenerateRequest(validRequest);

    expect(result.success).toBe(true);
    if (!result.success) return;

    expect(result.data).toStrictEqual({
      title: 'Sorting coloured cards',
      category: ContentCategory.Tutorial,
      summary: 'Group the cards by colour, then by size.',
      detailLevel: undefined,
      outputLength: undefined,
    });
    expect(result.data.detailLevel).toBeUndefined();
    expect(result.data.outputLength).toBeUndefined();
  });

  it('preserves supplied optional enum values without altering them', () => {
    expect(
      validateGenerateRequest({
        ...validRequest,
        detailLevel: 'extended',
        outputLength: 'long',
      }),
    ).toMatchObject({
      success: true,
      data: {
        detailLevel: DetailLevel.Extended,
        outputLength: OutputLength.Long,
      },
    });
  });
});

describe('step 1, the body must be a plain JSON object', () => {
  it.each([
    ['null', null],
    ['an array', []],
    ['a string', 'not an object'],
    ['a number', 42],
    ['a boolean', true],
  ])('rejects %s', (_label, body) => {
    expect(validateGenerateRequest(body)).toStrictEqual({
      success: false,
      error: 'Request body must be a JSON object',
    });
  });
});

describe('step 2, required fields must survive trimming', () => {
  it.each(['title', 'category', 'summary'])(
    'rejects a whitespace-only %s as a missing required field',
    (field) => {
      expect(
        validateGenerateRequest({ ...validRequest, [field]: '   ' }),
      ).toStrictEqual({
        success: false,
        error: 'Missing required fields: title, category, summary',
      });
    },
  );

  it.each(['title', 'category', 'summary'])(
    'rejects an absent %s',
    (field) => {
      const body: Record<string, unknown> = { ...validRequest };
      delete body[field];

      expect(validateGenerateRequest(body)).toStrictEqual({
        success: false,
        error: 'Missing required fields: title, category, summary',
      });
    },
  );
});

describe('step 3, the required enum-backed field', () => {
  it('reports the required-field error before the enum error', () => {
    expect(
      validateGenerateRequest({
        ...validRequest,
        title: '   ',
        category: 'not-a-category',
      }),
    ).toStrictEqual({
      success: false,
      error: 'Missing required fields: title, category, summary',
    });
  });

  it('distinguishes a blank category from an unknown category', () => {
    expect(
      validateGenerateRequest({ ...validRequest, category: '   ' }),
    ).toStrictEqual({
      success: false,
      error: 'Missing required fields: title, category, summary',
    });

    expect(
      validateGenerateRequest({ ...validRequest, category: 'not-a-category' }),
    ).toStrictEqual({
      success: false,
      error: 'Unsupported category: not-a-category',
    });
  });

  it.each([
    ['a different case', 'Tutorial'],
    ['surrounding whitespace', ' tutorial '],
  ])('rejects a known value with %s', (_label, value) => {
    expect(
      validateGenerateRequest({ ...validRequest, category: value }),
    ).toStrictEqual({
      success: false,
      error: `Unsupported category: ${value}`,
    });
  });
});

describe('step 4, supplied optional enum-backed fields', () => {
  it.each([
    ['detailLevel', 'not-a-level'],
    ['outputLength', 'not-a-length'],
  ])('rejects an unsupported %s', (field, value) => {
    expect(
      validateGenerateRequest({ ...validRequest, [field]: value }),
    ).toStrictEqual({
      success: false,
      error: `Unsupported ${field}: ${value}`,
    });
  });

  it.each(['detailLevel', 'outputLength'])(
    'rejects an explicit null %s even though omission is allowed',
    (field) => {
      expect(
        validateGenerateRequest({ ...validRequest, [field]: null }),
      ).toStrictEqual({
        success: false,
        error: `Unsupported ${field}: null`,
      });
    },
  );

  it('checks detailLevel before outputLength', () => {
    expect(
      validateGenerateRequest({
        ...validRequest,
        detailLevel: 'not-a-level',
        outputLength: 'not-a-length',
      }),
    ).toStrictEqual({
      success: false,
      error: 'Unsupported detailLevel: not-a-level',
    });
  });
});
