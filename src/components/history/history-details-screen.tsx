import { HistoryActionBindingEnum, HistoryListItemBindingDto } from '@procivis/react-native-one-core';
import React, { FC, ReactElement } from 'react';
import { ImageSourcePropType } from 'react-native';

import { ColorScheme, useAppColorScheme } from '../../ui-components';
import {
  HistoryDetailsLabels,
  HistoryDetailsView,
  HistoryDetailsViewProps,
} from '../../ui-components/history/history-details';
import { capitalizeFirstLetter, concatTestID, formatDateTimeLocalized } from '../../utils';
import { HistoryListItemLabels } from './history-list-item';
import { getHistoryItemActionIcon } from './history-list-item-icon';

const getStatusTextColor = (action: HistoryActionBindingEnum, colorScheme: Readonly<ColorScheme>) => {
  switch (action) {
    case HistoryActionBindingEnum.CLAIMS_REMOVED:
    case HistoryActionBindingEnum.DEACTIVATED:
    case HistoryActionBindingEnum.DELETED:
    case HistoryActionBindingEnum.REJECTED:
    case HistoryActionBindingEnum.REVOKED:
    case HistoryActionBindingEnum.ERRORED:
      return colorScheme.errorText;
    case HistoryActionBindingEnum.SUSPENDED:
    case HistoryActionBindingEnum.OFFERED:
    case HistoryActionBindingEnum.PENDING:
    case HistoryActionBindingEnum.REQUESTED:
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
  item: HistoryListItemBindingDto;
  labels: HistoryDetailsScreenLabels;
  onBackPressed: () => void;
  onInfoPressed?: () => void;
  onImagePreview: (title: string, image: ImageSourcePropType) => void;
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
        header: dataHeader,
        date: formatDateTimeLocalized(new Date(item.createdDate)) ?? '',
        action: {
          icon: getHistoryItemActionIcon(item.action),
          label: capitalizeFirstLetter(labels.item.actions[item.action]),
          color: actionValueColor,
          testID: concatTestID(testID, 'action', item.action),
        },
      }}
      headerButton={headerButton}
      labels={labels}
      onBackPressed={onBackPressed}
      onInfoPressed={onInfoPressed}
      onImagePreview={onImagePreview}
      testID={testID}
    />
  );
};
