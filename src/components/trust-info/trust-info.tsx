import { IdentifierListItem, TrustResolutionResult } from '@procivis/react-native-one-core';
import React, { FC, useMemo } from 'react';
import { StyleProp, StyleSheet, ViewStyle } from 'react-native';

import { AvatarProps, ImageOrComponentSource, TouchableOpacity, useAppColorScheme } from '../../ui-components';
import EntityCluster from '../../ui-components/entity/entity-cluster';
import { EntityNotTrustedIcon, EntityTrustedIcon, UpIcon } from '../../ui-components/icons';
import { concatTestID, useCoreConfig } from '../../utils';

export type TrustInfoLabels = {
  secondLine: string;
  unknown: string;
  untrusted: string;
};

export type TrustInfoProps = {
  identifier?: IdentifierListItem;
  labels: TrustInfoLabels;
  language: string;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  testID?: string;
  textColor?: string;
  translate: boolean;
  trustInformation?: {
    name?: string;
    result: TrustResolutionResult;
  };
};

const TrustInfo: FC<TrustInfoProps> = ({
  labels,
  language,
  onPress,
  style,
  testID,
  textColor,
  identifier,
  translate,
  trustInformation,
}) => {
  const { data: config } = useCoreConfig();
  const defaultLanguage = config?.globalSettings.defaultLanguage;
  const colorScheme = useAppColorScheme();

  const trustEntityName = useMemo(() => {
    if (!translate) {
      if (trustInformation?.result === TrustResolutionResult.TRUSTED) {
        return trustInformation?.name ?? labels.unknown;
      } else {
        return labels.untrusted;
      }
    }
    const defaultLanguageName = identifier?.translations?.name[defaultLanguage ?? ''];
    const translatedName = identifier?.translations?.name[language] ?? defaultLanguageName ?? identifier?.name;
    return trustInformation?.name ?? translatedName ?? labels.unknown;
  }, [identifier, translate, trustInformation, defaultLanguage, language, labels.unknown, labels.untrusted]);

  const avatarProps: AvatarProps | undefined = useMemo(() => {
    const showLogo = translate || trustInformation?.result === TrustResolutionResult.TRUSTED;
    const avatar: ImageOrComponentSource | undefined = showLogo && identifier?.logo ? { imageSource: { uri: identifier.logo } } : undefined;
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
  }, [translate, identifier?.logo, trustEntityName, trustInformation?.result, testID]);

  return (
    <TouchableOpacity disabled={!onPress || !trustInformation} onPress={onPress} style={[styles.button, style]}>
      <EntityCluster
        avatar={avatarProps}
        entityName={trustEntityName}
        style={styles.cluster}
        subline={trustInformation?.result === TrustResolutionResult.TRUSTED ? undefined : labels.secondLine}
        sublineColor={trustInformation?.result === TrustResolutionResult.TRUSTED ? undefined : colorScheme.errorText}
        testID={testID}
        textColor={textColor}
      />
      {onPress && <UpIcon color={textColor} style={styles.chevron} />}
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
