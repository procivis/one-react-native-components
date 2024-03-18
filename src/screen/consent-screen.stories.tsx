import type { ComponentMeta, Story } from '@storybook/react';
import React, { useMemo, useState } from 'react';
import { Insets, StyleSheet } from 'react-native';

import OnboardingEID_1 from '../../storybook/assets/OnboardingEID_1';
import { Placeholder } from '../../storybook/placeholder';
import { TouchableOpacity } from '../accessibility/accessibilityHistoryWrappers';
import ConsentScreen, { ConsentScreenProps } from './consent-screen';

type Args = ConsentScreenProps & {
  withRightAccessory?: boolean;
  onRightAction?: () => void;
  onButtonPress: () => void;
  secondaryButton?: boolean;
  withCheckBox?: boolean;
};

const hitSlop: Insets = { top: 8, bottom: 12, left: 24, right: 24 };
const illustration = { component: <OnboardingEID_1 /> };

const Basic: Story<Args> = ({
  withRightAccessory,
  onRightAction,
  onButtonPress,
  secondaryButton,
  withCheckBox,
  ...args
}) => {
  const buttons = useMemo(() => {
    const result = [{ title: 'Button Primary', onPress: onButtonPress }];
    if (secondaryButton) {
      result.push({ title: 'Button Secondary', onPress: onButtonPress });
    }
    return result;
  }, [onButtonPress, secondaryButton]);

  const [checkboxValue, setCheckboxValue] = useState(true);

  return (
    <ConsentScreen
      {...args}
      rightAccessory={
        withRightAccessory ? (
          <TouchableOpacity onPress={onRightAction} hitSlop={hitSlop}>
            <Placeholder id="R" style={styles.rightButton} />
          </TouchableOpacity>
        ) : undefined
      }
      illustration={illustration}
      buttons={buttons}
      checkbox={
        withCheckBox ? { text: 'Checkbox text', value: checkboxValue, onValueChanged: setCheckboxValue } : undefined
      }
    />
  );
};

Basic.args = {
  title: 'Title',
  description: 'A multi-line\ndescription',
  withRightAccessory: false,
  secondaryButton: false,
  withCheckBox: false,
};

export { Basic as ConsentScreen };

export default {
  title: 'view/Consent Screen',
  component: ConsentScreen,
  parameters: {
    noSafeArea: true,
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/baolhE7fB2BMdCN5RVjusX/App-Feature-Library?node-id=1757-50151&t=LrbaMkqDZcJcNx2E-4',
    },
  },
  argTypes: {
    onRightAction: { action: 'onRightAction' },
  },
} as ComponentMeta<typeof ConsentScreen>;

const styles = StyleSheet.create({
  rightButton: {
    height: 24,
    width: 24,
  },
});
