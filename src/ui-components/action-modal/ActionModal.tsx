import React, { FunctionComponent, PropsWithChildren } from 'react';
import { Modal, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { useAppColorScheme } from '../theme';

interface Props {
  contentStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  testID?: string;
  visible: boolean;
}

const styles = StyleSheet.create({
  background: {
    height: '100%',
    width: '100%',
  },
  contentContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: 'auto',
    width: '100%',
  },
});

const ActionModal: FunctionComponent<PropsWithChildren<Props>> = ({
  children,
  contentStyle,
  style,
  visible,
  testID,
}) => {
  const colorScheme = useAppColorScheme();
  const overlay = 'rgba(0, 0, 0, 0.5)';

  return (
    <Modal animationType="fade" statusBarTranslucent style={style} transparent visible={visible}>
      <View style={[styles.background, { backgroundColor: overlay }]} testID={testID}>
        <View style={[styles.contentContainer, { backgroundColor: colorScheme.white }, contentStyle]}>{children}</View>
      </View>
    </Modal>
  );
};

export default ActionModal;
