import { describe, expect, it } from 'vitest';

import { isContains } from '../isContains';

describe('isContains', () => {
  it('returns true when query is fully contained in target', () => {
    expect(isContains({ query: 'test', target: 'this is a test' })).toBe(true);
  });

  it('returns false when query is partially contained in target', () => {
    expect(isContains({ query: 'testing', target: 'this is a test' })).toBe(false);
  });

  it('returns false when query is not contained in target at all', () => {
    expect(isContains({ query: 'example', target: 'this is a test' })).toBe(false);
  });

  it('returns true when query and target are the same', () => {
    expect(isContains({ query: 'test', target: 'test' })).toBe(true);
  });

  it('returns true when query is an empty string', () => {
    expect(isContains({ query: '', target: 'this is a test' })).toBe(true);
  });

  it('returns false when target is an empty string', () => {
    expect(isContains({ query: 'test', target: '' })).toBe(false);
  });

  it('returns true when query is contained in target with different case', () => {
    expect(isContains({ query: 'Test', target: 'this is a test' })).toBe(true);
  });

  it('returns true when query is contained in target with different kana type', () => {
    expect(isContains({ query: 'テスト', target: 'てすと' })).toBe(true);
  });

  it('returns true when query is contained in target with different hankaku kana type', () => {
    expect(isContains({ query: 'ﾃｽﾄ', target: 'てすと' })).toBe(true);
  });
});
