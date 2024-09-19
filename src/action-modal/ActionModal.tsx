import React, { FunctionComponent, PropsWithChildren } from 'react';
import { Modal, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { useAppColorScheme } from '../theme';

interface Props {
  contentStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  visible: boolean;
  testID?: string;
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
      <View testID={testID} style={[styles.background, { backgroundColor: overlay }]}>
        <View style={[styles.contentContainer, { backgroundColor: colorScheme.white }, contentStyle]}>{children}</View>
      </View>
    </Modal>
  );
};

export default ActionModal;
