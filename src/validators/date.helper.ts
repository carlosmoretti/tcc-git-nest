/* eslint-disable prettier/prettier */
import moment from 'moment';

export class DateHelper {
    static parseDate(data: string, formato: string) {
        return moment(data).format(formato);
    }
}