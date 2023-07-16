import crypto from 'crypto';
import type { UserInfo } from './app';
import { BOT_TOKEN } from '../../secrets';

export default class TelegramUtils {
  static checkTelegramAuth(user: UserInfo) {
    let { hash, ...authData }: { [key: string]: any } = user;
    let checkString = Object.keys(authData)
      .sort()
      .filter((key) => !!authData[key]) // Remove empty fields (causing wrong hash)
      .map((key) => `${key}=${authData[key]}`) // Create key=value strings
      .join('\n'); // Join with \n as per spec

    let secretKey = crypto.createHash('sha256').update(BOT_TOKEN).digest();
    let hmac = crypto.createHmac('sha256', secretKey).update(checkString).digest('hex');

    // Expiry of 24 hours
    // Check authenticity of data:
    // https://core.telegram.org/widgets/login#checking-authorization
    return hmac == hash && Date.now() / 1000 - user.auth_date < 86400;
  }
}
