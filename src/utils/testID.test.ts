import { concatTestID } from './testID';

describe('concatTestID', () => {
  it('concatenates testID parts', () => {
    expect(concatTestID('A')).toBe('A');
    expect(concatTestID('A', 'B')).toBe('A.B');
    expect(concatTestID('A', 'B', 'C')).toBe('A.B.C');
  });

  it('recognizes missing parts', () => {
    expect(concatTestID('')).toBe(undefined);
    expect(concatTestID(undefined)).toBe(undefined);
    expect(concatTestID('', 'something')).toBe(undefined);
    expect(concatTestID(undefined, 'something')).toBe(undefined);
    expect(concatTestID('something', '')).toBe(undefined);
    expect(concatTestID('something', undefined)).toBe(undefined);
    expect(concatTestID('something', '', 'somethingElse')).toBe(undefined);
    expect(concatTestID('something', undefined, 'somethingElse')).toBe(undefined);
  });
});
