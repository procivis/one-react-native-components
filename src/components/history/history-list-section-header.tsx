import moment, { Moment } from 'moment';
import React, { FC, useMemo } from 'react';

import { HistorySectionHeaderView } from '../../ui-components';

export type HistoryListSectionHeaderLabels = {
  today: string;
  yesterday: string;
};

export type HistoryListSectionHeaderViewProps = {
  date: Moment;
  firstYearEntry: boolean;
  labels: HistoryListSectionHeaderLabels;
  testID?: string;
};

// components used on the history section lists (Settings->History, CredentialDetail->History)
// https://www.figma.com/file/52qDYWUMjXAGre1dcnz5bz/Procivis-One-Wallet?type=design&node-id=1246-51813&mode=dev

export const HistoryListSectionHeaderView: FC<HistoryListSectionHeaderViewProps> = ({
  date,
  firstYearEntry,
  labels,
  testID,
}) => {
  const day = useMemo(() => {
    const now = moment();
    const dateString = moment(date);

    if (dateString.isSame(now, 'day')) {
      return labels.today;
    } else if (dateString.isSame(now.subtract(1, 'day'), 'day')) {
      return labels.yesterday;
    }
    return dateString.format('Do MMMM');
  }, [date, labels]);

  return (
    <HistorySectionHeaderView day={day} testID={testID} year={firstYearEntry ? date.year().toString() : undefined} />
  );
};
