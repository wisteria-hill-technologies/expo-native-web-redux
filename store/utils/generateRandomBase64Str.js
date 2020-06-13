import * as Random from 'expo-random';
import { Buffer } from "buffer";

export default async function generateRandomBase64Str() {
  const trimBase64URL = (str) => {
    return str
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
  }

  const randomBytes = await Random.getRandomBytesAsync(32);
  const convertedToBAST64Str = Buffer.from(randomBytes).toString('base64');
  return trimBase64URL(convertedToBAST64Str);
}

