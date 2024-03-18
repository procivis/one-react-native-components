import { getInitials } from './string';

describe('getInitials', () => {
  it('produces initials', () => {
    expect(getInitials('')).toBe('');

    expect(getInitials('A')).toBe('A');
    expect(getInitials('World of Wonders')).toBe('WW');
    expect(getInitials('World Of Wonders')).toBe('WOW');
    expect(getInitials('Marco Lüthi')).toBe('ML');
    expect(getInitials('UPPERCASE')).toBe('U');
    expect(getInitials('lowercase')).toBe('L');
    expect(getInitials('Mr. Somebody With Many Names')).toBe('MSW');

    expect(getInitials('World-Of-Wonders')).toBe('WOW');
    expect(getInitials('Multiple\nLines')).toBe('ML');
    expect(getInitials('über')).toBe('Ü');

    expect(getInitials('1')).toBe('1');
    expect(getInitials('12')).toBe('1');
    expect(getInitials('App 1')).toBe('A');
  });
});
