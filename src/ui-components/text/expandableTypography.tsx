import React, { useCallback, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { concatTestID } from '../../utils';
import { Button, ButtonType } from '../buttons';
import { useAppColorScheme } from '../theme/color-scheme-context';
import Typography, { TypographyProps } from './typography';

const testID = 'expandableTypography';

export type ExpandableTypographyProps = TypographyProps & {
  hideExpandButton?: boolean;
  lessLabel?: string;
  moreLabel?: string;
  numberOfLines?: number;
};

const ExpandableTypography: React.FC<ExpandableTypographyProps> = ({
  numberOfLines = 3,
  hideExpandButton,
  moreLabel = 'More',
  lessLabel = 'Less',
  style,
  ...props
}) => {
  const colorScheme = useAppColorScheme();
  const [expanded, setExpanded] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);

  const handlePress = useCallback(() => {
    setExpanded((prev) => !prev);
  }, []);

  return (
    <View style={style}>
      <Typography
        {...props}
        numberOfLines={undefined}
        onTextLayout={(e) => {
          setIsTruncated(e.nativeEvent.lines.length > numberOfLines);
        }}
        style={styles.hiddenTypography}
      />
      <Typography
        {...props}
        numberOfLines={expanded ? undefined : numberOfLines}
      />
      {(isTruncated || expanded) && !hideExpandButton && (
        <Button
          onPress={handlePress}
          style={[
            styles.button,
            {
              backgroundColor: colorScheme.background,
            },
          ]}
          testID={concatTestID(testID, 'showMore')}
          title={expanded ? lessLabel : moreLabel}
          type={ButtonType.Secondary}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
    paddingVertical: 12,
  },
  hiddenTypography: { opacity: 0, position: 'absolute', zIndex: -1 },
});

export default ExpandableTypography;
