'use server';

import { z } from 'zod';
import { PASSWORD_MIN_LENGTH, PASSWORD_REGEX, PASSWORD_REGEX_ERROR } from '@/constants';

const formSchema = z.object({
  username: z
    .string({
      invalid_type_error: '아이디는 문자로 이루어져야 합니다.',
      required_error: '아이디는 필수 입력 항목입니다.',
    })
    .nonempty('아이디는 필수 입력 항목입니다.')
    .toLowerCase()
    .trim(),
  password: z
    .string({
      invalid_type_error: '비밀번호는 문자로 이루어져야 합니다.',
      required_error: '비밀번호는 필수 입력 항목입니다.',
    })
    .nonempty('비밀번호는 필수 입력 항목입니다.')
    .min(PASSWORD_MIN_LENGTH, `최소 ${PASSWORD_MIN_LENGTH}개 이상의 문자 및 숫자를 포함해야 합니다.`)
    .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
});

export async function login(prevState: any, formData: FormData) {
  const data = {
    username: formData.get('username'),
    password: formData.get('password'),
  };

  const result = await formSchema.spa(data);
  if (!result.success) {
    return result.error.flatten();
  } else {
    // TODO : if the user is found, check password hash
    console.log('user log in');
    console.log(result.data);
  }
}
