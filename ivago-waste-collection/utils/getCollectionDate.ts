import { isToday, parse as parseDate, formatDistance } from 'date-fns';
import nl from 'date-fns/locale/nl';

export default function getCollectionDate(nlDateString: string) {
  const date = parseDate(nlDateString, "EEEE',' d MMMM", new Date(), { locale: nl });

  return {
    date,
    formattedDate: nlDateString,
    distance: isToday(date)
      ? 'Today'
      : formatDistance(date, new Date(), {
          addSuffix: true,
        }),
  };
}
