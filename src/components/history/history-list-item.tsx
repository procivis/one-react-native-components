import { HistoryAction, HistoryEntityType, HistoryListItem } from '@procivis/react-native-one-core';
import React, { FC, useCallback, useMemo } from 'react';

import { ListItemView } from '../../ui-components';
import { formatTime } from '../../utils';
import { HistoryListItemIcon } from './history-list-item-icon';

export type HistoryListItemLabels = {
  actions: { [key in keyof typeof HistoryAction]: string };
  entityTypes: { [key in keyof typeof HistoryEntityType]: string };
};

export interface HistoryListItemViewProps {
  dateFormatter?: (date: Date) => string;
  first?: boolean;
  infoLabelMode?: 'associatedLabel' | 'none';
  item: HistoryListItem;
  labels: HistoryListItemLabels;
  last?: boolean;
  onPress?: (item: HistoryListItem) => void;
  testID?: string;
}

export const HistoryListItemView: FC<HistoryListItemViewProps> = ({
  dateFormatter = formatTime,
  first,
  infoLabelMode = 'associatedLabel',
  item,
  labels,
  last,
  onPress,
  testID,
}) => {
  const label = `${labels.entityTypes[item.entityType]} ${labels.actions[item.action]}`;

  const info = useMemo(() => {
    switch (infoLabelMode) {
      case 'associatedLabel':
        return item.name;
      case 'none':
        return undefined;
    }
  }, [infoLabelMode, item]);

  const icon = <HistoryListItemIcon item={item} />;

  const pressHandler = useCallback(() => {
    onPress?.(item);
  }, [onPress, item]);

  return (
    <ListItemView
      accessory={dateFormatter(new Date(item.createdDate))}
      first={first}
      icon={icon}
      info={info}
      label={label}
      last={last}
      onPress={pressHandler}
      testID={testID}
    />
  );
};
