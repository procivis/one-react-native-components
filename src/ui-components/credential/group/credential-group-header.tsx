import React, { FC, useMemo } from 'react';
import { AccessibilityProps, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { concatTestID } from '../../../utils';
import { Typography } from '../../text';
import { useAppColorScheme } from '../../theme';

export interface CredentialGroupHeaderProps extends AccessibilityProps {
  accessory?: React.ComponentType<any> | React.ReactElement;
  name: string;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

const CredentialGroupHeader: FC<CredentialGroupHeaderProps> = ({ accessory, name, style, testID, ...props }) => {
  const colorScheme = useAppColorScheme();

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

  return (
    <View {...props} style={[styles.container, style]} testID={testID}>
      <View style={styles.text}>
        <Typography
          color={colorScheme.white}
          ellipsizeMode={'tail'}
          numberOfLines={1}
          preset="regular"
          style={styles.nameText}
          testID={concatTestID(testID, 'name')}>
          {name}
        </Typography>
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
  nameText: {
    marginTop: 2,
  },
  text: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default CredentialGroupHeader;
