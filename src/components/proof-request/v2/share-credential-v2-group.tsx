import {
  CredentialListItemBindingDto,
  PresentationDefinitionV2ClaimBindingDto,
  PresentationDefinitionV2ResponseBindingDto,
  PresentationSubmitV2CredentialRequestBindingDto,
} from '@procivis/react-native-one-core';
import React, { FC, useCallback, useMemo } from 'react';
import { ImageSourcePropType, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import Animated, { LinearTransition } from 'react-native-reanimated';

import {
  BlurView,
  CredentialCardShadow,
  DownIcon,
  Selector,
  SelectorStatus,
  TouchableOpacity,
  UpIcon,
} from '../../../ui-components';
import CredentialGroupHeader from '../../../ui-components/credential/group/credential-group-header';
import { concatTestID, useCredentialListExpandedCard } from '../../../utils';
import { ShareCredentialLabels } from '../v1/share-credential';
import { GroupedShareCredentialV2Padding, ShareCredentialV2 } from './share-credential-v2';

export type CredentialQuerySelection = Record<
  string,
  PresentationSubmitV2CredentialRequestBindingDto | PresentationSubmitV2CredentialRequestBindingDto[]
>;

export type ShareCredentialGroupLabels = ShareCredentialLabels & {
  groupHeader: string;
};

export type ShareCredentialV2GroupProps = {
  labels: ShareCredentialGroupLabels;
  lastGroup: boolean;
  onGroupSelect?: (selected: boolean) => void;
  onImagePreview: (title: string, image: ImageSourcePropType) => void;
  onSelectCredential: (requestCredentialId: string) => () => void;
  onSelectField: (
    requestCredentialId: string,
  ) => (
    credentialId: CredentialListItemBindingDto['id'],
    fieldPath: PresentationDefinitionV2ClaimBindingDto['path'],
    selected: boolean,
  ) => void;
  presentationDefinition: PresentationDefinitionV2ResponseBindingDto;
  requestGroup: string[];
  selected?: boolean;
  selectedCredentials?: CredentialQuerySelection;
  style?: StyleProp<ViewStyle>;
  testID: string;
  valid: boolean;
};

const multipleCredentialsSelected = (
  selectedCredentials: CredentialQuerySelection | undefined,
  credentialRequestId: string,
) => {
  return (
    selectedCredentials &&
    selectedCredentials[credentialRequestId] &&
    Array.isArray(selectedCredentials[credentialRequestId]) &&
    (selectedCredentials[credentialRequestId] as PresentationSubmitV2CredentialRequestBindingDto[]).length > 1
  );
};

const numberOfCardsForRequest = (
  selectedCredentials: CredentialQuerySelection | undefined,
  credentialRequestId: string,
) => {
  if (!selectedCredentials || !selectedCredentials[credentialRequestId]) {
    return 1;
  }
  const selection = selectedCredentials[credentialRequestId];
  if (Array.isArray(selection)) {
    return selection.length;
  }
  return 1;
};

const heightForNumberOfCards = (numberOfCards: number) => 60 * (numberOfCards + 1) + 12 * numberOfCards;

export const ShareCredentialV2Group: FC<ShareCredentialV2GroupProps> = ({
  labels,
  lastGroup,
  onGroupSelect,
  onImagePreview,
  onSelectCredential,
  onSelectField,
  presentationDefinition,
  requestGroup,
  selected,
  selectedCredentials = {},
  style,
  testID,
  valid,
}) => {
  const { expandedCredential, onHeaderPress } = useCredentialListExpandedCard();
  const numberOfCards = requestGroup.reduce(
    (acc, groupId) => acc + numberOfCardsForRequest(selectedCredentials, groupId),
    0,
  );
  const singleCredentialGroup =
    requestGroup.length === 1 && !multipleCredentialsSelected(selectedCredentials, requestGroup[0]);

  const headerPressHandler = useCallback(() => {
    onGroupSelect?.(!selected);
  }, [selected, onGroupSelect]);

  const onNestedCardHeaderPress = useCallback(
    (credentialId: string) => () => {
      if (!selected) {
        onGroupSelect?.(true);
      }
      onHeaderPress(credentialId);
    },
    [selected, onGroupSelect, onHeaderPress],
  );

  const credentialCards = useMemo(() => {
    return requestGroup.flatMap((credentialRequestId, credentialRequestIndex, { length: credentialRequestsLength }) => {
      const lastQuery = credentialRequestIndex === credentialRequestsLength - 1;

      const credentialQuery = presentationDefinition.credentialQueries[credentialRequestId].credentialOrFailureHint;
      let defaultSelection: PresentationSubmitV2CredentialRequestBindingDto;
      if (credentialQuery.type_ === 'APPLICABLE_CREDENTIALS') {
        defaultSelection = credentialQuery.applicableCredentials?.[0]
          ? {
              credentialId: credentialQuery.applicableCredentials[0].id,
              userSelections: [],
            }
          : {
              credentialId: '',
              userSelections: [],
            };
      } else {
        defaultSelection = {
          credentialId: '',
          userSelections: [],
        };
      }
      const request = selectedCredentials[credentialRequestId];
      const credentialSelections = request ? (Array.isArray(request) ? request : [request]) : [defaultSelection];

      return credentialSelections?.flatMap((credentialRequest, credentialIndex, { length: credentialsLength }) => {
        const selectedFields = credentialRequest.userSelections;
        const cardId = `${credentialRequestId}-${credentialRequest.credentialId}`;
        const lastItem = singleCredentialGroup ? lastGroup : lastQuery && credentialIndex === credentialsLength - 1;
        const cardExpanded = selected && (singleCredentialGroup || expandedCredential === cardId);
        const headerAccessory =
          singleCredentialGroup && valid ? (
            <Selector status={selected ? SelectorStatus.SelectedRadio : SelectorStatus.Empty} />
          ) : cardExpanded ? (
            UpIcon
          ) : (
            DownIcon
          );
        return (
          <ShareCredentialV2
            credentialQuery={credentialQuery}
            credentialRequestId={credentialRequestId}
            expanded={cardExpanded}
            grouped={!singleCredentialGroup}
            headerAccessory={headerAccessory}
            key={credentialRequestId}
            labels={labels}
            lastItem={lastItem}
            onHeaderPress={singleCredentialGroup ? headerPressHandler : onNestedCardHeaderPress(cardId)}
            onImagePreview={onImagePreview}
            onSelectCredential={onSelectCredential?.(credentialRequestId)}
            onSelectField={onSelectField(credentialRequestId)}
            selectedCredentialId={credentialRequest.credentialId}
            selectedFields={selectedFields}
            style={[!singleCredentialGroup && styles.requestedCredential, lastItem && styles.requestedCredentialLast]}
            testID={concatTestID(testID, credentialRequestId)}
          />
        );
      });
    });
  }, [
    expandedCredential,
    labels,
    lastGroup,
    headerPressHandler,
    onImagePreview,
    onNestedCardHeaderPress,
    onSelectCredential,
    onSelectField,
    presentationDefinition.credentialQueries,
    requestGroup,
    selected,
    selectedCredentials,
    singleCredentialGroup,
    testID,
    valid,
  ]);

  if (singleCredentialGroup) {
    return credentialCards[0];
  }

  const groupHeaderAccessory = valid ? (
    <Selector status={selected ? SelectorStatus.SelectedRadio : SelectorStatus.Empty} />
  ) : selected ? (
    UpIcon
  ) : (
    DownIcon
  );

  return (
    <Animated.View
      layout={LinearTransition}
      style={[
        styles.animatedWrapper,
        // eslint-disable-next-line react-native/no-inline-styles
        {
          height: selected || lastGroup ? 'auto' : heightForNumberOfCards(numberOfCards),
        },
        style,
      ]}>
      <Animated.View
        layout={LinearTransition}
        style={[
          singleCredentialGroup ? undefined : styles.groupedCredentialsWrapper,
          !singleCredentialGroup && styles.requestedCredential,
          lastGroup && styles.requestedCredentialLast,
          style,
        ]}>
        <BlurView blurStyle="strong" darkMode={true} style={StyleSheet.absoluteFill} />
        <TouchableOpacity onPress={headerPressHandler}>
          <CredentialGroupHeader accessory={groupHeaderAccessory} name={labels.groupHeader} style={styles.header} />
        </TouchableOpacity>
        {credentialCards}
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  animatedWrapper: {
    ...CredentialCardShadow,
  },
  groupedCredentialsWrapper: {
    borderRadius: 10 + GroupedShareCredentialV2Padding,
    borderWidth: 0,
    overflow: 'hidden',
    paddingBottom: GroupedShareCredentialV2Padding,
  },
  header: {
    marginBottom: GroupedShareCredentialV2Padding,
  },
  requestedCredential: {
    marginBottom: 12,
  },
  requestedCredentialLast: {
    marginBottom: 0,
  },
});
