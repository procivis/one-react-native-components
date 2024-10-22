import React, { FC, useMemo } from 'react';
import { AccessibilityProps, ColorValue, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { concatTestID } from '../../../utils/testID';
import BlurView from '../../blur/blur-view';
import ImageOrComponent, { ImageOrComponentSource } from '../../image/image-or-component';
import Typography, { TypographyProps } from '../../text/typography';
import { useAppColorScheme } from '../../theme/color-scheme-context';

export interface CredentialHeaderProps extends AccessibilityProps {
  accessory?: React.ComponentType<any> | React.ReactElement;
  blur?: boolean;
  color?: ColorValue;
  credentialDetailPrimary: string;
  credentialDetailSecondary?: string;
  credentialDetailTestID?: string;
  credentialDetailErrorColor?: boolean;
  credentialName: string;
  icon?: ImageOrComponentSource;
  iconLabelColor?: ColorValue;
  statusIcon?: React.ComponentType<any> | React.ReactElement;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

const CredentialHeader: FC<CredentialHeaderProps> = ({
  accessory,
  blur = true,
  color = '#5A69F3',
  credentialDetailPrimary,
  credentialDetailSecondary,
  credentialDetailTestID,
  credentialDetailErrorColor,
  credentialName,
  icon,
  iconLabelColor = '#FFFFFF',
  statusIcon,
  style,
  testID,
}) => {
  const colorScheme = useAppColorScheme();

  const statusIconView: React.ReactElement | undefined = useMemo(() => {
    if (!statusIcon) {
      return undefined;
    }
    if (React.isValidElement(statusIcon)) {
      return statusIcon;
    } else {
      const StatusIconComponent = statusIcon as React.ComponentType<any>;
      return <StatusIconComponent />;
    }
  }, [statusIcon]);

  const accessoryView: React.ReactElement | undefined = useMemo(() => {
    if (!accessory) {
      return undefined;
    }
    if (React.isValidElement(accessory)) {
      return accessory;
    } else {
      const AccessoryComponent = accessory as React.ComponentType<any>;
      return <AccessoryComponent />;
    }
  }, [accessory]);

  const DetailText = useMemo(() => {
    const commonProps: TypographyProps = {
      color: credentialDetailErrorColor ? colorScheme.error : colorScheme.text,
      ellipsizeMode: 'tail',
      numberOfLines: 1,
      preset: 'xs',
      style: styles.detailText,
    };
    return (
      <View style={styles.detailTextContainer}>
        <Typography {...commonProps} testID={credentialDetailTestID ?? concatTestID(testID, 'primaryDetail')}>
          {credentialDetailPrimary}
        </Typography>
        {credentialDetailSecondary ? (
          <>
            <Typography {...commonProps} style={styles.interpunct}>
              {'·'}
            </Typography>
            <Typography {...commonProps} testID={concatTestID(testID, 'secondaryDetail')}>
              {credentialDetailSecondary}
            </Typography>
          </>
        ) : null}
      </View>
    );
  }, [
    credentialDetailPrimary,
    credentialDetailSecondary,
    colorScheme,
    testID,
    credentialDetailErrorColor,
    credentialDetailTestID,
  ]);

  return (
    <View style={[styles.container, { backgroundColor: blur ? undefined : colorScheme.white }, style]} testID={testID}>
      {blur && <BlurView blurStyle="strong" style={StyleSheet.absoluteFill} />}
      <View style={[styles.imageContainer, { backgroundColor: color }]}>
        {icon ? (
          <ImageOrComponent testID={concatTestID(testID, 'logoIcon')} source={icon} style={styles.image} />
        ) : (
          <View testID={concatTestID(testID, 'logoBackgroundColor', String(color))}>
            <View testID={concatTestID(testID, 'logoTextColor', String(iconLabelColor))}>
              <Typography
                testID={concatTestID(testID, 'logoName')}
                color={iconLabelColor}
                preset="m"
                style={styles.imagePlaceholder}>
                {credentialName.substring(0, 1)}
              </Typography>
            </View>
          </View>
        )}
      </View>
      {statusIconView && <View style={styles.statusIconWrapper}>{statusIconView}</View>}
      <View style={styles.text}>
        <Typography
          testID={concatTestID(testID, 'name')}
          color={colorScheme.text}
          ellipsizeMode={'tail'}
          numberOfLines={1}
          preset="regular"
          style={styles.nameText}>
          {credentialName}
        </Typography>
        {DetailText}
      </View>
      {accessoryView && <View style={styles.accessory}>{accessoryView}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  accessory: {
    alignItems: 'center',
    height: 44,
    justifyContent: 'center',
    width: 44,
  },
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 60,
    padding: 8,
  },
  detailText: {
    opacity: 0.7,
  },
  detailTextContainer: {
    flexDirection: 'row',
    marginTop: -1,
  },
  image: {
    height: 44,
    width: 44,
  },
  imageContainer: {
    alignItems: 'center',
    borderRadius: 5,
    height: 44,
    justifyContent: 'center',
    marginRight: 8,
    overflow: 'hidden',
    width: 44,
  },
  imagePlaceholder: {
    paddingLeft: 1,
    paddingTop: 3,
    textTransform: 'uppercase',
  },
  interpunct: {
    marginHorizontal: 12,
    opacity: 0.5,
  },
  nameText: {
    marginTop: 2,
  },
  statusIconWrapper: {
    bottom: 3,
    left: 36,
    position: 'absolute',
  },
  text: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default CredentialHeader;
