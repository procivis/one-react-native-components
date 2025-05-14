import { HistoryActionEnum, HistoryEntityTypeEnum, HistoryListItem } from '@procivis/react-native-one-core';
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
  actions: { [key in keyof typeof HistoryActionEnum]: FC<SvgProps> };
  entityTypes: { [key in keyof typeof HistoryEntityTypeEnum]: FC<SvgProps> };
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
  },
};

export const getHistoryItemActionIcon = (action: HistoryActionEnum) => {
  return defaultIcons.actions[action] ?? HistoryStatusAcceptedIcon;
};

export type HistoryListItemIconProps = {
  item: HistoryListItem;
};

export const HistoryListItemIcon: FC<HistoryListItemIconProps> = ({ item }) => {
  const statusIcon = getHistoryItemActionIcon(item.action);
  const typeIcon = useMemo(() => {
    switch (item.entityType) {
      case HistoryEntityTypeEnum.BACKUP:
        switch (item.action) {
          case HistoryActionEnum.CREATED:
            return HistoryBackupCreatedIcon;
          case HistoryActionEnum.RESTORED:
            return HistoryBackupRestoredIcon;
          default:
            break;
        }
        break;
      case HistoryEntityTypeEnum.CREDENTIAL:
        switch (item.action) {
          case HistoryActionEnum.REVOKED:
            return HistoryRevokeIcon;
          case HistoryActionEnum.SUSPENDED:
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
