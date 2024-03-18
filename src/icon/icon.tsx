import React from 'react';
import Svg, { Circle, Path, Rect, SvgProps } from 'react-native-svg';

import { useAccessibilityTranslation } from '../accessibility/accessibilityLanguage';
import { useAppColorScheme } from '../theme';

interface IconProps {
  accent?: boolean;
}

// https://www.figma.com/file/S3WwgTMHuqxAsfu5zElCzq/App-Icon-Library-(Design)?node-id=41%3A994&t=5URobypfDocdb0UT-4
export const HelpIcon: React.FunctionComponent<SvgProps> = (svgProps) => {
  const colorScheme = useAppColorScheme();
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...svgProps}>
      <Path
        d="M8.00054 9.45C8.12654 7.526 9.73154 6 11.6875 6C13.7235 6 15.3805 7.658 15.3805 9.695C15.3805 11.556 13.9985 13.099 12.2065 13.353V14.682C12.2065 14.809 12.1045 14.911 11.9775 14.911H11.3965C11.2695 14.911 11.1665 14.809 11.1665 14.682V12.579C11.1665 12.452 11.2695 12.35 11.3965 12.35H11.6875C13.1495 12.35 14.3415 11.159 14.3415 9.695C14.3415 8.231 13.1495 7.04 11.6875 7.04C10.2935 7.04 9.14754 8.119 9.03954 9.485C9.03054 9.604 8.93154 9.695 8.81254 9.695H8.22954C8.09654 9.695 7.99154 9.582 8.00054 9.45ZM11.4495 15.961H11.9185C12.0755 15.961 12.2035 16.088 12.2035 16.246V16.715C12.2035 16.873 12.0755 17 11.9185 17H11.4495C11.2925 17 11.1645 16.873 11.1645 16.715V16.246C11.1645 16.088 11.2925 15.961 11.4495 15.961Z"
        fill={colorScheme.text}
      />
    </Svg>
  );
};

// https://www.figma.com/file/S3WwgTMHuqxAsfu5zElCzq/App-Icon-Library-(Design)?node-id=321%3A124&t=5URobypfDocdb0UT-4
export const SearchIcon: React.FunctionComponent<SvgProps> = ({ color, ...props }) => (
  <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
    <Path
      fillRule="evenodd"
      d="M14.901 14.1211L17.5618 16.8133C17.6281 16.9071 17.6281 17.0325 17.5618 17.1263L17.1549 17.5228C17.0514 17.617 16.8932 17.617 16.7897 17.5228L14.1288 14.8828C12.3615 16.2977 9.84963 16.299 8.08086 14.8859C6.31209 13.4728 5.75865 11.0227 6.74828 8.9866C7.73792 6.95045 10.0064 5.8719 12.2103 6.3897C14.4142 6.90749 15.9651 8.88337 15.9445 11.1472C15.9405 12.2275 15.5729 13.2751 14.901 14.1211ZM7.45054 11.1472C7.45054 13.2103 9.12305 14.8828 11.1862 14.8828C13.2493 14.8828 14.9218 13.2103 14.9218 11.1472C14.9218 9.08404 13.2493 7.41153 11.1862 7.41153C9.12305 7.41153 7.45054 9.08404 7.45054 11.1472Z"
      fill={color}
    />
  </Svg>
);

// https://www.figma.com/file/S3WwgTMHuqxAsfu5zElCzq/App-Icon-Library-(Design)?node-id=7%3A78&t=fpGcTOUqtByg8pvj-4
export const ClearIcon: React.FunctionComponent = () => {
  const colorScheme = useAppColorScheme();
  const t = useAccessibilityTranslation();
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" accessibilityLabel={t('accessibility.control.clear')}>
      <Circle cx={12} cy={12} r={6} fill={colorScheme.lighterGrey} />
      <Path
        d="M12.6487 11.9359L14.7939 9.79069C14.843 9.74457 14.8709 9.68017 14.8709 9.61277C14.8709 9.54537 14.843 9.48097 14.7939 9.43485L14.438 9.06884C14.3355 8.98155 14.1847 8.98155 14.0822 9.06884L11.937 11.2141L9.79175 9.06884C9.6909 8.97705 9.53677 8.97705 9.43591 9.06884L9.0699 9.43485C8.97811 9.53571 8.97811 9.68984 9.0699 9.79069L11.2151 11.9359L9.0699 14.0811C8.9767 14.1853 8.9767 14.3429 9.0699 14.4471L9.43591 14.803C9.48203 14.8521 9.54643 14.88 9.61383 14.88C9.68123 14.88 9.74563 14.8521 9.79175 14.803L11.937 12.6476L14.0822 14.7928C14.1301 14.8425 14.1962 14.8706 14.2652 14.8706C14.3342 14.8706 14.4003 14.8425 14.4482 14.7928L14.804 14.437C14.8981 14.3354 14.8936 14.1772 14.7939 14.0811L12.6487 11.9359Z"
        fill={colorScheme.black}
      />
    </Svg>
  );
};

// https://www.figma.com/file/S3WwgTMHuqxAsfu5zElCzq/App-Icon-Library-(Design)?node-id=124-192&t=dEPaa04tNOoY6290-4
export const DeleteIcon: React.FunctionComponent = () => {
  const colorScheme = useAppColorScheme();
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <Path d="M7.375 9.09363V18.6329H15.625V9.09363" stroke={colorScheme.text} />
      <Path d="M6 7.04681H17" stroke={colorScheme.text} stroke-linecap="square" />
      <Path d="M11.5 10.4583V15.9165" stroke={colorScheme.text} stroke-linecap="square" />
      <Path d="M11.5 5V6.3645" stroke={colorScheme.text} stroke-linecap="square" />
    </Svg>
  );
};

export const ErrorStateIcon: React.FunctionComponent<IconProps> = ({ accent = true }) => {
  const colorScheme = useAppColorScheme();
  return (
    <Svg fill="none" viewBox="0 0 160 161" width={150} height={150}>
      <Rect width={160} height={160} y={0.5} fill={accent ? colorScheme.accentSecondary : colorScheme.accent} rx={80} />
      <Rect width={136} height={136} x={12} y={12.5} fill={accent ? colorScheme.accent : colorScheme.white} rx={68} />
      <Path
        fill={accent ? colorScheme.white : colorScheme.black}
        fillRule="evenodd"
        d="m80.298 53.684 30.874 50.17H49.424l30.874-50.17ZM77.162 91.31h6.271v6.272h-6.271V91.31Zm6.271-21.949h-6.271V85.04h6.271V69.362Z"
        clipRule="evenodd"
      />
    </Svg>
  );
};

export const ChevronLeft = (props: any) => {
  const colorScheme = useAppColorScheme();
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" {...props}>
      <Path
        d="M15.37 17.89a.346.346 0 01-.505 0L9 12.016l5.865-5.918a.374.374 0 01.505 0l.52.522a.349.349 0 010 .508l-4.839 4.859 4.84 4.888a.349.349 0 010 .508l-.52.507z"
        fill={props.foreground ?? colorScheme.white}
      />
    </Svg>
  );
};

export const ChevronRight = (props: any) => {
  const colorScheme = useAppColorScheme();
  return (
    <Svg width="24" height="24" viewBox="0 0 24 24" {...props}>
      <Path
        d="M8.63 6.11a.346.346 0 01.505 0L15 11.984l-5.865 5.918a.375.375 0 01-.506 0l-.52-.522a.349.349 0 010-.508l4.84-4.859-4.84-4.888a.349.349 0 010-.507l.52-.508z"
        fill={props.foreground ?? colorScheme.white}
      />
    </Svg>
  );
};
