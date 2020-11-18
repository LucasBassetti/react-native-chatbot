// https://github.com/KingCosmic/random-id

const possibilities = {
  lowerCased: 'abcdefghijklmnopqrstuvwxyz',
  capitals: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  numbers: '0123456789',
  special: "~!@#$%^&()_+-={}[];',",
};

export const randomId = (len: number, pattern: string) => {
  if (!len) len = 30;
  if (!pattern) pattern = 'aA0';

  let chars = '';

  pattern.split('').forEach(a => {
    if (!isNaN(parseInt(a))) {
      chars += possibilities.numbers;
    } else if (/[a-z]/.test(a)) {
      chars += possibilities.lowerCased;
    } else if (/[A-Z]/.test(a)) {
      chars += possibilities.capitals;
    } else {
      chars += possibilities.special;
    }
  });

  let result = '';

  for (let i = 0; i < len; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return result;
};

export default randomId;
