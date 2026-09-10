import { TrustResolutionResult } from '@procivis/react-native-one-core';
import React, { FC, useMemo } from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';

import { AvatarProps, ImageOrComponentSource, TouchableOpacity } from '../../ui-components';
import EntityCluster from '../../ui-components/entity/entity-cluster';
import { EntityNotTrustedIcon, EntityTrustedIcon, UpIcon } from '../../ui-components/icons';
import { concatTestID, useCoreConfig, useIdentifierDetails } from '../../utils';

export type TrustInfoLabels = {
  unknown: string;
  unknownSubline: string;
};

export type TrustInfoProps = {
  labels: TrustInfoLabels;
  language: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  sublineColor?: string;
  testID?: string;
  textColor?: string;
  translate: boolean;
  trustInformation?: {
    identifier?: string;
    name?: string;
    result: TrustResolutionResult;
  };
};

const TrustInfo: FC<TrustInfoProps> = ({
  labels,
  language,
  onPress,
  style,
  sublineColor,
  testID,
  textColor,
  translate,
  trustInformation,
}) => {
  const { data: config } = useCoreConfig();

  const { data: identifier } = useIdentifierDetails(trustInformation?.identifier);
  const defaultLanguage = config?.globalSettings.defaultLanguage;

  const trustEntityName = useMemo(() => {
    const defaultLanguageName = identifier?.translations?.name[defaultLanguage ?? ''];
    const translatedName = translate ? identifier?.translations?.name[language] ?? defaultLanguageName : defaultLanguageName ;
    return translatedName ?? trustInformation?.name ?? labels.unknown;
  }, [translate, identifier, language, defaultLanguage, trustInformation, labels.unknown]);
  
  const avatarProps: AvatarProps | undefined = useMemo(() => {
    const avatar: ImageOrComponentSource | undefined = identifier?.logo ? { imageSource: { uri: identifier.logo } } : undefined;
    const placeholderText = trustEntityName.substring(0, 1);

    const statusIcon = trustInformation?.result === TrustResolutionResult.TRUSTED ? (
      <EntityTrustedIcon testID={concatTestID(testID, 'statusIcon', 'trusted')} />
    ) : (
      <EntityNotTrustedIcon testID={concatTestID(testID, 'statusIcon', 'notTrusted')} />
    );

    return {
      avatar,
      placeholderText,
      statusIcon,
    };
  }, [identifier, testID, trustInformation, trustEntityName]);

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
