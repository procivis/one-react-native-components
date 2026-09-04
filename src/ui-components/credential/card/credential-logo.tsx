import React, { FC } from 'react';
import { ColorValue, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { concatTestID } from '../../../utils/testID';
import ImageOrComponent, { ImageOrComponentSource } from '../../image/image-or-component';
import Typography from '../../text/typography';

export enum CredentialLogoSize {
  Regular = 44,
  Small = 20,
}

export type CredentialLogoProps = {
  color?: ColorValue;
  credentialName: string;
  icon?: ImageOrComponentSource;
  iconLabelColor?: ColorValue;
  showFullName?: boolean;
  size?: CredentialLogoSize;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

const CredentialLogo: FC<CredentialLogoProps> = ({
  color = '#5A69F3',
  credentialName,
  icon,
  iconLabelColor = '#FFFFFF',
  showFullName,
  size = CredentialLogoSize.Regular,
  style,
  testID,
}) => {
  const sizeStyle = {
    height: size,
    width: size,
  };
  return (
    <View style={[styles.logo, sizeStyle, { backgroundColor: color }, style]} testID={testID}>
      {icon ? (
        <ImageOrComponent source={icon} style={sizeStyle} testID={concatTestID(testID, 'icon')} />
      ) : (
        <View testID={concatTestID(testID, 'backgroundColor', String(color))}>
          <View testID={concatTestID(testID, 'textColor', String(iconLabelColor))}>
            <Typography
              color={iconLabelColor}
              preset={size === CredentialLogoSize.Regular ? 'm' : 'xs'}
              style={[
                styles.imagePlaceholder,
                size === CredentialLogoSize.Regular ? styles.imagePlaceholderRegular : styles.imagePlaceholderSmall,
              ]}
              testID={concatTestID(testID, 'name')}>
              {showFullName ? credentialName : credentialName.substring(0, 1)}
            </Typography>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  imagePlaceholder: {
    textTransform: 'uppercase',
  },
  imagePlaceholderRegular: {
    paddingLeft: 1,
    paddingTop: 1,
  },
  imagePlaceholderSmall: {
    marginTop: -1,
  },
  logo: {
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 0,
    justifyContent: 'center',
    overflow: 'hidden',
  },
});

export default CredentialLogo;
