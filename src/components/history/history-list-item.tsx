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
  first?: boolean;
  item: HistoryListItem;
  labels: HistoryListItemLabels;
  last?: boolean;
  onPress?: (item: HistoryListItem) => void;
  testID?: string;
}

export const HistoryListItemView: FC<HistoryListItemViewProps> = ({ first, item, labels, last, onPress, testID }) => {
  const { data: entity } = useTrustEntity(item.target);

  const label = `${labels.entityTypes[item.entityType]} ${labels.actions[item.action]}`;
  const icon = <HistoryListItemIcon item={item} />;

  const pressHandler = useCallback(() => {
    onPress?.(item);
  }, [onPress, item]);

  return (
    <HistoryItemView
      first={first}
      icon={icon}
      info={entity?.name ?? item.target ?? ''}
      label={label}
      last={last}
      onPress={pressHandler}
      testID={testID}
      time={formatTime(new Date(item.createdDate)) ?? ''}
    />
  );
};
