import md5 from 'crypto-js/md5';

export default function createHash(value) {
  const hash = md5(value);
  return hash.toString();
}
