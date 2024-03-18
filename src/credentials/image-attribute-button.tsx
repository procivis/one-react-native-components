import React, { FunctionComponent } from 'react';
import { StyleSheet, TouchableOpacityProps } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { TouchableOpacity } from '../accessibility/accessibilityHistoryWrappers';
import { Typography } from '../text';
import { useAppColorScheme } from '../theme';

const ImageAttributeIcon: FunctionComponent = () => {
  const colorScheme = useAppColorScheme();
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        fillRule="evenodd"
        d="M16.4 11.2156H16.7721C17.4494 11.2156 18 11.7709 18 12.4527V14.3433C18 15.0262 17.4494 15.5815 16.7721 15.5815H16.4V16.7553C16.4 17.4415 15.8526 18 15.1786 18H8.22246C7.54849 18 7 17.4415 7 16.7553V7.23164C7 6.552 7.54849 6 8.22246 6H12.9901L16.4 9.43855V11.2156ZM15.1786 16.9091C15.2554 16.9091 15.3182 16.8393 15.3182 16.7553V15.5815H11.852C11.1758 15.5815 10.6252 15.0262 10.6252 14.3433V12.4527C10.6252 11.7709 11.1758 11.2156 11.852 11.2156H15.3182V10.2098H13.6489C12.8624 10.2098 12.2231 9.56509 12.2231 8.77309V7.09091H8.22246C8.14241 7.09091 8.08183 7.15091 8.08183 7.23164V16.7553C8.08183 16.8382 8.14565 16.9091 8.22246 16.9091H15.1786ZM16.7721 14.4905C16.8522 14.4905 16.9182 14.424 16.9182 14.3433V12.4527C16.9182 12.3709 16.8522 12.3065 16.7721 12.3065H11.852C11.7719 12.3065 11.707 12.3709 11.707 12.4527V14.3433C11.707 14.424 11.7719 14.4905 11.852 14.4905H16.7721ZM13.3049 7.86L14.5533 9.11891H13.6489C13.4596 9.11891 13.3049 8.96291 13.3049 8.77309V7.86Z"
        fill={colorScheme.linkText}
      />
    </Svg>
  );
};

export interface ImageAttributeButtonProps extends TouchableOpacityProps {
  title: string;
}

/**
 * Image attribute preview button
 * @see https://www.figma.com/file/aIHcwVfjAur4Vptsh4cjKt/Procivis-Wallet-%E2%80%93-Design?node-id=2647%3A525887
 */
const ImageAttributeButton: FunctionComponent<ImageAttributeButtonProps> = ({ title, style, ...touchableProps }) => {
  const colorScheme = useAppColorScheme();
  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityLabel={title}
      style={[styles.container, style]}
      {...touchableProps}>
      <ImageAttributeIcon />
      <Typography color={colorScheme.linkText}>{title}</Typography>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default ImageAttributeButton;
