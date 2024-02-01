import * as bcrypt from 'bcryptjs';

async function hash(content: string) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(content, salt);
}

async function compare(content: string, hash?: string) {
  if (!hash) return false;
  return bcrypt.compare(content, hash);
}

export const HashUtils = {
  hash,
  compare,
};
