import { HistoryActionEnum, HistoryEntityTypeEnum, HistoryListItem } from '@procivis/react-native-one-core';
import React, { FC, useCallback } from 'react';

import { HistoryItemView } from '../../ui-components';
import { formatTime, useTrustEntity } from '../../utils';
import { HistoryListItemIcon } from './history-list-item-icon';

export type HistoryListItemLabels = {
  actions: { [key in keyof typeof HistoryActionEnum]: string };
  entityTypes: { [key in keyof typeof HistoryEntityTypeEnum]: string };
};

export interface HistoryListItemViewProps {
  dateFormatter?: (date: Date) => string;
  first?: boolean;
  infoLabelMode?: 'entity' | 'associatedLabel' | 'none';
  item: HistoryListItem;
  labels: HistoryListItemLabels;
  last?: boolean;
  onPress?: (item: HistoryListItem) => void;
  testID?: string;
}

export const HistoryListItemView: FC<HistoryListItemViewProps> = ({
  dateFormatter = formatTime,
  first,
  infoLabelMode = 'entity',
  item,
  labels,
  last,
  onPress,
  testID
}) => {
  const { data: entity } = useTrustEntity(infoLabelMode === 'entity' ? item.target : undefined);

  const label = `${labels.entityTypes[item.entityType]} ${labels.actions[item.action]}`;
  let infoLabel;
  switch (infoLabelMode) {
    case 'entity':
      infoLabel = entity?.name;
      break;
    case 'associatedLabel':
      infoLabel = item.name;
      break;
  }
  const icon = <HistoryListItemIcon item={item} />;

  const pressHandler = useCallback(() => {
    onPress?.(item);
  }, [onPress, item]);

  return (
    <HistoryItemView
      first={first}
      icon={icon}
      info={infoLabel}
      label={label}
      last={last}
      onPress={pressHandler}
      testID={testID}
      time={dateFormatter(new Date(item.createdDate)) ?? ''}
    />
  );
};
