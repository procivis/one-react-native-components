import React, { FC } from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

import { useAppColorScheme } from '../theme/color-scheme-context';

// https://www.figma.com/design/52qDYWUMjXAGre1dcnz5bz/Procivis-One-Wallet?node-id=426-27862&m=dev
export const CredentialErrorIcon: FC<SvgProps> = ({ ...props }) => (
  <Svg fill="none" height={22} viewBox="0 0 22 22" width={22} {...props}>
    <Path
      d="M10.575 20a8.241 8.241 0 01-3.312-.672 8.649 8.649 0 01-2.74-1.851 8.837 8.837 0 01-1.85-2.74A8.242 8.242 0 012 11.425c0-1.173.224-2.277.672-3.312a8.793 8.793 0 014.582-4.59 8.243 8.243 0 013.312-.672c1.18 0 2.286.224 3.32.672a8.766 8.766 0 012.74 1.86 8.667 8.667 0 011.86 2.73 8.243 8.243 0 01.672 3.312 8.243 8.243 0 01-.673 3.312 8.768 8.768 0 01-4.598 4.59 8.241 8.241 0 01-3.312.673z"
      fill="#D90D0D"
    />
    <Path
      d="M3.814 18.181l.002.003c.882.881 1.9 1.57 3.051 2.062a9.242 9.242 0 003.708.754c1.303 0 2.542-.25 3.707-.754a9.766 9.766 0 005.12-5.111 9.244 9.244 0 00.756-3.71c0-1.304-.25-2.544-.755-3.71a9.666 9.666 0 00-2.071-3.041 9.765 9.765 0 00-3.048-2.069 9.263 9.263 0 00-3.718-.754c-1.304 0-2.544.25-3.71.754v.001a9.793 9.793 0 00-5.101 5.11A9.242 9.242 0 001 11.426c0 1.304.25 2.543.755 3.709a9.836 9.836 0 002.059 3.046z"
      stroke="#fff"
      strokeOpacity={0.2}
      strokeWidth={2}
    />
    <Path
      d="M8.433 14.712a.822.822 0 01-.58.225.773.773 0 01-.557-.225.773.773 0 01-.224-.556c0-.216.077-.398.232-.548l2.167-2.174-2.167-2.159a.768.768 0 01-.232-.547c0-.227.074-.413.224-.557a.773.773 0 01.556-.224c.216 0 .401.072.556.216l2.175 2.167 2.183-2.167a.759.759 0 01.556-.232c.216 0 .399.077.548.232.155.15.232.332.232.548 0 .21-.077.396-.232.556l-2.175 2.167 2.167 2.166c.155.144.232.33.232.556a.759.759 0 01-.232.556.755.755 0 01-.556.225.765.765 0 01-.565-.225l-2.158-2.166-2.15 2.166z"
      fill="#fff"
    />
  </Svg>
);

// https://www.figma.com/design/52qDYWUMjXAGre1dcnz5bz/Procivis-One-Wallet?node-id=415-5641&m=dev
export const CredentialWarningIcon: FC<SvgProps> = ({ ...props }) => (
  <Svg fill="none" height={20} viewBox="0 0 22 20" width={22} {...props}>
    <Path
      d="M4.357 17.967c-.481 0-.899-.105-1.253-.315a2.196 2.196 0 01-.822-.847A2.473 2.473 0 012 15.627c0-.421.11-.822.332-1.204L8.757 3.225c.216-.393.506-.689.871-.888a2.36 2.36 0 011.146-.299c.398 0 .777.1 1.137.299.36.194.653.49.88.888l6.425 11.198a2.384 2.384 0 01.332 1.204c0 .431-.097.824-.29 1.178a2.196 2.196 0 01-.822.847c-.35.21-.764.315-1.246.315H4.357z"
      fill="#F7BF0B"
    />
    <Path
      d="M1.4 17.274h-.001l.006.011c.281.515.683.927 1.188 1.227.534.316 1.134.455 1.764.455H17.19c.63 0 1.229-.138 1.759-.457.504-.3.905-.711 1.186-1.225.28-.512.413-1.071.413-1.659a3.345 3.345 0 00-.467-1.705L13.66 2.73v-.002a3.226 3.226 0 00-1.27-1.27 3.312 3.312 0 00-1.616-.42 3.36 3.36 0 00-1.624.42 3.172 3.172 0 00-1.265 1.276L1.467 13.92l-.001.002A3.364 3.364 0 001 15.627c0 .582.128 1.138.4 1.647z"
      stroke="#fff"
      strokeOpacity={0.2}
      strokeWidth={2}
    />
    <Path
      d="M11.538 11.51c-.011.514-.263.771-.756.771-.503 0-.763-.254-.78-.763l-.116-4.184a.766.766 0 01.232-.614c.166-.166.385-.25.656-.25.266 0 .484.084.656.25.171.16.252.368.24.622l-.132 4.167zM11.496 14.871c-.2.177-.437.266-.714.266-.277 0-.517-.089-.722-.266a.87.87 0 01-.299-.68c0-.272.1-.499.3-.681.198-.183.439-.274.721-.274.277 0 .515.091.714.274.2.182.299.41.299.68a.87.87 0 01-.299.681z"
      fill="#000"
    />
  </Svg>
);

// https://www.figma.com/design/52qDYWUMjXAGre1dcnz5bz/Procivis-One-Wallet?node-id=542-90920&m=dev
export const CredentialNoticInfoIcon: FC<SvgProps> = ({ ...props }) => {
  const colorScheme = useAppColorScheme();
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M12.36 10.732c.111 0 .2.09.2.2V15.8a.2.2 0 01-.2.2h-.66a.2.2 0 01-.2-.2v-4.868c0-.11.09-.2.2-.2h.66zM11.5 8.2c0-.11.09-.2.2-.2h.66c.111 0 .2.09.2.2v.699a.2.2 0 01-.2.2h-.66a.2.2 0 01-.2-.2V8.2z"
        fill={colorScheme.text}
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 19a7 7 0 100-14 7 7 0 000 14zm0 1a8 8 0 100-16 8 8 0 000 16z"
        fill={colorScheme.text}
      />
    </Svg>
  );
};

// https://www.figma.com/design/52qDYWUMjXAGre1dcnz5bz/Procivis-One-Wallet?node-id=542-93002&m=dev
export const CredentialNoticeWarningIcon: FC<SvgProps> = ({ ...props }) => {
  const colorScheme = useAppColorScheme();
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M12.36 13.268a.2.2 0 00.2-.2V8.2a.2.2 0 00-.2-.2h-.66a.2.2 0 00-.2.2v4.868c0 .11.09.2.2.2h.66zM11.5 15.8c0 .11.09.2.2.2h.66a.2.2 0 00.2-.2v-.699a.2.2 0 00-.2-.2h-.66a.2.2 0 00-.2.2v.699z"
        fill={colorScheme.text}
      />
      <Path
        d="M9.835 6.75c.962-1.667 3.368-1.667 4.33 0l4.33 7.5c.962 1.667-.24 3.75-2.165 3.75H7.67c-1.925 0-3.127-2.083-2.165-3.75l4.33-7.5z"
        stroke={colorScheme.text}
      />
    </Svg>
  );
};

// https://www.figma.com/file/S3WwgTMHuqxAsfu5zElCzq/App-Icon-Library-(Design)?type=design&node-id=41-478&t=yVRMjIPtDiBwq5Ax-4
export const UpIcon: FC<SvgProps> = ({ color, ...props }) => {
  const colorScheme = useAppColorScheme();
  return (
    <Svg fill="none" height={24} viewBox="0 0 24 24" width={24} {...props}>
      <Path
        d="M5.60988 14.8705C5.53977 14.805 5.5 14.7135 5.5 14.6177C5.5 14.522 5.53977 14.4305 5.60988 14.3649L11.4841 8.5L17.4018 14.3649C17.5327 14.5082 17.5327 14.7272 17.4018 14.8705L16.8796 15.3906C16.8138 15.4604 16.722 15.5 16.6258 15.5C16.5297 15.5 16.4378 15.4604 16.372 15.3906L11.5131 10.5513L6.62518 15.3906C6.55937 15.4604 6.46751 15.5 6.37135 15.5C6.2752 15.5 6.18333 15.4604 6.11753 15.3906L5.60988 14.8705Z"
        fill={color ?? colorScheme.text}
      />
    </Svg>
  );
};

// https://www.figma.com/file/S3WwgTMHuqxAsfu5zElCzq/App-Icon-Library-(Design)?type=design&node-id=41-477&t=yVRMjIPtDiBwq5Ax-4
export const DownIcon: FC<SvgProps> = ({ color, ...props }) => {
  const colorScheme = useAppColorScheme();
  return (
    <Svg fill="none" height={24} viewBox="0 0 24 24" width={24} {...props}>
      <Path
        d="M17.8901 9.12948C17.9602 9.19502 18 9.28652 18 9.38228C18 9.47804 17.9602 9.56954 17.8901 9.63508L12.0159 15.5L6.09821 9.63508C5.96726 9.49178 5.96726 9.27278 6.09821 9.12948L6.62036 8.60944C6.68616 8.53961 6.77803 8.5 6.87418 8.5C6.97034 8.5 7.06221 8.53961 7.12801 8.60944L11.9869 13.4487L16.8748 8.60944C16.9406 8.53961 17.0325 8.5 17.1286 8.5C17.2248 8.5 17.3167 8.53961 17.3825 8.60944L17.8901 9.12948Z"
        fill={color ?? colorScheme.text}
      />
    </Svg>
  );
};

export const RequiredAttributeIcon: FC<SvgProps> = ({ color, ...props }) => {
  const colorScheme = useAppColorScheme();
  return (
    <Svg fill="none" height={24} viewBox="0 0 24 24" width={24} {...props}>
      <Path
        d="M16.767 8.11a.432.432 0 00-.576 0l-6.013 5.941-3.109-3.149-.001-.001a.411.411 0 00-.576 0l-.375.364-.007.008a.432.432 0 000 .576l4.065 4.098 6.963-6.878.005-.005a.421.421 0 000-.568l-.368-.38-.008-.006z"
        fill={color ?? colorScheme.text}
      />
    </Svg>
  );
};
