import { HistoryAction, HistoryEntityType, HistoryListItem } from '@procivis/react-native-one-core';
import React, { FC, useMemo } from 'react';
import { SvgProps } from 'react-native-svg';

import {
  HistoryBackupCreatedIcon,
  HistoryBackupRestoredIcon,
  HistoryCertificateIcon,
  HistoryCredentialIcon,
  HistoryDidIcon,
  HistoryIdentifierIcon,
  HistoryIssueIcon,
  HistoryItemIcon,
  HistoryKeyIcon,
  HistoryOrganisationIcon,
  HistoryProofRequestIcon,
  HistoryRevokeIcon,
  HistorySchemaIcon,
  HistoryStatusAcceptedIcon,
  HistoryStatusDeleteIcon,
  HistoryStatusErrorIcon,
  HistoryStatusSuspendIcon,
  HistorySuspendIcon,
  HistoryTrustAnchorIcon,
  HistoryTrustedEntityIcon,
} from '../../ui-components';

const defaultIcons: {
  actions: { [key in keyof typeof HistoryAction]: FC<SvgProps> };
  entityTypes: { [key in keyof typeof HistoryEntityType]: FC<SvgProps> };
} = {
  actions: {
    ACCEPTED: HistoryStatusAcceptedIcon,
    ACTIVATED: HistoryStatusAcceptedIcon,
    CLAIMS_REMOVED: HistoryStatusDeleteIcon,
    CREATED: HistoryStatusAcceptedIcon,
    DEACTIVATED: HistoryStatusErrorIcon,
    DELETED: HistoryStatusDeleteIcon,
    ERRORED: HistoryStatusErrorIcon,
    IMPORTED: HistoryStatusAcceptedIcon,
    ISSUED: HistoryStatusAcceptedIcon,
    OFFERED: HistoryStatusAcceptedIcon,
    PENDING: HistoryStatusAcceptedIcon,
    REJECTED: HistoryStatusErrorIcon,
    REMOVED: HistoryStatusDeleteIcon,
    REQUESTED: HistoryStatusAcceptedIcon,
    RESTORED: HistoryStatusAcceptedIcon,
    RETRACTED: HistoryStatusErrorIcon,
    REVOKED: HistoryStatusErrorIcon,
    SHARED: HistoryStatusAcceptedIcon,
    SUSPENDED: HistoryStatusSuspendIcon,
    UPDATED: HistoryStatusAcceptedIcon,
    WITHDRAWN: HistoryStatusErrorIcon,
    REACTIVATED: HistoryStatusAcceptedIcon,
    CSR_GENERATED: HistoryStatusAcceptedIcon,
    EXPIRED: HistoryStatusErrorIcon,
    INTERACTION_CREATED: HistoryStatusAcceptedIcon,
    INTERACTION_ERRORED: HistoryStatusErrorIcon,
    INTERACTION_EXPIRED: HistoryStatusErrorIcon,
    DELIVERED: HistoryStatusAcceptedIcon,
  },
  entityTypes: {
    BACKUP: HistoryRevokeIcon,
    CERTIFICATE: HistoryCertificateIcon,
    CREDENTIAL: HistoryCredentialIcon,
    CREDENTIAL_SCHEMA: HistorySchemaIcon,
    DID: HistoryDidIcon,
    IDENTIFIER: HistoryIdentifierIcon,
    KEY: HistoryKeyIcon,
    ORGANISATION: HistoryOrganisationIcon,
    PROOF: HistoryProofRequestIcon,
    PROOF_SCHEMA: HistorySchemaIcon,
    TRUST_ANCHOR: HistoryTrustAnchorIcon,
    TRUST_ENTITY: HistoryTrustedEntityIcon,
    WALLET_UNIT: HistoryTrustedEntityIcon,
    WALLET_RELYING_PARTY: HistoryTrustedEntityIcon,
    USER: HistoryIdentifierIcon,
    PROVIDER: HistoryIdentifierIcon,
    STS_ROLE: HistoryIdentifierIcon,
    STS_ORGANISATION: HistoryOrganisationIcon,
    STS_IAM_ROLE: HistoryIdentifierIcon,
    STS_TOKEN: HistoryKeyIcon,
    SIGNATURE: HistoryCertificateIcon,
    STS_SESSION: HistoryIdentifierIcon,
    NOTIFICATION: HistoryCredentialIcon,
    SUPERVISORY_AUTHORITY: HistoryCertificateIcon,
    TRUST_LIST_PUBLICATION: HistoryTrustAnchorIcon,
    TRUST_COLLECTION: HistoryTrustAnchorIcon,
    TRUST_LIST_SUBSCRIPTION: HistoryTrustAnchorIcon,
  },
};

export const getHistoryItemActionIcon = (action: HistoryAction) => {
  return defaultIcons.actions[action] ?? HistoryStatusAcceptedIcon;
};

export type HistoryListItemIconProps = {
  item: HistoryListItem;
};

export const HistoryListItemIcon: FC<HistoryListItemIconProps> = ({ item }) => {
  const statusIcon = getHistoryItemActionIcon(item.action);
  const typeIcon = useMemo(() => {
    switch (item.entityType) {
      case HistoryEntityType.BACKUP:
        switch (item.action) {
          case HistoryAction.CREATED:
            return HistoryBackupCreatedIcon;
          case HistoryAction.RESTORED:
            return HistoryBackupRestoredIcon;
          default:
            break;
        }
        break;
      case HistoryEntityType.CREDENTIAL:
        switch (item.action) {
          case HistoryAction.REVOKED:
            return HistoryRevokeIcon;
          case HistoryAction.SUSPENDED:
            return HistorySuspendIcon;
          default:
            break;
        }
        break;
      default:
        break;
    }

    return defaultIcons.entityTypes[item.entityType] ?? HistoryIssueIcon;
  }, [item.action, item.entityType]);
  return <HistoryItemIcon StatusIcon={statusIcon} TypeIcon={typeIcon} />;
};
