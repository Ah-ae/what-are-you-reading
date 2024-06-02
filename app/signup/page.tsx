'use client';

import { useFormState } from 'react-dom';
import { createAccount } from './actions';
import Input from '@/components/input';
import Button from '@/components/button';
import { PASSWORD_MIN_LENGTH } from '@/constants';

export default function CreateAccount() {
  const [state, dispatch] = useFormState(createAccount, null);

  return (
    <div className="px-6 py-8 flex flex-col gap-10">
      <div className="flex flex-col gap-2 *:font-medium text-xl">
        <p>안녕하세요!</p>
        <p>아래 양식을 작성해 주세요.</p>
      </div>
      <form action={dispatch} noValidate className="flex flex-col gap-3">
        <Input name="username" type="text" placeholder="아이디" required errors={state?.fieldErrors.username} />
        <Input name="name" type="text" placeholder="이름(닉네임)" required errors={state?.fieldErrors.name} />
        <Input
          name="password"
          type="password"
          placeholder="비밀번호"
          minLength={PASSWORD_MIN_LENGTH}
          required
          errors={state?.fieldErrors.password}
        />
        <Input
          name="confirm_password"
          type="password"
          placeholder="비밀번호 확인"
          minLength={PASSWORD_MIN_LENGTH}
          required
          errors={state?.fieldErrors.confirm_password}
        />
        <Button text="회원 가입" />
      </form>
    </div>
  );
}
