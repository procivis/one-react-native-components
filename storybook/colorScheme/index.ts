import type { ColorScheme } from '../../src/ui-components/theme';
import * as procivis from './procivis';

interface Flavor {
  light: ColorScheme;
  dark?: ColorScheme;
}

export default Object.entries<Flavor>({ procivis }).reduce<Record<string, ColorScheme>>(
  (aggr, [flavor, { light, dark }]) => {
    return Object.assign(
      { ...aggr },
      { [dark ? `${flavor}Light` : flavor]: light },
      dark ? { [`${flavor}Dark`]: dark } : {},
    );
  },
  {},
);
