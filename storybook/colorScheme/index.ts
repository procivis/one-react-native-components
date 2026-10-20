import type { ColorScheme } from '../../src/ui-components/theme';
// import * as procivis from './procivis';
import { light } from './procivis';

interface Flavor {
  dark?: ColorScheme;
  light: ColorScheme;
}

// export const ColorSchemes = Object.entries<Flavor>({ procivis }).reduce<Record<string, ColorScheme>>(
export const ColorSchemes = Object.entries<Flavor>({
  procivis: { light },
}).reduce<Record<string, ColorScheme>>((aggr, [flavor, { light, dark }]) => {
  return Object.assign(
    { ...aggr },
    { [dark ? `${flavor}Light` : flavor]: light },
    dark ? { [`${flavor}Dark`]: dark } : {},
  );
}, {});

export default ColorSchemes;
