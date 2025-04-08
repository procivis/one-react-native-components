import { Claim, ClaimValue, DataTypeEnum, HistoryListItem, ProofInputClaim } from '@procivis/react-native-one-core';
import moment, { Moment } from 'moment';

import { nonEmptyFilter } from './filtering';

export interface HistoryGroupByDaySection {
  data: HistoryListItem[];
  date: Moment;
  firstYearEntry: boolean;
}

export const groupEntriesByDay = (entries: HistoryListItem[]) => {
  const groupedEntries = entries.reduce((result: HistoryGroupByDaySection[], entry: HistoryListItem) => {
    const entryDate = moment(entry.createdDate);

    const matchingEntry = result.find(({ date }) => date.isSame(entryDate, 'day'));
    if (matchingEntry) {
      matchingEntry.data.push(entry);
    } else {
      result.push({ data: [entry], date: entryDate, firstYearEntry: false });
    }

    return result;
  }, []);

  return groupedEntries
    .sort(({ date: a }, { date: b }) => b.valueOf() - a.valueOf())
    .map((item, index, list) => {
      item.firstYearEntry = !index || !list[index - 1].date.isSame(item.date, 'year');
      return item;
    });
};

export const claimValueFromProofInputClaim = ({ schema, value }: ProofInputClaim): ClaimValue | undefined => {
  if (!value) {
    return undefined;
  }

  if (Array.isArray(value)) {
    const values = value.map(claimFromProofInputClaim).filter(nonEmptyFilter);
    return schema.dataType === (DataTypeEnum.Object as string)
      ? {
          array: schema.array,
          dataType: DataTypeEnum.Object,
          value: values,
        }
      : {
          array: true,
          dataType: schema.dataType,
          value: values,
        };
  }

  return {
    array: false,
    dataType: schema.dataType,
    value,
  };
};

export const claimFromProofInputClaim = (input: ProofInputClaim): Claim | undefined => {
  const value = claimValueFromProofInputClaim(input);
  if (!value) {
    return undefined;
  }
  return {
    ...value,
    id: input.schema.id,
    key: input.schema.key,
  };
};