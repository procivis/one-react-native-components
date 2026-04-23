import React, { FC, useMemo } from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';

import { AvatarProps, TouchableOpacity } from '../../ui-components';
import EntityCluster from '../../ui-components/entity/entity-cluster';
import { EntityNotTrustedIcon, EntityTrustedIcon, UpIcon } from '../../ui-components/icons';
import { concatTestID } from '../../utils';

export type TrustInfoLabels = {
  unknown: string;
  unknownSubline: string;
};

export type TrustInfoProps = {
  labels: TrustInfoLabels;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  sublineColor?: string;
  testID?: string;
  textColor?: string;
  trustInformation?: {
    name: string;
  };
};

const TrustInfo: FC<TrustInfoProps> = ({
  labels,
  onPress,
  style,
  sublineColor,
  testID,
  textColor,
  trustInformation,
}) => {
  const avatarProps: AvatarProps | undefined = useMemo(() => {
    const placeholderText = trustInformation?.name.substring(0, 1) ?? labels.unknown.substring(0, 1);

    const statusIcon = trustInformation ? (
      <EntityTrustedIcon testID={concatTestID(testID, 'statusIcon', 'trusted')} />
    ) : (
      <EntityNotTrustedIcon testID={concatTestID(testID, 'statusIcon', 'notTrusted')} />
    );

    return {
      placeholderText,
      statusIcon,
    };
  }, [labels, testID, trustInformation]);

  const trustEntityName = useMemo(() => trustInformation?.name ?? labels.unknown, [labels.unknown, trustInformation]);

  return (
    <TouchableOpacity disabled={!onPress || !trustInformation} onPress={onPress} style={[styles.button, style]}>
      <EntityCluster
        avatar={avatarProps}
        entityName={trustEntityName}
        style={styles.cluster}
        subline={trustInformation ? undefined : labels.unknownSubline}
        sublineColor={sublineColor}
        testID={testID}
        textColor={textColor}
      />
      {onPress && trustInformation && <UpIcon color={textColor} style={styles.chevron} />}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    width: '100%',
  },
  chevron: {
    marginLeft: 10,
    marginRight: 18,
    transform: [
      {
        rotate: '90deg',
      },
    ],
  },
  cluster: {
    flex: 1,
    flexShrink: 1,
  },
});

export default TrustInfo;
