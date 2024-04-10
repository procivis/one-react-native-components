import React, { FC, useMemo } from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';

import Typography from '../text/typography';
import { useAppColorScheme } from '../theme/color-scheme-context';
import { concatTestID } from '../utils';

export type NavigationHeaderProps = ViewProps & {
  leftItem?: React.ComponentType<any> | React.ReactElement;
  modalHandleVisible?: boolean;
  rightItem?: React.ComponentType<any> | React.ReactElement;
  title?: string;
};

const NavigationHeader: FC<NavigationHeaderProps> = ({
  leftItem,
  modalHandleVisible,
  rightItem,
  style,
  testID,
  title,
  ...props
}) => {
  const colorScheme = useAppColorScheme();
  const leftItemView: React.ReactElement | undefined = useMemo(() => {
    if (!leftItem) {
      return undefined;
    }
    if (React.isValidElement(leftItem)) {
      return leftItem;
    } else {
      const LeftItemComponent = leftItem as React.ComponentType<any>;
      return <LeftItemComponent />;
    }
  }, [leftItem]);

  const rightItemView: React.ReactElement | undefined = useMemo(() => {
    if (!rightItem) {
      return undefined;
    }
    if (React.isValidElement(rightItem)) {
      return rightItem;
    } else {
      const RightItemComponent = rightItem as React.ComponentType<any>;
      return <RightItemComponent />;
    }
  }, [rightItem]);

  return (
    <View
      {...props}
      style={[styles.headerContainer, { backgroundColor: colorScheme.background }, style]}
      testID={testID}>
      {modalHandleVisible && <View style={[styles.modalHandle, { backgroundColor: colorScheme.grayDark }]} />}
      <View style={styles.header}>
        <View style={styles.sideItem}>{leftItemView}</View>
        <Typography color={colorScheme.text} preset="m" testID={concatTestID(testID, 'title')}>
          {title}
        </Typography>
        <View style={[styles.sideItem, styles.rightSideItem]}>{rightItemView}</View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 48,
    width: '100%',
  },
  headerContainer: {
    alignItems: 'center',
    flexDirection: 'column',
    paddingHorizontal: 8,
  },
  modalHandle: {
    borderRadius: 2.5,
    height: 5,
    marginVertical: 5,
    width: 36,
  },
  rightSideItem: {
    alignItems: 'flex-end',
  },
  sideItem: {
    flex: 1,
    padding: 12,
  },
});

export default NavigationHeader;
