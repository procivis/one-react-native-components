import {
  HistoryActionEnum,
  HistoryEntityTypeEnum,
  HistoryListItem,
  IdentifierTypeEnum,
} from '@procivis/react-native-one-core';
import React, { FC, useCallback, useMemo } from 'react';

import { HistoryItemView } from '../../ui-components';
import { formatTime, useIdentifierDetails, useTrustEntity } from '../../utils';
import { HistoryListItemIcon } from './history-list-item-icon';

export type HistoryListItemLabels = {
  actions: { [key in keyof typeof HistoryActionEnum]: string };
  entityTypes: { [key in keyof typeof HistoryEntityTypeEnum]: string };
};

export interface HistoryListItemViewProps {
  dateFormatter?: (date: Date) => string;
  first?: boolean;
  infoLabelMode?: 'entityOrAssociatedLabel' | 'associatedLabel' | 'none';
  item: HistoryListItem;
  labels: HistoryListItemLabels;
  last?: boolean;
  onPress?: (item: HistoryListItem) => void;
  testID?: string;
}

export const HistoryListItemView: FC<HistoryListItemViewProps> = ({
  dateFormatter = formatTime,
  first,
  infoLabelMode = 'entityOrAssociatedLabel',
  item,
  labels,
  last,
  onPress,
  testID,
}) => {
  const identifierId = infoLabelMode === 'entityOrAssociatedLabel' ? item.target : undefined;
  const { data: trustEntity } = useTrustEntity(identifierId);
  const { data: identifier } = useIdentifierDetails(identifierId);

  const label = `${labels.entityTypes[item.entityType]} ${labels.actions[item.action]}`;

  const info = useMemo(() => {
    switch (infoLabelMode) {
      case 'entityOrAssociatedLabel': {
        if (!item.target) {
          return item.name;
        }

        if (trustEntity) {
          return trustEntity.name;
        }

        switch (identifier?.type) {
          case IdentifierTypeEnum.DID:
            return identifier.did?.did;
          case IdentifierTypeEnum.CERTIFICATE:
            return identifier.certificates?.[0]?.name;
        }

        return undefined;
      }

      case 'associatedLabel':
        return item.name;
      case 'none':
        return undefined;
    }
  }, [infoLabelMode, item, trustEntity, identifier]);

  const icon = <HistoryListItemIcon item={item} />;

  const pressHandler = useCallback(() => {
    onPress?.(item);
  }, [onPress, item]);

  return (
    <HistoryItemView
      first={first}
      icon={icon}
      info={info}
      label={label}
      last={last}
      onPress={pressHandler}
      testID={testID}
      time={dateFormatter(new Date(item.createdDate)) ?? ''}
    />
  );
};
