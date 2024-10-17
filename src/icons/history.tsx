import React, { FC } from 'react';
import { StyleProp, StyleSheet, View, ViewProps, ViewStyle } from 'react-native';
import Svg, { G, Path, Rect, SvgProps } from 'react-native-svg';

import { useAppColorScheme } from '../theme/color-scheme-context';
import { CredentialWarningIcon } from './credential';

// https://www.figma.com/file/52qDYWUMjXAGre1dcnz5bz/Procivis-One-Wallet?node-id=454-99608
const HistoryShareIcon: FC<SvgProps> = (props) => {
  const colorScheme = useAppColorScheme();
  return (
    <Svg fill="none" height="48" viewBox="0 0 48 48" width="48" {...props}>
      <Rect fill={colorScheme.background} height="48" rx="24" width="48" />
      <Path
        d="M21.7266 28.9531C21.2578 28.9531 20.8984 28.8307 20.6484 28.5859C20.4036 28.3359 20.2812 27.9688 20.2812 27.4844V21.2266C20.2812 20.7474 20.4036 20.3854 20.6484 20.1406C20.8984 19.8906 21.2578 19.7656 21.7266 19.7656H23.3281V23.2656C23.3281 23.5312 23.3984 23.7344 23.5391 23.875C23.6797 24.0156 23.8802 24.0859 24.1406 24.0859H27.6562V27.4844C27.6562 27.9635 27.5312 28.3281 27.2812 28.5781C27.0312 28.8281 26.6693 28.9531 26.1953 28.9531H21.7266ZM24.4297 23.2344C24.2578 23.2344 24.1719 23.1536 24.1719 22.9922V19.8047C24.2708 19.8151 24.3724 19.8568 24.4766 19.9297C24.5807 19.9974 24.6901 20.0885 24.8047 20.2031L27.1953 22.6016C27.3151 22.7214 27.4089 22.8333 27.4766 22.9375C27.5495 23.0417 27.5964 23.1406 27.6172 23.2344H24.4297ZM16.8594 21.9531C16.2812 21.9531 15.9922 21.6589 15.9922 21.0703V19.1875C15.9922 18.3333 16.2161 17.6823 16.6641 17.2344C17.1172 16.7865 17.776 16.5625 18.6406 16.5625H20.5234C21.112 16.5625 21.4062 16.8516 21.4062 17.4297C21.4062 18.013 21.112 18.3047 20.5234 18.3047H18.7812C18.4375 18.3047 18.1745 18.3932 17.9922 18.5703C17.8151 18.7422 17.7266 19.0078 17.7266 19.3672V21.0703C17.7266 21.6589 17.4375 21.9531 16.8594 21.9531ZM30.7344 21.9531C30.1562 21.9531 29.8672 21.6589 29.8672 21.0703V19.3672C29.8672 19.0078 29.776 18.7422 29.5938 18.5703C29.4115 18.3932 29.151 18.3047 28.8125 18.3047H27.0703C26.487 18.3047 26.1953 18.013 26.1953 17.4297C26.1953 16.8516 26.487 16.5625 27.0703 16.5625H28.9609C29.8255 16.5625 30.4818 16.7865 30.9297 17.2344C31.3828 17.6823 31.6094 18.3333 31.6094 19.1875V21.0703C31.6094 21.6589 31.3177 21.9531 30.7344 21.9531ZM18.6406 32.1797C17.776 32.1797 17.1172 31.9557 16.6641 31.5078C16.2161 31.0599 15.9922 30.4089 15.9922 29.5547V27.6641C15.9922 27.0807 16.2812 26.7891 16.8594 26.7891C17.4375 26.7891 17.7266 27.0807 17.7266 27.6641V29.375C17.7266 29.7344 17.8151 30 17.9922 30.1719C18.1745 30.349 18.4375 30.4375 18.7812 30.4375H20.5234C21.112 30.4375 21.4062 30.7292 21.4062 31.3125C21.4062 31.8906 21.112 32.1797 20.5234 32.1797H18.6406ZM27.0703 32.1797C26.487 32.1797 26.1953 31.8906 26.1953 31.3125C26.1953 30.7292 26.487 30.4375 27.0703 30.4375H28.8125C29.151 30.4375 29.4115 30.349 29.5938 30.1719C29.776 30 29.8672 29.7344 29.8672 29.375V27.6641C29.8672 27.0807 30.1562 26.7891 30.7344 26.7891C31.3177 26.7891 31.6094 27.0807 31.6094 27.6641V29.5547C31.6094 30.4089 31.3828 31.0599 30.9297 31.5078C30.4818 31.9557 29.8255 32.1797 28.9609 32.1797H27.0703Z"
        fill={colorScheme.accent}
      />
    </Svg>
  );
};

// https://www.figma.com/file/52qDYWUMjXAGre1dcnz5bz/Procivis-One-Wallet?node-id=454-99609
const HistoryIssueIcon: FC<SvgProps> = (props) => {
  const colorScheme = useAppColorScheme();
  return (
    <Svg fill="none" height="48" viewBox="0 0 48 48" width="48" {...props}>
      <Rect fill={colorScheme.background} height="48" rx="24" width="48" />
      <Path
        d="M24.6562 32.7734C24.526 32.7734 24.4141 32.7292 24.3203 32.6406C24.2266 32.5521 24.1667 32.4375 24.1406 32.2969C24.0156 31.4583 23.8828 30.7552 23.7422 30.1875C23.6016 29.6198 23.4193 29.1536 23.1953 28.7891C22.9714 28.4245 22.6797 28.1328 22.3203 27.9141C21.9609 27.6953 21.5 27.5182 20.9375 27.3828C20.3802 27.2474 19.6901 27.125 18.8672 27.0156C18.7214 27 18.6016 26.9427 18.5078 26.8438C18.4193 26.7448 18.375 26.6276 18.375 26.4922C18.375 26.3568 18.4193 26.2396 18.5078 26.1406C18.6016 26.0417 18.7214 25.9844 18.8672 25.9688C19.6901 25.8802 20.3828 25.7734 20.9453 25.6484C21.513 25.5182 21.9792 25.3411 22.3438 25.1172C22.7083 24.8932 23.0026 24.5964 23.2266 24.2266C23.4505 23.8568 23.6302 23.3854 23.7656 22.8125C23.9062 22.2344 24.0312 21.526 24.1406 20.6875C24.1615 20.5469 24.2188 20.4349 24.3125 20.3516C24.4115 20.263 24.526 20.2188 24.6562 20.2188C24.7917 20.2188 24.9062 20.263 25 20.3516C25.0938 20.4349 25.1536 20.5469 25.1797 20.6875C25.2995 21.526 25.4297 22.2318 25.5703 22.8047C25.7109 23.3776 25.8906 23.849 26.1094 24.2188C26.3333 24.5885 26.6276 24.8854 26.9922 25.1094C27.3568 25.3281 27.8177 25.5026 28.375 25.6328C28.9375 25.7578 29.6302 25.8698 30.4531 25.9688C30.599 25.9896 30.7161 26.0495 30.8047 26.1484C30.8932 26.2422 30.9375 26.3568 30.9375 26.4922C30.9375 26.6276 30.8906 26.7448 30.7969 26.8438C30.7083 26.9427 30.5938 27 30.4531 27.0156C29.6302 27.1094 28.9349 27.2214 28.3672 27.3516C27.8047 27.4766 27.3411 27.6484 26.9766 27.8672C26.612 28.0859 26.3177 28.3828 26.0938 28.7578C25.8698 29.1276 25.6901 29.599 25.5547 30.1719C25.4193 30.75 25.2943 31.4583 25.1797 32.2969C25.1536 32.4375 25.0938 32.5521 25 32.6406C24.9115 32.7292 24.7969 32.7734 24.6562 32.7734ZM19.1719 24.0938C18.9844 24.0938 18.8802 23.9922 18.8594 23.7891C18.7969 23.2786 18.7292 22.8776 18.6562 22.5859C18.5885 22.2891 18.4792 22.0677 18.3281 21.9219C18.1771 21.7708 17.9505 21.6589 17.6484 21.5859C17.3516 21.5078 16.9401 21.4271 16.4141 21.3438C16.2005 21.3125 16.0938 21.2057 16.0938 21.0234C16.0938 20.8411 16.1875 20.7344 16.375 20.7031C16.9115 20.6042 17.3307 20.5156 17.6328 20.4375C17.9401 20.3542 18.1693 20.2422 18.3203 20.1016C18.4766 19.9557 18.5885 19.7396 18.6562 19.4531C18.7292 19.1667 18.7969 18.7656 18.8594 18.25C18.8802 18.0469 18.9844 17.9453 19.1719 17.9453C19.3646 17.9453 19.4714 18.0443 19.4922 18.2422C19.5599 18.7682 19.6276 19.1797 19.6953 19.4766C19.7682 19.7734 19.8802 19.9974 20.0312 20.1484C20.1823 20.2995 20.4089 20.4115 20.7109 20.4844C21.013 20.5573 21.4323 20.6302 21.9688 20.7031C22.0521 20.7135 22.1198 20.7474 22.1719 20.8047C22.2292 20.862 22.2578 20.9349 22.2578 21.0234C22.2578 21.2005 22.1641 21.3073 21.9766 21.3438C21.4349 21.4427 21.013 21.5339 20.7109 21.6172C20.4089 21.6953 20.1823 21.8073 20.0312 21.9531C19.8802 22.099 19.7682 22.3177 19.6953 22.6094C19.6276 22.8958 19.5599 23.2943 19.4922 23.8047C19.4818 23.888 19.4479 23.9583 19.3906 24.0156C19.3333 24.0677 19.2604 24.0938 19.1719 24.0938ZM22.9688 18.5781C22.849 18.5781 22.7812 18.5156 22.7656 18.3906C22.7083 18.0729 22.6589 17.8255 22.6172 17.6484C22.5755 17.4661 22.5078 17.3281 22.4141 17.2344C22.3255 17.1406 22.1875 17.0677 22 17.0156C21.8177 16.9583 21.5599 16.901 21.2266 16.8438C21.0964 16.8229 21.0312 16.7552 21.0312 16.6406C21.0312 16.526 21.0938 16.4583 21.2188 16.4375C21.5521 16.3698 21.8125 16.3099 22 16.2578C22.1875 16.2057 22.3255 16.1328 22.4141 16.0391C22.5078 15.9453 22.5755 15.8099 22.6172 15.6328C22.6589 15.4557 22.7083 15.2109 22.7656 14.8984C22.7812 14.7682 22.849 14.7031 22.9688 14.7031C23.0833 14.7031 23.151 14.7656 23.1719 14.8906C23.224 15.2083 23.2708 15.4583 23.3125 15.6406C23.3594 15.8229 23.4271 15.9609 23.5156 16.0547C23.6094 16.1484 23.7474 16.2214 23.9297 16.2734C24.1172 16.3203 24.3802 16.375 24.7188 16.4375C24.8438 16.4583 24.9062 16.526 24.9062 16.6406C24.9062 16.7552 24.8438 16.8229 24.7188 16.8438C24.3854 16.9062 24.125 16.9661 23.9375 17.0234C23.75 17.0755 23.612 17.1484 23.5234 17.2422C23.4349 17.3359 23.3672 17.474 23.3203 17.6562C23.2734 17.8333 23.224 18.0781 23.1719 18.3906C23.151 18.5156 23.0833 18.5781 22.9688 18.5781Z"
        fill={colorScheme.accent}
      />
    </Svg>
  );
};

// https://www.figma.com/file/52qDYWUMjXAGre1dcnz5bz/Procivis-One-Wallet?node-id=454-99610
const HistoryRevokeIcon: FC<SvgProps> = (props) => {
  const colorScheme = useAppColorScheme();
  return (
    <Svg fill="none" height="48" viewBox="0 0 48 48" width="48" {...props}>
      <Rect fill={colorScheme.background} height="48" rx="24" width="48" />
      <Path
        d="M21.375 32.3203C21.0312 32.3203 20.7318 32.2812 20.4766 32.2031C20.2214 32.1302 19.9896 32.0208 19.7812 31.875C19.5781 31.7292 19.3828 31.5521 19.1953 31.3438L16.2031 27.9766C16.0104 27.763 15.862 27.5677 15.7578 27.3906C15.6589 27.2083 15.5885 27.0156 15.5469 26.8125C15.5104 26.6094 15.4922 26.3646 15.4922 26.0781V22.6484C15.4922 22.362 15.5104 22.1172 15.5469 21.9141C15.5885 21.7057 15.6589 21.513 15.7578 21.3359C15.862 21.1536 16.0104 20.9583 16.2031 20.75L19.1953 17.3828C19.3828 17.1693 19.5781 16.9922 19.7812 16.8516C19.9896 16.7057 20.2214 16.5938 20.4766 16.5156C20.7318 16.4375 21.0312 16.3984 21.375 16.3984H26.1875C26.526 16.3984 26.8229 16.4375 27.0781 16.5156C27.3385 16.5885 27.5703 16.6979 27.7734 16.8438C27.9818 16.9896 28.1797 17.1693 28.3672 17.3828L31.3047 20.75C31.4974 20.9688 31.6484 21.1693 31.7578 21.3516C31.8724 21.5286 31.9531 21.7188 32 21.9219C32.0469 22.1198 32.0703 22.362 32.0703 22.6484V26.0781C32.0703 26.3646 32.0495 26.6094 32.0078 26.8125C31.9714 27.0156 31.901 27.2083 31.7969 27.3906C31.6927 27.5677 31.5495 27.763 31.3672 27.9766L28.3672 31.3438C28.1797 31.5521 27.9818 31.7292 27.7734 31.875C27.5703 32.0208 27.3385 32.1302 27.0781 32.2031C26.8229 32.2812 26.526 32.3203 26.1875 32.3203H21.375ZM23.7891 25.6328C24.2891 25.6328 24.5495 25.3724 24.5703 24.8516L24.6953 21.1562C24.7057 20.901 24.6224 20.6901 24.4453 20.5234C24.2734 20.3516 24.0521 20.2656 23.7812 20.2656C23.5052 20.2656 23.2812 20.349 23.1094 20.5156C22.9375 20.6823 22.8568 20.8958 22.8672 21.1562L22.9844 24.8516C23.0052 25.3724 23.2734 25.6328 23.7891 25.6328ZM23.7891 28.3828C24.0703 28.3828 24.3099 28.2969 24.5078 28.125C24.7057 27.9479 24.8047 27.7214 24.8047 27.4453C24.8047 27.1745 24.7057 26.9505 24.5078 26.7734C24.3099 26.5964 24.0703 26.5078 23.7891 26.5078C23.5026 26.5078 23.2604 26.5964 23.0625 26.7734C22.8646 26.9505 22.7656 27.1745 22.7656 27.4453C22.7656 27.7214 22.8646 27.9479 23.0625 28.125C23.2656 28.2969 23.5078 28.3828 23.7891 28.3828Z"
        fill={colorScheme.accent}
      />
    </Svg>
  );
};

// https://www.figma.com/file/52qDYWUMjXAGre1dcnz5bz/Procivis-One-Wallet?node-id=454-99611
const HistorySuspendIcon: FC<SvgProps> = (props) => {
  const colorScheme = useAppColorScheme();
  return (
    <Svg fill="none" height="48" viewBox="0 0 48 48" width="48" {...props}>
      <Rect fill={colorScheme.background} height="48" rx="24" width="48" />
      <Path
        d="M24.6094 32.5078C23.7917 32.5078 22.9896 32.3802 22.2031 32.125C21.4219 31.875 20.6979 31.5208 20.0312 31.0625C19.3698 30.6042 18.8047 30.0755 18.3359 29.4766C18.1328 29.237 18.0391 28.9948 18.0547 28.75C18.0755 28.5 18.1849 28.2995 18.3828 28.1484C18.5911 27.9818 18.8151 27.9245 19.0547 27.9766C19.2943 28.0234 19.5052 28.1458 19.6875 28.3438C20.0781 28.8281 20.526 29.25 21.0312 29.6094C21.5417 29.9635 22.0964 30.237 22.6953 30.4297C23.2995 30.6224 23.9375 30.7188 24.6094 30.7188C25.4896 30.724 26.3125 30.5625 27.0781 30.2344C27.849 29.9062 28.5234 29.4505 29.1016 28.8672C29.6849 28.2839 30.1406 27.6094 30.4688 26.8438C30.8021 26.0729 30.9688 25.2448 30.9688 24.3594C30.9688 23.4792 30.8021 22.6562 30.4688 21.8906C30.1406 21.1198 29.6849 20.4453 29.1016 19.8672C28.5234 19.2839 27.849 18.8281 27.0781 18.5C26.3125 18.1719 25.4896 18.0078 24.6094 18.0078C23.7292 18.0078 22.9062 18.1719 22.1406 18.5C21.375 18.8229 20.7005 19.2708 20.1172 19.8438C19.5339 20.4167 19.0781 21.0859 18.75 21.8516C18.4219 22.612 18.2552 23.4323 18.25 24.3125H16.4609C16.4661 23.2031 16.6823 22.1589 17.1094 21.1797C17.5365 20.2005 18.125 19.3385 18.875 18.5938C19.625 17.849 20.4896 17.2682 21.4688 16.8516C22.4479 16.4297 23.4948 16.2188 24.6094 16.2188C25.724 16.2188 26.7708 16.4323 27.75 16.8594C28.7344 17.2812 29.6016 17.8672 30.3516 18.6172C31.1016 19.3672 31.6901 20.2344 32.1172 21.2188C32.5443 22.1979 32.7578 23.2448 32.7578 24.3594C32.7578 25.4792 32.5443 26.5312 32.1172 27.5156C31.6901 28.4948 31.1016 29.3594 30.3516 30.1094C29.6016 30.8594 28.7344 31.4453 27.75 31.8672C26.7708 32.2943 25.724 32.5078 24.6094 32.5078ZM15.5312 22.7109H19.5859C19.7995 22.7109 19.9583 22.7604 20.0625 22.8594C20.1667 22.9583 20.2161 23.0833 20.2109 23.2344C20.2109 23.3854 20.1562 23.5391 20.0469 23.6953L18.0391 26.4375C17.9089 26.6146 17.75 26.7057 17.5625 26.7109C17.375 26.7109 17.2135 26.6198 17.0781 26.4375L15.0781 23.7031C14.9635 23.5469 14.9036 23.3932 14.8984 23.2422C14.8932 23.0859 14.9427 22.9583 15.0469 22.8594C15.1562 22.7604 15.3177 22.7109 15.5312 22.7109ZM24.6094 25.5781C24.1198 25.5781 23.8646 25.3333 23.8438 24.8438L23.7344 21.2812C23.724 21.0365 23.7995 20.8359 23.9609 20.6797C24.1224 20.5182 24.3359 20.4375 24.6016 20.4375C24.862 20.4375 25.0729 20.5182 25.2344 20.6797C25.401 20.8359 25.4792 21.0391 25.4688 21.2891L25.3516 24.8359C25.3307 25.3307 25.0833 25.5781 24.6094 25.5781ZM24.6094 28.2031C24.3385 28.2031 24.1068 28.1198 23.9141 27.9531C23.7266 27.7865 23.6328 27.5755 23.6328 27.3203C23.6328 27.0599 23.7266 26.8464 23.9141 26.6797C24.1068 26.5078 24.3385 26.4219 24.6094 26.4219C24.8802 26.4219 25.1068 26.5052 25.2891 26.6719C25.4766 26.8385 25.5703 27.0547 25.5703 27.3203C25.5703 27.5807 25.4766 27.7943 25.2891 27.9609C25.1016 28.1224 24.875 28.2031 24.6094 28.2031Z"
        fill={colorScheme.accent}
      />
    </Svg>
  );
};

// https://www.figma.com/file/52qDYWUMjXAGre1dcnz5bz/Procivis-One-Wallet?node-id=454-100241
export const HistoryStatusAcceptedIcon: FC<SvgProps> = (props) => {
  const colorScheme = useAppColorScheme();
  return (
    <Svg fill="none" height="22" viewBox="0 0 22 22" width="22" {...props}>
      <Path
        d="M10.5747 20C9.40153 20 8.29753 19.7759 7.2627 19.3276C6.22786 18.8849 5.31478 18.2679 4.52344 17.4766C3.73763 16.6852 3.12061 15.7721 2.67236 14.7373C2.22412 13.7025 2 12.5985 2 11.4253C2 10.2521 2.22412 9.14811 2.67236 8.11328C3.12061 7.07845 3.73763 6.16813 4.52344 5.38232C5.31478 4.59098 6.2251 3.97119 7.25439 3.52295C8.28923 3.07471 9.39323 2.85059 10.5664 2.85059C11.7451 2.85059 12.8519 3.07471 13.8867 3.52295C14.9215 3.97119 15.8346 4.59098 16.626 5.38232C17.4173 6.16813 18.0371 7.07845 18.4854 8.11328C18.9336 9.14811 19.1577 10.2521 19.1577 11.4253C19.1577 12.5985 18.9336 13.7025 18.4854 14.7373C18.0371 15.7721 17.4173 16.6852 16.626 17.4766C15.8346 18.2679 14.9215 18.8849 13.8867 19.3276C12.8519 19.7759 11.7479 20 10.5747 20Z"
        fill={colorScheme.success}
      />
      <Path
        d="M3.81385 18.1812L3.81633 18.1837C4.69776 19.0651 5.71679 19.7536 6.86722 20.2461C8.032 20.7503 9.27117 21 10.5747 21C11.8782 21 13.1174 20.7503 14.2821 20.2461C15.4326 19.7537 16.4516 19.0651 17.3331 18.1837C18.2142 17.3026 18.9051 16.2842 19.403 15.1348C19.9077 13.9694 20.1577 12.7296 20.1577 11.4253C20.1577 10.121 19.9077 8.88117 19.403 7.71581C18.905 6.56624 18.2138 5.55009 17.3318 4.67398C16.451 3.79349 15.4331 3.103 14.2842 2.60533C13.1182 2.10029 11.8755 1.85059 10.5664 1.85059C9.26213 1.85059 8.02228 2.10055 6.85692 2.60533L6.85513 2.60611C5.71136 3.10421 4.69653 3.79502 3.81633 4.67522C2.94015 5.5514 2.25228 6.56718 1.75475 7.71581C1.24997 8.88117 1 10.121 1 11.4253C1 12.7296 1.24997 13.9694 1.75475 15.1348C2.252 16.2828 2.93915 17.3003 3.81385 18.1812Z"
        stroke="white"
        strokeOpacity="0.2"
        strokeWidth="2"
      />
      <Path
        d="M9.91406 15.3828C10.0703 15.3828 10.2135 15.3464 10.3438 15.2734C10.4792 15.1953 10.5938 15.0885 10.6875 14.9531L14.3359 9.3125C14.3932 9.22396 14.4401 9.13021 14.4766 9.03125C14.5182 8.93229 14.5391 8.83333 14.5391 8.73438C14.5391 8.51562 14.4557 8.33854 14.2891 8.20312C14.1276 8.06771 13.9427 8 13.7344 8C13.4583 8 13.2266 8.14844 13.0391 8.44531L9.89062 13.4766L8.44531 11.6641C8.34115 11.5339 8.23698 11.4427 8.13281 11.3906C8.02865 11.3333 7.91146 11.3047 7.78125 11.3047C7.5625 11.3047 7.3776 11.3828 7.22656 11.5391C7.07552 11.6901 7 11.875 7 12.0938C7 12.1979 7.01823 12.2995 7.05469 12.3984C7.09635 12.4922 7.15365 12.5885 7.22656 12.6875L9.10938 14.9531C9.22396 15.099 9.34635 15.2083 9.47656 15.2812C9.60677 15.349 9.7526 15.3828 9.91406 15.3828Z"
        fill="white"
      />
    </Svg>
  );
};

// https://www.figma.com/design/52qDYWUMjXAGre1dcnz5bz/Procivis-One-Wallet?node-id=415-5402&node-type=frame&t=MNBdPiFol0J4XsBR-0
const HistoryStatusDeleteIcon: FC<SvgProps> = (props) => {
  const colorScheme = useAppColorScheme();
  return (
    <Svg fill="none" height="22" viewBox="0 0 22 22" width="22" {...props}>
      <Path
        d="M10.575 20a8.241 8.241 0 01-3.312-.672 8.649 8.649 0 01-2.74-1.851 8.837 8.837 0 01-1.85-2.74A8.242 8.242 0 012 11.425c0-1.173.224-2.277.672-3.312a8.793 8.793 0 014.582-4.59 8.243 8.243 0 013.312-.672c1.18 0 2.286.224 3.32.672a8.766 8.766 0 012.74 1.86 8.667 8.667 0 011.86 2.73 8.243 8.243 0 01.672 3.312 8.243 8.243 0 01-.673 3.312 8.768 8.768 0 01-4.598 4.59 8.241 8.241 0 01-3.312.673z"
        fill={colorScheme.error}
      />
      <Path
        d="M3.814 18.181l.002.003c.882.881 1.9 1.57 3.051 2.062a9.242 9.242 0 003.708.754c1.303 0 2.542-.25 3.707-.754a9.766 9.766 0 005.12-5.111 9.244 9.244 0 00.756-3.71c0-1.304-.25-2.544-.755-3.71a9.666 9.666 0 00-2.071-3.041 9.765 9.765 0 00-3.048-2.069 9.263 9.263 0 00-3.718-.754c-1.304 0-2.544.25-3.71.754v.001a9.793 9.793 0 00-5.101 5.11A9.242 9.242 0 001 11.426c0 1.304.25 2.543.755 3.709a9.836 9.836 0 002.059 3.046z"
        stroke={colorScheme.white}
        strokeOpacity={0.2}
        strokeWidth={2}
      />
      <Path fill={colorScheme.white} d="M7.28577 8.42859H13.71434V16.142879999999998H7.28577z" />
      <Path fill={colorScheme.white} d="M6 7.14294H15V8.428650000000001H6z" />
      <Path fill={colorScheme.white} d="M9.85718 5.85718H11.14289V7.1428899999999995H9.85718z" />
      <Path fill={colorScheme.error} d="M8.57141 9.71436H9.85712V14.857219999999998H8.57141z" />
      <Path fill={colorScheme.error} d="M11.1428 9.71436H12.42851V14.857219999999998H11.1428z" />
    </Svg>
  );
};

// https://www.figma.com/file/52qDYWUMjXAGre1dcnz5bz/Procivis-One-Wallet?node-id=426-27862
const HistoryStatusErrorIcon: FC<SvgProps> = (props) => {
  const colorScheme = useAppColorScheme();
  return (
    <Svg fill="none" height="22" viewBox="0 0 22 22" width="22" {...props}>
      <Path
        d="M10.5747 20C9.40153 20 8.29753 19.7759 7.2627 19.3276C6.22786 18.8849 5.31478 18.2679 4.52344 17.4766C3.73763 16.6852 3.12061 15.7721 2.67236 14.7373C2.22412 13.7025 2 12.5985 2 11.4253C2 10.2521 2.22412 9.14811 2.67236 8.11328C3.12061 7.07845 3.73763 6.16813 4.52344 5.38232C5.31478 4.59098 6.2251 3.97119 7.25439 3.52295C8.28923 3.07471 9.39323 2.85059 10.5664 2.85059C11.7451 2.85059 12.8519 3.07471 13.8867 3.52295C14.9215 3.97119 15.8346 4.59098 16.626 5.38232C17.4173 6.16813 18.0371 7.07845 18.4854 8.11328C18.9336 9.14811 19.1577 10.2521 19.1577 11.4253C19.1577 12.5985 18.9336 13.7025 18.4854 14.7373C18.0371 15.7721 17.4173 16.6852 16.626 17.4766C15.8346 18.2679 14.9215 18.8849 13.8867 19.3276C12.8519 19.7759 11.7479 20 10.5747 20Z"
        fill={colorScheme.error}
      />
      <Path
        d="M3.81385 18.1812L3.81633 18.1837C4.69776 19.0651 5.71679 19.7536 6.86722 20.2461C8.032 20.7503 9.27117 21 10.5747 21C11.8782 21 13.1174 20.7503 14.2821 20.2461C15.4326 19.7537 16.4516 19.0651 17.3331 18.1837C18.2142 17.3026 18.9051 16.2842 19.403 15.1348C19.9077 13.9694 20.1577 12.7296 20.1577 11.4253C20.1577 10.121 19.9077 8.88117 19.403 7.71581C18.905 6.56624 18.2138 5.55009 17.3318 4.67398C16.451 3.79349 15.4331 3.103 14.2842 2.60533C13.1182 2.10029 11.8755 1.85059 10.5664 1.85059C9.26213 1.85059 8.02228 2.10055 6.85692 2.60533L6.85513 2.60611C5.71136 3.10421 4.69653 3.79502 3.81633 4.67522C2.94015 5.5514 2.25228 6.56718 1.75475 7.71581C1.24997 8.88117 1 10.121 1 11.4253C1 12.7296 1.24997 13.9694 1.75475 15.1348C2.252 16.2828 2.93915 17.3003 3.81385 18.1812Z"
        stroke={colorScheme.white}
        strokeOpacity="0.2"
        strokeWidth="2"
      />
      <Path
        d="M8.43311 14.7124C8.27262 14.8618 8.07894 14.9365 7.85205 14.9365C7.63623 14.9365 7.45085 14.8618 7.2959 14.7124C7.14648 14.5575 7.07178 14.3721 7.07178 14.1562C7.07178 13.9404 7.14925 13.7578 7.3042 13.6084L9.4707 11.4336L7.3042 9.27539C7.14925 9.11491 7.07178 8.93229 7.07178 8.72754C7.07178 8.50065 7.14648 8.31527 7.2959 8.17139C7.45085 8.02197 7.63623 7.94727 7.85205 7.94727C8.06787 7.94727 8.25326 8.01921 8.4082 8.16309L10.583 10.3296L12.7661 8.16309C12.9211 8.00814 13.1064 7.93066 13.3223 7.93066C13.5381 7.93066 13.7207 8.00814 13.8701 8.16309C14.0251 8.3125 14.1025 8.49512 14.1025 8.71094C14.1025 8.92122 14.0251 9.10661 13.8701 9.26709L11.6953 11.4336L13.8618 13.6001C14.0168 13.744 14.0942 13.9294 14.0942 14.1562C14.0942 14.3721 14.0168 14.5575 13.8618 14.7124C13.7124 14.8618 13.527 14.9365 13.3057 14.9365C13.0788 14.9365 12.8906 14.8618 12.7412 14.7124L10.583 12.5459L8.43311 14.7124Z"
        fill={colorScheme.white}
      />
    </Svg>
  );
};

// https://www.figma.com/file/52qDYWUMjXAGre1dcnz5bz/Procivis-One-Wallet?node-id=544-93347
const HistoryStatusSuspendIcon: FC<SvgProps> = (props) => {
  const colorScheme = useAppColorScheme();
  return (
    <Svg fill="none" height="22" viewBox="0 0 22 22" width="22" {...props}>
      <Path
        d="M10.5747 20C9.40153 20 8.29753 19.7759 7.2627 19.3276C6.22786 18.8849 5.31478 18.2679 4.52344 17.4766C3.73763 16.6852 3.12061 15.7721 2.67236 14.7373C2.22412 13.7025 2 12.5985 2 11.4253C2 10.2521 2.22412 9.14811 2.67236 8.11328C3.12061 7.07845 3.73763 6.16813 4.52344 5.38232C5.31478 4.59098 6.2251 3.97119 7.25439 3.52295C8.28923 3.07471 9.39323 2.85059 10.5664 2.85059C11.7451 2.85059 12.8519 3.07471 13.8867 3.52295C14.9215 3.97119 15.8346 4.59098 16.626 5.38232C17.4173 6.16813 18.0371 7.07845 18.4854 8.11328C18.9336 9.14811 19.1577 10.2521 19.1577 11.4253C19.1577 12.5985 18.9336 13.7025 18.4854 14.7373C18.0371 15.7721 17.4173 16.6852 16.626 17.4766C15.8346 18.2679 14.9215 18.8849 13.8867 19.3276C12.8519 19.7759 11.7479 20 10.5747 20Z"
        fill={colorScheme.warning}
      />
      <Path
        d="M3.81385 18.1812L3.81633 18.1837C4.69776 19.0651 5.71679 19.7536 6.86722 20.2461C8.032 20.7503 9.27117 21 10.5747 21C11.8782 21 13.1174 20.7503 14.2821 20.2461C15.4326 19.7537 16.4516 19.0651 17.3331 18.1837C18.2142 17.3026 18.9051 16.2842 19.403 15.1348C19.9077 13.9694 20.1577 12.7296 20.1577 11.4253C20.1577 10.121 19.9077 8.88117 19.403 7.71581C18.905 6.56624 18.2138 5.55009 17.3318 4.67398C16.451 3.79349 15.4331 3.103 14.2842 2.60533C13.1182 2.10029 11.8755 1.85059 10.5664 1.85059C9.26213 1.85059 8.02228 2.10055 6.85692 2.60533L6.85513 2.60611C5.71136 3.10421 4.69653 3.79502 3.81633 4.67522C2.94015 5.5514 2.25228 6.56718 1.75475 7.71581C1.24997 8.88117 1 10.121 1 11.4253C1 12.7296 1.24997 13.9694 1.75475 15.1348C2.252 16.2828 2.93915 17.3003 3.81385 18.1812Z"
        stroke="white"
        strokeOpacity="0.2"
        strokeWidth="2"
      />
      <Path
        d="M6.74556 12.2289C6.52643 12.2211 6.33665 12.1369 6.17622 11.9765C6.02361 11.8239 5.94535 11.64 5.94143 11.4248C5.94535 11.2096 6.02361 11.0256 6.17622 10.873C6.32882 10.7204 6.51274 10.6461 6.72795 10.65L9.79772 10.6441L11.3649 10.65L14.4405 10.6617C14.6597 10.6617 14.8455 10.738 14.9981 10.8906C15.1507 11.0433 15.2251 11.2272 15.2212 11.4424C15.2251 11.6576 15.1507 11.8415 14.9981 11.9941C14.8494 12.1428 14.6636 12.2191 14.4405 12.223L11.3708 12.2172H9.79772L6.74556 12.2289Z"
        fill="black"
      />
    </Svg>
  );
};

// https://www.figma.com/file/52qDYWUMjXAGre1dcnz5bz/Procivis-One-Wallet?node-id=544-93350
const HistoryStatusSuspendTemporaryIcon: FC<SvgProps> = (props) => {
  const colorScheme = useAppColorScheme();
  return (
    <Svg fill="none" height="22" viewBox="0 0 22 22" width="22" {...props}>
      <path
        d="M10.5747 20C9.40153 20 8.29753 19.7759 7.2627 19.3276C6.22786 18.8849 5.31478 18.2679 4.52344 17.4766C3.73763 16.6852 3.12061 15.7721 2.67236 14.7373C2.22412 13.7025 2 12.5985 2 11.4253C2 10.2521 2.22412 9.14811 2.67236 8.11328C3.12061 7.07845 3.73763 6.16813 4.52344 5.38232C5.31478 4.59098 6.2251 3.97119 7.25439 3.52295C8.28923 3.07471 9.39323 2.85059 10.5664 2.85059C11.7451 2.85059 12.8519 3.07471 13.8867 3.52295C14.9215 3.97119 15.8346 4.59098 16.626 5.38232C17.4173 6.16813 18.0371 7.07845 18.4854 8.11328C18.9336 9.14811 19.1577 10.2521 19.1577 11.4253C19.1577 12.5985 18.9336 13.7025 18.4854 14.7373C18.0371 15.7721 17.4173 16.6852 16.626 17.4766C15.8346 18.2679 14.9215 18.8849 13.8867 19.3276C12.8519 19.7759 11.7479 20 10.5747 20Z"
        fill={colorScheme.warning}
      />
      <path
        d="M3.81385 18.1812L3.81633 18.1837C4.69776 19.0651 5.71679 19.7536 6.86722 20.2461C8.032 20.7503 9.27117 21 10.5747 21C11.8782 21 13.1174 20.7503 14.2821 20.2461C15.4326 19.7537 16.4516 19.0651 17.3331 18.1837C18.2142 17.3026 18.9051 16.2842 19.403 15.1348C19.9077 13.9694 20.1577 12.7296 20.1577 11.4253C20.1577 10.121 19.9077 8.88117 19.403 7.71581C18.905 6.56624 18.2138 5.55009 17.3318 4.67398C16.451 3.79349 15.4331 3.103 14.2842 2.60533C13.1182 2.10029 11.8755 1.85059 10.5664 1.85059C9.26213 1.85059 8.02228 2.10055 6.85692 2.60533L6.85513 2.60611C5.71136 3.10421 4.69653 3.79502 3.81633 4.67522C2.94015 5.5514 2.25228 6.56718 1.75475 7.71581C1.24997 8.88117 1 10.121 1 11.4253C1 12.7296 1.24997 13.9694 1.75475 15.1348C2.252 16.2828 2.93915 17.3003 3.81385 18.1812Z"
        stroke="white"
        strokeOpacity="0.2"
        strokeWidth="2"
      />
      <path
        d="M6.74556 12.2289C6.52643 12.2211 6.33665 12.1369 6.17622 11.9765C6.02361 11.8239 5.94535 11.64 5.94143 11.4248C5.94535 11.2096 6.02361 11.0256 6.17622 10.873C6.32882 10.7204 6.51274 10.6461 6.72795 10.65L9.79772 10.6441L11.3649 10.65L14.4405 10.6617C14.6597 10.6617 14.8455 10.738 14.9981 10.8906C15.1507 11.0433 15.2251 11.2272 15.2212 11.4424C15.2251 11.6576 15.1507 11.8415 14.9981 11.9941C14.8494 12.1428 14.6636 12.2191 14.4405 12.223L11.3708 12.2172H9.79772L6.74556 12.2289Z"
        fill="black"
      />
      <path
        d="M15.1328 20.6719C15.5521 20.8542 15.9987 20.9453 16.4727 20.9453C16.9421 20.9453 17.3864 20.8542 17.8057 20.6719C18.2249 20.4896 18.5941 20.2389 18.9131 19.9199C19.2367 19.6009 19.4896 19.2318 19.6719 18.8125C19.8542 18.3932 19.9453 17.9466 19.9453 17.4727C19.9453 16.9941 19.8542 16.5452 19.6719 16.126C19.4941 15.7067 19.2458 15.3376 18.9268 15.0186C18.6077 14.6995 18.2386 14.4512 17.8193 14.2734C17.4001 14.0911 16.9512 14 16.4727 14C15.9987 14 15.5521 14.0911 15.1328 14.2734C14.7135 14.4512 14.3444 14.7018 14.0254 15.0254C13.7064 15.3444 13.4557 15.7135 13.2734 16.1328C13.0911 16.5475 13 16.9941 13 17.4727C13 17.9512 13.0911 18.4001 13.2734 18.8193C13.4557 19.2386 13.7064 19.6077 14.0254 19.9268C14.3444 20.2458 14.7135 20.4941 15.1328 20.6719Z"
        fill="#0D0E10"
      />
      <path
        d="M16.5068 18.0059H14.8457C14.7272 18.0059 14.627 17.9626 14.5449 17.876C14.4629 17.7939 14.4219 17.696 14.4219 17.582C14.4219 17.4681 14.4629 17.3701 14.5449 17.2881C14.6315 17.2061 14.7318 17.165 14.8457 17.165H16.083V15.4492C16.083 15.3353 16.124 15.2396 16.2061 15.1621C16.2881 15.0801 16.3883 15.0391 16.5068 15.0391C16.6208 15.0391 16.7188 15.0801 16.8008 15.1621C16.8828 15.2396 16.9238 15.3353 16.9238 15.4492V17.582C16.9238 17.7005 16.8828 17.8008 16.8008 17.8828C16.7233 17.9648 16.6253 18.0059 16.5068 18.0059Z"
        fill="white"
      />
    </Svg>
  );
};

// https://www.figma.com/file/52qDYWUMjXAGre1dcnz5bz/Procivis-One-Wallet?node-id=493-79830
const HistoryStatusIndicatorIcon: FC<SvgProps> = (props) => {
  const colorScheme = useAppColorScheme();
  return (
    <Svg fill="none" height="16" viewBox="0 0 16 16" width="16" {...props}>
      <G opacity="0.1">
        <Path
          d="M7.9971 14C7.17658 14 6.40445 13.8432 5.6807 13.5295C4.95694 13.2197 4.31834 12.788 3.76488 12.2343C3.21529 11.6805 2.78374 11.0416 2.47025 10.3175C2.15675 9.59342 2 8.82091 2 8C2 7.17909 2.15675 6.40658 2.47025 5.68248C2.78374 4.95837 3.21529 4.32139 3.76488 3.77154C4.31834 3.21781 4.95501 2.78412 5.67489 2.47047C6.39865 2.15682 7.17078 2 7.99129 2C8.81567 2 9.58974 2.15682 10.3135 2.47047C11.0373 2.78412 11.6759 3.21781 12.2293 3.77154C12.7828 4.32139 13.2163 4.95837 13.5298 5.68248C13.8433 6.40658 14 7.17909 14 8C14 8.82091 13.8433 9.59342 13.5298 10.3175C13.2163 11.0416 12.7828 11.6805 12.2293 12.2343C11.6759 12.788 11.0373 13.2197 10.3135 13.5295C9.58974 13.8432 8.81761 14 7.9971 14Z"
          fill={colorScheme.success}
        />
        <Path
          d="M3.05512 12.9387L3.0576 12.9412C3.70117 13.5851 4.44577 14.0884 5.28521 14.448C6.13891 14.8176 7.04621 15 7.9971 15C8.94801 15 9.85534 14.8176 10.7091 14.448C11.5485 14.0884 12.293 13.5851 12.9366 12.9412C13.5798 12.2977 14.0843 11.5535 14.4474 10.7148C14.8174 9.86023 15 8.95194 15 8C15 7.04806 14.8174 6.13977 14.4474 5.28517C14.0843 4.44638 13.5794 3.70359 12.9354 3.06342C12.2925 2.4205 11.549 1.91605 10.7111 1.55293C9.85621 1.18244 8.94617 1 7.99129 1C7.03961 1 6.13158 1.1827 5.27726 1.55293L5.27726 1.55293L5.27546 1.55371C4.44108 1.91725 3.6999 2.422 3.0576 3.0646C2.41766 3.70486 1.91531 4.4473 1.55256 5.28517L2.47025 5.68248L1.55256 5.28517C1.18257 6.13977 1 7.04806 1 8C1 8.95194 1.18257 9.86023 1.55256 10.7148L2.47025 10.3175L1.55256 10.7148C1.91503 11.5521 2.41666 12.2954 3.05512 12.9387Z"
          stroke="white"
          strokeOpacity="0.2"
          strokeWidth="2"
        />
      </G>
      <G opacity="0.2">
        <Path
          d="M7.99806 12C7.45106 12 6.9363 11.8955 6.4538 11.6864C5.97129 11.4798 5.54556 11.192 5.17658 10.8228C4.81019 10.4537 4.5225 10.0278 4.3135 9.54501C4.1045 9.06228 4 8.54727 4 8C4 7.45273 4.1045 6.93772 4.3135 6.45499C4.5225 5.97225 4.81019 5.5476 5.17658 5.18103C5.54556 4.81187 5.97 4.52275 6.44993 4.31365C6.93243 4.10455 7.44719 4 7.99419 4C8.54378 4 9.05983 4.10455 9.54233 4.31365C10.0248 4.52275 10.4506 4.81187 10.8195 5.18103C11.1885 5.5476 11.4775 5.97225 11.6865 6.45499C11.8955 6.93772 12 7.45273 12 8C12 8.54727 11.8955 9.06228 11.6865 9.54501C11.4775 10.0278 11.1885 10.4537 10.8195 10.8228C10.4506 11.192 10.0248 11.4798 9.54233 11.6864C9.05983 11.8955 8.54507 12 7.99806 12Z"
          fill={colorScheme.success}
        />
        <Path
          d="M4.46683 11.5273L4.46683 11.5273L4.46931 11.5298C4.92837 11.9891 5.46007 12.3485 6.05824 12.6048C6.6707 12.8699 7.32065 13 7.99806 13C8.67547 13 9.32542 12.8699 9.93788 12.6048C10.536 12.3485 11.0678 11.9891 11.5268 11.5298C11.9855 11.0709 12.3456 10.5397 12.6042 9.94232C12.8697 9.32909 13 8.67831 13 8C13 7.32169 12.8697 6.6709 12.6042 6.05768C12.3455 5.46023 11.9852 4.92975 11.5256 4.47286C11.0672 4.01453 10.5366 3.65466 9.93996 3.3961C9.3263 3.13016 8.67427 3 7.99419 3C7.31602 3 6.66536 3.13042 6.0523 3.3961L6.05229 3.3961L6.0505 3.39689C5.45607 3.65587 4.92712 4.01606 4.46931 4.47409L5.17658 5.18103L4.46931 4.47409C4.01256 4.93106 3.65407 5.46118 3.39581 6.05768C3.13032 6.67091 3 7.32169 3 8C3 8.67831 3.13032 9.32909 3.39581 9.94232C3.65378 10.5382 4.01156 11.0686 4.46683 11.5273Z"
          stroke="white"
          strokeOpacity="0.2"
          strokeWidth="2"
        />
      </G>
      <Path
        d="M7.99903 10C7.72553 10 7.46815 9.94773 7.2269 9.84318C6.98565 9.73992 6.77278 9.596 6.58829 9.41142C6.4051 9.22685 6.26125 9.01388 6.15675 8.77251C6.05225 8.53114 6 8.27364 6 8C6 7.72636 6.05225 7.46886 6.15675 7.22749C6.26125 6.98612 6.4051 6.7738 6.58829 6.59051C6.77278 6.40594 6.985 6.26137 7.22496 6.15682C7.46622 6.05227 7.72359 6 7.9971 6C8.27189 6 8.52991 6.05227 8.77117 6.15682C9.01242 6.26137 9.22529 6.40594 9.40977 6.59051C9.59426 6.7738 9.73875 6.98612 9.84325 7.22749C9.94775 7.46886 10 7.72636 10 8C10 8.27364 9.94775 8.53114 9.84325 8.77251C9.73875 9.01388 9.59426 9.22685 9.40977 9.41142C9.22529 9.596 9.01242 9.73992 8.77117 9.84318C8.52991 9.94773 8.27254 10 7.99903 10Z"
        fill={colorScheme.success}
      />
      <Path
        d="M5.87854 10.1159L5.87853 10.1159L5.88101 10.1184C6.15559 10.3931 6.47442 10.6085 6.83134 10.7616C7.20255 10.9221 7.59511 11 7.99903 11C8.40295 11 8.79552 10.9221 9.16673 10.7616C9.52365 10.6085 9.84248 10.3931 10.1171 10.1184C10.3913 9.84402 10.6068 9.52579 10.7609 9.16982C10.9219 8.79796 11 8.40467 11 8C11 7.59533 10.9219 7.20204 10.7609 6.83018C10.6068 6.4741 10.3909 6.15596 10.1158 5.88235C9.8419 5.6086 9.52418 5.39329 9.1688 5.23928C8.79638 5.07789 8.40238 5 7.9971 5C7.59242 5 7.19915 5.07815 6.82733 5.23928L6.82733 5.23928L6.82553 5.24006C6.47107 5.3945 6.15434 5.61012 5.88101 5.88358L6.58829 6.59051L5.88101 5.88358C5.60746 6.15726 5.39282 6.47505 5.23906 6.83018C5.07807 7.20204 5 7.59533 5 8C5 8.40467 5.07807 8.79796 5.23906 9.16981C5.39254 9.5243 5.60647 9.84175 5.87854 10.1159Z"
        stroke="white"
        strokeOpacity="0.2"
        strokeWidth="2"
      />
    </Svg>
  );
};

export enum HistoryStatusIconType {
  Success,
  Warning,
  Error,
  Delete,
  Suspend,
  SuspendTemporary,
  Indicator,
}

export interface HistoryStatusIconProps extends SvgProps {
  type: HistoryStatusIconType;
}

export const HistoryStatusIcon: FC<HistoryStatusIconProps> = ({ type, ...props }) => {
  let StatusIcon = HistoryStatusAcceptedIcon;
  switch (type) {
    case HistoryStatusIconType.Success:
      StatusIcon = HistoryStatusAcceptedIcon;
      break;
    case HistoryStatusIconType.Warning:
      StatusIcon = CredentialWarningIcon;
      break;
    case HistoryStatusIconType.Error:
      StatusIcon = HistoryStatusErrorIcon;
      break;
    case HistoryStatusIconType.Delete:
      StatusIcon = HistoryStatusDeleteIcon;
      break;
    case HistoryStatusIconType.Suspend:
      StatusIcon = HistoryStatusSuspendIcon;
      break;
    case HistoryStatusIconType.SuspendTemporary:
      StatusIcon = HistoryStatusSuspendTemporaryIcon;
      break;
    case HistoryStatusIconType.Indicator:
      StatusIcon = HistoryStatusIndicatorIcon;
      break;
  }

  return <StatusIcon {...props} />;
};

export enum HistoryActionIconType {
  Issue,
  IssueReject,
  Request,
  RequestDeleted,
  RequestReject,
  Revalidate,
  Revoke,
  Share,
  ShareReject,
  Suspend,
  SuspendTemporary,
  Error,
}

export type HistoryActionIconProps = ViewProps &
  (
    | {
        type: HistoryActionIconType;
      }
    | {
        statusIcon: HistoryStatusIconType;
        TypeIcon: FC<SvgProps>;
      }
  );

export const HistoryActionIcon: FC<HistoryActionIconProps> = (props) => {
  let TypeIcon = HistoryShareIcon;
  let statusIcon = HistoryStatusIconType.Success;
  let style: StyleProp<ViewStyle>;
  let viewProps: ViewProps;

  if ('type' in props) {
    const { type, style: styleProp, ...otherProps } = props;
    style = styleProp;
    viewProps = otherProps;

    switch (type) {
      case HistoryActionIconType.Issue:
        TypeIcon = HistoryIssueIcon;
        break;
      case HistoryActionIconType.IssueReject:
        TypeIcon = HistoryIssueIcon;
        break;
      case HistoryActionIconType.Revoke:
        TypeIcon = HistoryRevokeIcon;
        break;
      case HistoryActionIconType.Revalidate:
      case HistoryActionIconType.Suspend:
      case HistoryActionIconType.SuspendTemporary:
        TypeIcon = HistorySuspendIcon;
        break;
    }

    switch (type) {
      case HistoryActionIconType.IssueReject:
        statusIcon = HistoryStatusIconType.Error;
        break;
      case HistoryActionIconType.ShareReject:
      case HistoryActionIconType.Error:
      case HistoryActionIconType.Revoke:
      case HistoryActionIconType.RequestReject:
        statusIcon = HistoryStatusIconType.Error;
        break;
      case HistoryActionIconType.Suspend:
        statusIcon = HistoryStatusIconType.Suspend;
        break;
      case HistoryActionIconType.SuspendTemporary:
        statusIcon = HistoryStatusIconType.SuspendTemporary;
        break;
      case HistoryActionIconType.RequestDeleted:
        statusIcon = HistoryStatusIconType.Delete;
        break;
    }
  } else {
    const { TypeIcon: TypeIconProp, statusIcon: statusIconProp, style: styleProp, ...otherProps } = props;
    TypeIcon = TypeIconProp;
    statusIcon = statusIconProp;
    style = styleProp;
    viewProps = otherProps;
  }

  return (
    <View style={[styles.wrapper, style]} {...viewProps}>
      <TypeIcon style={styles.round} />
      <HistoryStatusIcon style={styles.status} type={statusIcon} />
    </View>
  );
};

const styles = StyleSheet.create({
  round: {
    borderRadius: 24,
    overflow: 'hidden',
  },
  status: {
    bottom: -2,
    position: 'absolute',
    right: -2,
  },
  wrapper: {
    height: 48,
    width: 48,
  },
});
