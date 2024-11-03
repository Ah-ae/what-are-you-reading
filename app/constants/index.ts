export const IS_DEV_MODE = process.env.NODE_ENV === 'development';
export const APP_BASE_URL = IS_DEV_MODE ? 'http://localhost:3000' : process.env.PUBLIC_URL;

export const PASSWORD_MIN_LENGTH = 4;
export const PASSWORD_REGEX = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*?[#?!@$%^&*-]).+$/, // 비밀번호가 소문자, 대문자, 숫자, 특수문자의 일부를 모두 포함하고 있는지 검사
);
export const PASSWORD_REGEX_ERROR =
  '비밀번호는 하나 이상의 대문자, 소문자, 숫자 및 특수문자(#?!@$%^&*-)를 포함해야 합니다.';

export const DISALLOWED_USERNAME_LIST = [
  'anus',
  'arse',
  'asshole',
  'bastard',
  'bitch',
  'bollocks',
  'bugger',
  'cock',
  'crap',
  'cunt',
  'damn',
  'dick',
  'dildo',
  'douchebag',
  'faggot',
  'fuck',
  'motherfucker',
  'nigger',
  'penis',
  'prick',
  'pussy',
  'shit',
  'slut',
  'smegma',
  'tit',
  'tosser',
  'twat',
  'twunt',
  'vagina',
  'wanker',
  'whore',
];
