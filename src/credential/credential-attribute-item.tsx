import React, { ComponentType, FC, ReactElement, useCallback, useEffect, useMemo, useState } from 'react';
import { Image, ImageSourcePropType, ImageStyle, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { TouchableOpacity } from '../accessibility/accessibilityHistoryWrappers';
import Typography from '../text/typography';
import { useAppColorScheme } from '../theme/color-scheme-context';
import { concatTestID } from '../utils/testID';

const IMAGE_HEIGHT = 64;

export type CredentialAttributeValue =
  | {
      attributes: CredentialAttribute[];
      image?: never;
      value?: never;
      valueErrorColor?: never;
    }
  | {
      attributes?: never;
      image: ImageSourcePropType;
      value?: never;
      valueErrorColor?: never;
    }
  | {
      attributes?: never;
      image?: never;
      value: string;
      valueErrorColor?: boolean;
    };

export type CredentialAttribute = CredentialAttributeValue & {
  id: string;
  name: string;
  rightAccessory?: ComponentType<any> | ReactElement;
  testID?: string;
};

export type CredentialAttributeItemProps = CredentialAttribute & {
  last: boolean | undefined;
  onImagePreview?: (name: string, image: ImageSourcePropType) => void;
  style?: StyleProp<ViewStyle>;
};

const CredentialAttributeItem: FC<CredentialAttributeItemProps> = ({
  attributes,
  image,
  last,
  name,
  onImagePreview,
  rightAccessory,
  style,
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
      setImageWidth((width / height) * IMAGE_HEIGHT);
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
      style={[
        styles.dataItem,
        {
          borderColor: colorScheme.background,
        },
        last && styles.dataItemLast,
        attributes && styles.dataItemNested,
        style,
      ]}
      testID={testID}>
      {attributes && (
        <View style={styles.decorator}>
          <View style={[styles.decoratorCircle, { backgroundColor: colorScheme.text }]}>
            <View
              style={[
                styles.decoratorCircleInner,
                { backgroundColor: colorScheme.text, borderColor: colorScheme.background },
              ]}
            />
          </View>
          <View style={[styles.decoratorLine, { backgroundColor: colorScheme.text }]} />
        </View>
      )}
      <View style={styles.dataItemLeft}>
        <Typography
          color={colorScheme.text}
          preset="xs/line-height-small"
          style={styles.dataItemLabel}
          testID={concatTestID(testID, 'title')}>
          {name}
        </Typography>
        {attributes &&
          attributes.map((attribute, index, { length }) => (
            <CredentialAttributeItem
              key={attribute.id}
              last={index === length - 1}
              onImagePreview={onImagePreview}
              {...attribute}
            />
          ))}
        {image && (
          <TouchableOpacity
            disabled={!onImagePreview}
            onPress={imagePreviewHandler}
            style={styles.dataItemImageWrapper}>
            <Image resizeMode="contain" source={image} style={[styles.dataItemImage, imageStyle]} />
          </TouchableOpacity>
        )}
        {value && (
          <Typography
            color={valueErrorColor ? colorScheme.error : colorScheme.text}
            numberOfLines={10}
            preset="s"
            testID={concatTestID(testID, 'value')}>
            {value}
          </Typography>
        )}
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
    height: IMAGE_HEIGHT,
    position: 'relative',
  },
  dataItemImageWrapper: {
    height: IMAGE_HEIGHT,
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
  dataItemNested: {
    paddingBottom: 0,
    paddingLeft: 16,
    position: 'relative',
  },
  decorator: {
    bottom: 13,
    left: 0,
    position: 'absolute',
    top: 5,
    width: 16,
  },
  decoratorCircle: {
    alignItems: 'center',
    borderRadius: 3.5,
    borderWidth: 1,
    height: 7,
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    top: 0,
    width: 7,
  },
  decoratorCircleInner: {
    borderRadius: 2,
    borderWidth: 1,
    height: 4,
    width: 4,
  },
  decoratorLine: {
    bottom: 0,
    left: 3,
    position: 'absolute',
    top: 7,
    width: 1,
  },
});

export default CredentialAttributeItem;
