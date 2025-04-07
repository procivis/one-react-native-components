import { HistoryListItem } from '@procivis/react-native-one-core';
import moment, { Moment } from 'moment';

export interface HistoryGroupByDaySection {
    data: HistoryListItem[];
    date: Moment;
    firstYearEntry: boolean;
  }
  
  export const groupEntriesByDay = (entries: HistoryListItem[]) => {
    const groupedEntries = entries.reduce(
      (result: HistoryGroupByDaySection[], entry: HistoryListItem) => {
        const entryDate = moment(entry.createdDate);
  
        const matchingEntry = result.find(({ date }) =>
          date.isSame(entryDate, 'day'),
        );
        if (matchingEntry) {
          matchingEntry.data.push(entry);
        } else {
          result.push({ data: [entry], date: entryDate, firstYearEntry: false });
        }
  
        return result;
      },
      [],
    );
  
    return groupedEntries
      .sort(({ date: a }, { date: b }) => b.valueOf() - a.valueOf())
      .map((item, index, list) => {
        item.firstYearEntry =
          !index || !list[index - 1].date.isSame(item.date, 'year');
        return item;
      });
  };