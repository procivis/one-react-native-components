import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { Image, ImageSourcePropType, ImageStyle, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { TouchableOpacity } from '../accessibility/accessibilityHistoryWrappers';
import Typography from '../text/typography';
import { useAppColorScheme } from '../theme/color-scheme-context';
import { concatTestID } from '../utils/testID';

const imageHeight = 64;

export type CredentialAttributeItemProps = {
  id: string;
  image?: ImageSourcePropType;
  last: boolean | undefined;
  name: string;
  onImagePreview?: (name: string, image: ImageSourcePropType) => void;
  rightAccessory?: React.ComponentType<any> | React.ReactElement;
  style?: StyleProp<ViewStyle>;
  testID?: string;
  value?: string;
  valueErrorColor?: boolean;
};

const CredentialAttributeItem: FC<CredentialAttributeItemProps> = ({
  style,
  image,
  last,
  name,
  onImagePreview,
  rightAccessory,
  testID,
  value,
  valueErrorColor,
}) => {
  const colorScheme = useAppColorScheme();
  const [imageWidth, setImageWidth] = useState<number>();

  const imagePreviewHandler = useCallback(() => {
    if (!onImagePreview || !image) {
      return;
    }
    onImagePreview(name, image);
  }, [image, name, onImagePreview]);

  useEffect(() => {
    if (!image || typeof image !== 'object' || !('uri' in image) || !image.uri) {
      return;
    }
    Image.getSize(image.uri, (width, height) => {
      setImageWidth((width / height) * imageHeight);
    });
  }, [image]);

  const imageStyle: ImageStyle = {
    width: imageWidth ?? 'auto',
  };

  const rightAccessoryView: React.ReactElement | undefined = useMemo(() => {
    if (!rightAccessory) {
      return undefined;
    }
    if (React.isValidElement(rightAccessory)) {
      return rightAccessory;
    } else {
      const RightAccessoryComponent = rightAccessory as React.ComponentType<any>;
      return <RightAccessoryComponent />;
    }
  }, [rightAccessory]);

  return (
    <View
      style={[styles.dataItem, { borderColor: colorScheme.background }, last && styles.dataItemLast, style]}
      testID={testID}>
      <View style={styles.dataItemLeft}>
        <Typography
          color={colorScheme.text}
          preset="xs/line-height-small"
          style={styles.dataItemLabel}
          testID={concatTestID(testID, 'title')}>
          {name}
        </Typography>
        {value ? (
          <Typography
            color={valueErrorColor ? colorScheme.error : colorScheme.text}
            numberOfLines={10}
            preset="s"
            testID={concatTestID(testID, 'value')}>
            {value}
          </Typography>
        ) : image ? (
          <TouchableOpacity
            disabled={!onImagePreview}
            onPress={imagePreviewHandler}
            style={styles.dataItemImageWrapper}>
            <Image resizeMode="contain" source={image} style={[styles.dataItemImage, imageStyle]} />
          </TouchableOpacity>
        ) : undefined}
      </View>
      {rightAccessoryView}
    </View>
  );
};

const styles = StyleSheet.create({
  dataItem: {
    alignItems: 'center',
    borderBottomWidth: 1,
    flexDirection: 'row',
    marginTop: 12,
    paddingBottom: 8,
  },
  dataItemImage: {
    height: imageHeight,
  },
  dataItemImageWrapper: {
    height: imageHeight,
  },
  dataItemLabel: {
    marginBottom: 2,
    opacity: 0.7,
  },
  dataItemLast: {
    borderBottomWidth: 0,
  },
  dataItemLeft: {
    flex: 1,
  },
});

export default CredentialAttributeItem;
