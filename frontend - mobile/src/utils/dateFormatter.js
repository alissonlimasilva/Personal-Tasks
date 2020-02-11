import moment from 'moment';
import localization from 'moment/locale/pt-br';

export default function getDateHour(datetime) {
  const value = moment(datetime);
  value.locale('pt-br', localization);
  const date = value.format('L');
  const hour = value.format('LT');
  return {date, hour};
}
