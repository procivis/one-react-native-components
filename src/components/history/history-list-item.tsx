import {
  HistoryActionBindingEnum,
  HistoryEntityTypeBindingEnum,
  HistoryListItemBindingDto,
} from '@procivis/react-native-one-core';
import React, { FC, useCallback, useMemo } from 'react';

import { HistoryItemView } from '../../ui-components';
import { formatTime, useTrustEntity } from '../../utils';
import { HistoryListItemIcon } from './history-list-item-icon';

export type HistoryListItemLabels = {
  actions: { [key in keyof typeof HistoryActionBindingEnum]: string };
  entityTypes: { [key in keyof typeof HistoryEntityTypeBindingEnum]: string };
};

export interface HistoryListItemViewProps {
  dateFormatter?: (date: Date) => string;
  first?: boolean;
  infoLabelMode?: 'entity' | 'associatedLabel' | 'none';
  item: HistoryListItemBindingDto;
  labels: HistoryListItemLabels;
  last?: boolean;
  onPress?: (item: HistoryListItemBindingDto) => void;
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
  testID,
}) => {
  const identifierId = infoLabelMode === 'entity' ? item.target : undefined;
  const { data: trustEntity } = useTrustEntity(identifierId);

  const label = `${labels.entityTypes[item.entityType]} ${labels.actions[item.action]}`;

  const info = useMemo(() => {
    switch (infoLabelMode) {
      case 'entity':
        return trustEntity?.name;
      case 'associatedLabel':
        return item.name;
      case 'none':
        return undefined;
    }
  }, [infoLabelMode, item, trustEntity]);

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
