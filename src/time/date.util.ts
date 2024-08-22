import * as moment from 'moment-timezone';

export default class DateUtils {
  static memontNow() : string {
    return moment().tz('Asia/Seoul').format('YYYY-MM-DD HH:mm:ss');
  }
}