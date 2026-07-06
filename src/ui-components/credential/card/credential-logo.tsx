import React, { FC } from 'react';
import { ColorValue, StyleSheet, View } from 'react-native';

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
  size?: CredentialLogoSize;
  testID?: string;
};

const CredentialLogo: FC<CredentialLogoProps> = ({
  color = '#5A69F3',
  credentialName,
  icon,
  iconLabelColor = '#FFFFFF',
  size = CredentialLogoSize.Regular,
  testID,
}) => {
  const sizeStyle = {
    height: size,
    width: size,
  };
  return (
    <View style={[styles.imageContainer, sizeStyle, { backgroundColor: color }]} testID={testID}>
      {icon ? (
        <ImageOrComponent testID={concatTestID(testID, 'icon')} source={icon} style={sizeStyle} />
      ) : (
        <View testID={concatTestID(testID, 'backgroundColor', String(color))}>
          <View testID={concatTestID(testID, 'textColor', String(iconLabelColor))}>
            <Typography
              testID={concatTestID(testID, 'name')}
              color={iconLabelColor}
              preset={size === CredentialLogoSize.Regular ? 'm' : 'xs'}
              style={[
                styles.imagePlaceholder,
                size === CredentialLogoSize.Regular ? styles.imagePlaceholderRegular : styles.imagePlaceholderSmall,
              ]}>
              {credentialName.substring(0, 1)}
            </Typography>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 0,
    justifyContent: 'center',
    marginRight: 8,
    overflow: 'hidden',
  },
  imagePlaceholder: {
    textTransform: 'uppercase',
  },
  imagePlaceholderRegular: {
    paddingLeft: 1,
    paddingTop: 3,
  },
  imagePlaceholderSmall: {
    paddingTop: 1,
  },
});

export default CredentialLogo;
