import type { ColorScheme } from '../../src/theme';
import * as izit from './izit';
import * as procivis from './procivis';
import * as sbb from './sbb';
import * as sh from './sh';
import * as uzh from './uzh';
import * as zug from './zug';

interface Flavor {
  light: ColorScheme;
  dark?: ColorScheme;
}

export default Object.entries<Flavor>({ procivis, izit, uzh, zug, sh, sbb }).reduce<Record<string, ColorScheme>>(
  (aggr, [flavor, { light, dark }]) => {
    return Object.assign(
      { ...aggr },
      { [dark ? `${flavor}Light` : flavor]: light },
      dark ? { [`${flavor}Dark`]: dark } : {},
    );
  },
  {},
);
