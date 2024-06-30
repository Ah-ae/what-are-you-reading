'use server';

import { z } from 'zod';
import bcrypt from 'bcrypt';
import { redirect } from 'next/navigation';
import { PASSWORD_MIN_LENGTH, PASSWORD_REGEX, PASSWORD_REGEX_ERROR } from '@/constants';
import db from '@/lib/db';
import { login as handleLogin } from '@/utils/auth';

const checkUsernameExists = async (username: string) => {
  const user = await db.user.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
    },
  });

  return Boolean(user);
};

const formSchema = z.object({
  username: z
    .string({
      invalid_type_error: '아이디는 문자로 이루어져야 합니다.',
      required_error: '아이디는 필수 입력 항목입니다.',
    })
    .nonempty('아이디는 필수 입력 항목입니다.')
    .toLowerCase()
    .trim()
    .refine(checkUsernameExists, '등록되지 않은 아이디입니다.'),
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
  if (result.success) {
    const user = await db.user.findUnique({
      where: {
        username: result.data.username,
      },
      select: {
        id: true,
        password: true,
      },
    });

    const isPasswordMatch = await bcrypt.compare(result.data.password, user!.password ?? '');
    if (isPasswordMatch) {
      await handleLogin(user!.id);
      redirect('/mine');
    } else {
      return {
        fieldErrors: {
          username: [],
          password: ['비밀번호가 일치하지 않습니다.'],
        },
      };
    }
  } else {
    return result.error.flatten();
  }
}
