import React, {
  ComponentType,
  FC,
  PropsWithChildren,
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Image, ImageSourcePropType, ImageStyle, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { TouchableHighlight, TouchableOpacity } from '../accessibility/accessibilityHistoryWrappers';
import Typography from '../text/typography';
import { useAppColorScheme } from '../theme/color-scheme-context';
import { colorWithAlphaComponent } from '../utils/color';
import { concatTestID } from '../utils/testID';

type CredentialAttributeItemButtonProps = {
  disabled?: boolean;
  id: string;
  onPress?: (id: string, selected: boolean) => void;
  selected?: boolean;
};

const CredentialAttributeItemButton: FC<PropsWithChildren<CredentialAttributeItemButtonProps>> = ({
  children,
  disabled,
  id,
  onPress,
  selected,
}) => {
  const colorScheme = useAppColorScheme();

  const pressHandler = useCallback(() => {
    if (!onPress) {
      return;
    }
    onPress(id, !selected);
  }, [onPress, id, selected]);

  if (!onPress) {
    return <View style={[styles.dataItemButton, styles.dataItemButtonChildren]}>{children}</View>;
  }

  if (selected) {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        disabled={disabled}
        onPress={pressHandler}
        style={[styles.dataItemButton, { backgroundColor: colorScheme.background }]}>
        <View style={styles.dataItemButtonChildren}>{children}</View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableHighlight
      disabled={disabled}
      onPress={pressHandler}
      underlayColor={colorWithAlphaComponent(colorScheme.background, 0.5)}
      style={styles.dataItemButton}>
      <View style={styles.dataItemButtonChildren}>{children}</View>
    </TouchableHighlight>
  );
};

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
  disabled?: boolean;
  selected?: boolean;
  id: string;
  name: string;
  rightAccessory?: ComponentType<any> | ReactElement;
  testID?: string;
};

export type CredentialAttributeItemProps = CredentialAttribute & {
  last: boolean | undefined;
  onImagePreview?: (name: string, image: ImageSourcePropType) => void;
  onPress?: (id: string, selected: boolean) => void;
  style?: StyleProp<ViewStyle>;
};

const CredentialAttributeItem: FC<CredentialAttributeItemProps> = ({
  attributes,
  disabled,
  id,
  image,
  last,
  name,
  onImagePreview,
  onPress,
  rightAccessory,
  selected,
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
    <View style={[styles.dataItem, style]} testID={testID}>
      <View style={styles.dataItemRow}>
        {attributes && (
          <>
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
            <View style={styles.dataAttributes}>
              <Typography
                color={colorScheme.text}
                preset="xs/line-height-small"
                style={[styles.dataItemLabel, styles.dataAttributesLabel]}
                testID={concatTestID(testID, 'title')}>
                {name}
              </Typography>
              {attributes &&
                attributes.map((attribute, index, { length }) => (
                  <CredentialAttributeItem
                    key={attribute.id}
                    last={index === length - 1 || true}
                    onImagePreview={onImagePreview}
                    {...attribute}
                  />
                ))}
            </View>
          </>
        )}
        {!attributes && (
          <CredentialAttributeItemButton disabled={disabled} id={id} onPress={onPress} selected={selected}>
            <View style={styles.dataItemLeft}>
              <Typography
                color={colorScheme.text}
                preset="xs/line-height-small"
                style={styles.dataItemLabel}
                testID={concatTestID(testID, 'title')}>
                {name}
              </Typography>
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
          </CredentialAttributeItemButton>
        )}
      </View>
      {!last && <View style={[styles.separator, { backgroundColor: colorScheme.background }]} />}
    </View>
  );
};

const styles = StyleSheet.create({
  dataAttributes: {
    alignItems: 'stretch',
    flex: 1,
    marginTop: 8,
  },
  dataAttributesLabel: {
    marginLeft: 8,
  },
  dataItem: {
    alignItems: 'stretch',
    marginTop: 2,
  },
  dataItemButton: {
    borderRadius: 8,
    flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 11,
  },
  dataItemButtonChildren: {
    alignItems: 'center',
    flexDirection: 'row',
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
  dataItemLeft: {
    flex: 1,
  },
  dataItemRow: {
    flexDirection: 'row',
  },
  decorator: {
    width: 16,
  },
  decoratorCircle: {
    alignItems: 'center',
    borderRadius: 3.5,
    borderWidth: 1,
    height: 7,
    justifyContent: 'center',
    left: 4,
    position: 'absolute',
    top: 13,
    width: 7,
  },
  decoratorCircleInner: {
    borderRadius: 2,
    borderWidth: 1,
    height: 4,
    width: 4,
  },
  decoratorLine: {
    bottom: 12,
    left: 7,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  separator: {
    height: 1,
    marginHorizontal: 8,
    marginTop: -1,
  },
});

export default CredentialAttributeItem;
