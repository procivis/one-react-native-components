import React, {
  ComponentType,
  FC,
  PropsWithChildren,
  ReactElement,
  useCallback,
  useMemo,
} from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';

import { colorWithAlphaComponent } from '../../utils/color';
import { concatTestID } from '../../utils/testID';
import {
  TouchableHighlight,
  TouchableOpacity,
} from '../accessibility/accessibilityHistoryWrappers';
import ExpandableTypography from '../text/expandableTypography';
import Typography from '../text/typography';
import { useAppColorScheme } from '../theme/color-scheme-context';

type CredentialAttributeItemButtonProps = {
  disabled?: boolean;
  id: string;
  onPress?: (id: string, selected: boolean) => void;
  selected?: boolean;
};

const CredentialAttributeItemButton: FC<
  PropsWithChildren<CredentialAttributeItemButtonProps>
> = ({ children, disabled, id, onPress, selected }) => {
  const colorScheme = useAppColorScheme();

  const pressHandler = useCallback(() => {
    if (!onPress) {
      return;
    }
    onPress(id, !selected);
  }, [onPress, id, selected]);

  if (!onPress) {
    return <View style={styles.touchableAttribute}>{children}</View>;
  }

  if (selected) {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        disabled={disabled}
        onPress={pressHandler}
        style={[
          styles.touchableAttribute,
          { backgroundColor: colorScheme.background },
        ]}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return (
    <TouchableHighlight
      disabled={disabled}
      onPress={pressHandler}
      style={styles.touchableAttribute}
      underlayColor={colorWithAlphaComponent(colorScheme.background, 0.5)}
    >
      {children}
    </TouchableHighlight>
  );
};

const IMAGE_SIZE = 64;

export type CredentialAttributeValue =
  | {
      attributes: CredentialAttribute[];
      image?: never;
      testID?: string;
      value?: never;
      valueErrorColor?: never;
      values?: never;
    }
  | {
      attributes?: never;
      image: ImageSourcePropType;
      testID?: string;
      value?: never;
      valueErrorColor?: never;
      values?: never;
    }
  | {
      attributes?: never;
      image?: never;
      testID?: string;
      value: string;
      valueErrorColor?: boolean;
      values?: never;
    }
  | {
      attributes?: never;
      image?: never;
      testID?: string;
      value?: never;
      valueErrorColor?: boolean;
      values: CredentialAttribute[];
    };

export type CredentialAttribute = CredentialAttributeValue & {
  disabled?: boolean;
  id: string;
  listValue?: boolean;
  name?: string;
  nested?: boolean;
  path: string;
  rightAccessory?: ComponentType<any> | ReactElement;
  selected?: boolean;
};

export type CredentialAttributeItemProps = CredentialAttribute & {
  isExpanded?: boolean;
  last: boolean | undefined;
  lessLabel?: string;
  moreLabel?: string;
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
  nested = false,
  listValue = false,
  selected,
  style,
  testID,
  value,
  values,
  valueErrorColor,
  isExpanded,
  moreLabel,
  lessLabel,
}) => {
  const colorScheme = useAppColorScheme();

  const imagePreviewHandler = useCallback(() => {
    if (!onImagePreview || !image) {
      return;
    }
    onImagePreview(name ?? '', image);
  }, [image, name, onImagePreview]);

  const rightAccessoryView: React.ReactElement | undefined = useMemo(() => {
    if (!rightAccessory) {
      return undefined;
    }
    if (React.isValidElement(rightAccessory)) {
      return rightAccessory;
    } else {
      const RightAccessoryComponent =
        rightAccessory as React.ComponentType<any>;
      return <RightAccessoryComponent />;
    }
  }, [rightAccessory]);

  const isObject = attributes && attributes.length > 0;
  const isArray = values && values.length > 0;

  const dataItemBorderStyle: ViewStyle = {
    borderColor: '#0004',
  };

  return (
    <View
      style={[!nested && styles.attributeItemContainer, style]}
      testID={testID}
    >
      <View style={styles.attributeItemRow}>
        <CredentialAttributeItemButton
          disabled={disabled}
          id={id}
          onPress={onPress}
          selected={selected}
        >
          <View style={styles.dataItemButtonChildren}>
            {(isObject || isArray || listValue) && (
              <View style={styles.decorator}>
                <View
                  style={[
                    styles.decoratorCircle,
                    listValue ? styles.listDecoratorCircle : undefined,
                    listValue && image
                      ? styles.listImageDecoratorCircle
                      : undefined,
                    { backgroundColor: colorScheme.text },
                  ]}
                >
                  <View
                    style={[
                      styles.decoratorCircleInner,
                      {
                        backgroundColor: colorScheme.text,
                        borderColor: colorScheme.background,
                      },
                    ]}
                  />
                </View>
                <View
                  style={[
                    styles.decoratorLine,
                    listValue ? styles.listDecoratorLine : undefined,
                    listValue && value
                      ? styles.listStringValueDecoratorLine
                      : undefined,
                    listValue && image
                      ? styles.listImageDecoratorLine
                      : undefined,
                    { backgroundColor: colorScheme.text },
                  ]}
                />
              </View>
            )}
            <View
              style={[
                isObject || isArray || listValue
                  ? styles.objectAttributeItem
                  : styles.attributeItem,
                nested && styles.nestedAttributeItem,
              ]}
            >
              {name && (
                <Typography
                  color={colorScheme.text}
                  preset={image ? 'xs' : 'xs/line-height-small'}
                  style={
                    isObject || isArray
                      ? styles.nestedObjectLabel
                      : styles.dataItemLabel
                  }
                  testID={concatTestID(testID, 'title')}
                >
                  {name}
                </Typography>
              )}
              {image && (
                <TouchableOpacity
                  disabled={!onImagePreview}
                  onPress={imagePreviewHandler}
                  style={[
                    styles.dataItemImageWrapper,
                    dataItemBorderStyle,
                    listValue ? styles.listValue : undefined,
                  ]}
                >
                  <Image
                    resizeMode="cover"
                    source={image}
                    style={styles.dataItemImage}
                    testID={concatTestID(testID, 'image')}
                  />
                </TouchableOpacity>
              )}
              {value && (
                <ExpandableTypography
                  color={valueErrorColor ? colorScheme.error : colorScheme.text}
                  ellipsizeMode="tail"
                  hideExpandButton={!isExpanded && !listValue && !nested}
                  lessLabel={lessLabel}
                  moreLabel={moreLabel}
                  numberOfLines={3}
                  preset="s"
                  style={listValue ? styles.listValue : undefined}
                  testID={concatTestID(testID, 'value')}
                >
                  {value}
                </ExpandableTypography>
              )}
              {isObject &&
                attributes.map((attribute, index, { length }) => (
                  <CredentialAttributeItem
                    key={attribute.id}
                    last={index === length - 1}
                    nested={true}
                    onImagePreview={onImagePreview}
                    onPress={onPress}
                    {...attribute}
                  />
                ))}
              {isArray &&
                values.map((arrayValue, index, { length }) => (
                  <CredentialAttributeItem
                    key={arrayValue.id}
                    last={index === length - 1}
                    listValue={true}
                    onImagePreview={onImagePreview}
                    onPress={onPress}
                    {...arrayValue}
                    name={undefined}
                  />
                ))}
              <View />
            </View>
            {rightAccessoryView && (
              <View
                style={[
                  styles.rightAccessory,
                  isObject && styles.objectAccessory,
                ]}
              >
                {rightAccessoryView}
              </View>
            )}
          </View>
        </CredentialAttributeItemButton>
      </View>
      {!last && !nested && (
        <View
          style={[
            styles.separator,
            { backgroundColor: colorScheme.background },
          ]}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  attributeItem: {
    flex: 1,
    paddingLeft: 8,
    paddingRight: 8,
  },
  attributeItemContainer: {
    marginTop: 2,
  },
  attributeItemRow: {
    flexDirection: 'row',
  },
  dataItemButtonChildren: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  dataItemImage: {
    height: IMAGE_SIZE,
    width: IMAGE_SIZE,
  },
  dataItemImageWrapper: {
    borderRadius: 4,
    borderWidth: 0.5,
    height: IMAGE_SIZE,
    marginTop: 4,
    overflow: 'hidden',
    width: IMAGE_SIZE,
  },
  dataItemLabel: {
    marginBottom: 4,
    opacity: 0.7,
  },
  decorator: {
    height: '100%',
    justifyContent: 'center',
    left: 8,
    position: 'absolute',
  },
  decoratorCircle: {
    alignItems: 'center',
    borderRadius: 3.5,
    borderWidth: 1,
    height: 7,
    justifyContent: 'center',
    position: 'absolute',
    top: 6,
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
    left: 3,
    position: 'absolute',
    top: 13,
    width: 1,
  },
  listDecoratorCircle: {
    top: 18,
  },
  listDecoratorLine: {
    top: 25,
  },
  listImageDecoratorCircle: {
    top: 32,
  },
  listImageDecoratorLine: {
    bottom: 40,
    top: 39,
  },
  listStringValueDecoratorLine: {
    bottom: 24,
  },
  listValue: {
    marginLeft: 13,
    paddingVertical: 10,
  },
  nestedAttributeItem: {
    paddingLeft: 12,
  },
  nestedObjectLabel: {
    opacity: 0.7,
    paddingLeft: 13,
  },
  objectAccessory: {
    alignSelf: 'flex-start',
  },
  objectAttributeItem: {
    alignItems: 'stretch',
    flex: 1,
    paddingLeft: 12,
  },
  rightAccessory: {
    paddingHorizontal: 8,
    position: 'absolute',
    right: 0,
  },
  separator: {
    height: 1,
    marginHorizontal: 8,
    marginTop: -1,
  },
  touchableAttribute: {
    borderRadius: 8,
    borderWidth: 0,
    flex: 1,
    paddingVertical: 11,
  },
});

export default CredentialAttributeItem;
