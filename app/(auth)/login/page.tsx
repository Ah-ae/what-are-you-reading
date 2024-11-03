'use client';

import { useFormState } from 'react-dom';
import { login } from './actions';
import KakaoLogin from '@/ui/kakao-login';
import Divider from '@/ui/divider';
import Input from '@/ui/input';
import Button from '@/ui/button';
import { IS_DEV_MODE, PASSWORD_MIN_LENGTH } from '@/constants';

export default function Login() {
  const [state, dispatch] = useFormState(login, null);

  return (
    <div className="px-6 py-8 flex flex-col gap-10">
      <div className="flex flex-col gap-2 *:font-medium text-xl">
        <p>안녕하세요!</p>
        <p>SNS 계정으로 로그인할 수 있어요.</p>
      </div>

      <KakaoLogin />

      {IS_DEV_MODE && (
        <>
          <Divider />
          <form action={dispatch} noValidate className="flex flex-col gap-3">
            <Input name="username" type="text" placeholder="아이디" required errors={state?.fieldErrors.username} />
            <Input
              name="password"
              type="password"
              placeholder="비밀번호"
              minLength={PASSWORD_MIN_LENGTH}
              required
              errors={state?.fieldErrors.password}
            />
            <Button text="로그인" />
          </form>
        </>
      )}
    </div>
  );
}
