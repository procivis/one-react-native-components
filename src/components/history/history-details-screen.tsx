import {
  HistoryAction,
  HistoryListItem,
} from '@procivis/react-native-one-core';
import React, { FC, ReactElement } from 'react';
import { ImageSourcePropType } from 'react-native';

import { ColorScheme, useAppColorScheme } from '../../ui-components';
import {
  HistoryDetailsLabels,
  HistoryDetailsView,
  HistoryDetailsViewProps,
} from '../../ui-components/history/history-details';
import {
  capitalizeFirstLetter,
  concatTestID,
  formatDateTimeLocalized,
} from '../../utils';
import { HistoryListItemLabels } from './history-list-item';
import { getHistoryItemActionIcon } from './history-list-item-icon';

const getStatusTextColor = (
  action: HistoryAction,
  colorScheme: Readonly<ColorScheme>,
) => {
  switch (action) {
    case HistoryAction.CLAIMS_REMOVED:
    case HistoryAction.DEACTIVATED:
    case HistoryAction.DELETED:
    case HistoryAction.REJECTED:
    case HistoryAction.REVOKED:
    case HistoryAction.ERRORED:
      return colorScheme.errorText;
    case HistoryAction.SUSPENDED:
    case HistoryAction.OFFERED:
    case HistoryAction.PENDING:
    case HistoryAction.REQUESTED:
      return colorScheme.text;
    default:
      return colorScheme.successText;
  }
};

export type HistoryDetailsScreenLabels = HistoryDetailsLabels & {
  item: HistoryListItemLabels;
};

export type HistoryDetailsScreenProps = {
  assets: HistoryDetailsViewProps['assets'];
  dataHeader: HistoryDetailsViewProps['data']['header'];
  headerButton?: ReactElement;
  item: HistoryListItem;
  labels: HistoryDetailsScreenLabels;
  onBackPressed: () => void;
  onImagePreview: (title: string, image: ImageSourcePropType) => void;
  onInfoPressed?: () => void;
  testID?: string;
};

export const HistoryDetailsScreen: FC<HistoryDetailsScreenProps> = ({
  assets,
  dataHeader,
  headerButton,
  item,
  labels,
  onBackPressed,
  onInfoPressed,
  onImagePreview,
  testID = 'HistoryDetailScreen',
}) => {
  const colorScheme = useAppColorScheme();

  const actionValueColor = getStatusTextColor(item.action, colorScheme);

  return (
    <HistoryDetailsView
      assets={assets}
      data={{
        action: {
          color: actionValueColor,
          icon: getHistoryItemActionIcon(item.action),
          label: capitalizeFirstLetter(labels.item.actions[item.action]),
          testID: concatTestID(testID, 'action', item.action),
        },
        date: formatDateTimeLocalized(new Date(item.createdDate)) ?? '',
        header: dataHeader,
      }}
      headerButton={headerButton}
      labels={labels}
      onBackPressed={onBackPressed}
      onImagePreview={onImagePreview}
      onInfoPressed={onInfoPressed}
      testID={testID}
    />
  );
};
