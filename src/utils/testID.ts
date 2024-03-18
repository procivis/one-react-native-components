/**
 * Create `testID` prop by concatenating parts
 * @returns {string} concatenated identifier or undefined if one part is missing
 */
export function concatTestID(part1: string, ...args: Array<string>): string;
export function concatTestID(part1: string | undefined, ...args: Array<string | undefined>): string | undefined;
export function concatTestID(part1: string | undefined, ...args: Array<string | undefined>): string | undefined {
  return args.reduce((aggr, part) => (aggr && part ? `${aggr}.${part}` : undefined), part1 || undefined);
}
