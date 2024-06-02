'use server';

import { z } from 'zod';
import { PASSWORD_MIN_LENGTH, PASSWORD_REGEX, PASSWORD_REGEX_ERROR, DISALLOWED_USERNAME_LIST } from '@/constants';

const checkUserName = (username: string) => {
  for (const disallowedWord of DISALLOWED_USERNAME_LIST) {
    if (username.toLowerCase().includes(disallowedWord)) {
      return false;
    }
  }
  return true;
};
const checkPasswords = ({ password, confirm_password }: { password: string; confirm_password: string }) =>
  password === confirm_password;

const formSchema = z
  .object({
    username: z
      .string({
        invalid_type_error: '아이디는 문자로 이루어져야 합니다.',
        required_error: '아이디는 필수 입력 항목입니다.',
      })
      .nonempty('아이디는 필수 입력 항목입니다.') // 빈 문자열 체크
      .toLowerCase()
      .trim()
      .refine(checkUserName, '아이디에 부적절한 단어가 포함되어 있습니다. 다른 아이디를 입력해 주세요.'),
    name: z
      .string({
        invalid_type_error: '이름(닉네임)은 문자로 이루어져야 합니다.',
        required_error: '이름(닉네임)은 필수 입력 항목입니다.',
      })
      .nonempty('이름(닉네임)은 필수 입력 항목입니다.')
      .refine(checkUserName, '이름에 부적절한 단어가 포함되어 있습니다. 다른 이름을 입력해 주세요.'),
    password: z
      .string({
        invalid_type_error: '비밀번호는 문자로 이루어져야 합니다.',
        required_error: '비밀번호는 필수 입력 항목입니다.',
      })
      .nonempty('비밀번호는 필수 입력 항목입니다.')
      .min(PASSWORD_MIN_LENGTH, `최소 ${PASSWORD_MIN_LENGTH}개 이상의 문자 및 숫자를 포함해야 합니다.`)
      .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
    confirm_password: z
      .string({
        invalid_type_error: '비밀번호는 문자로 이루어져야 합니다.',
        required_error: '비밀번호 확인은 필수 입력 항목입니다.',
      })
      .nonempty('비밀번호 확인은 필수 입력 항목입니다.')
      .min(PASSWORD_MIN_LENGTH, `최소 ${PASSWORD_MIN_LENGTH}개 이상의 문자 및 숫자를 포함해야 합니다.`),
  })
  .refine(checkPasswords, {
    message: '비밀번호가 동일하지 않습니다',
    path: ['confirm_password'],
  });

export async function createAccount(prevState: any, formData: FormData) {
  const data = {
    username: formData.get('username'),
    name: formData.get('name'),
    password: formData.get('password'),
    confirm_password: formData.get('confirm_password'),
  };

  const result = formSchema.safeParse(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    // TODO : 계정 생성, 로그인, 리다이렉션('/mine')
    console.log('created the account');
    console.log(result.data);
  }
}
