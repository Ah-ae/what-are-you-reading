import Input from '@/components/input';
import Button from '@/components/button';
import { PASSWORD_MIN_LENGTH } from '@/constants';

export default function Login() {
  return (
    <div className="px-6 py-8 flex flex-col gap-10">
      <div className="flex flex-col gap-2 *:font-medium text-xl">
        <p>안녕하세요!</p>
        <p>아이디와 비밀번호를 입력해 주세요.</p>
      </div>
      <form className="flex flex-col gap-3">
        <Input name="username" type="text" placeholder="아이디" required errors={[]} />
        <Input
          name="password"
          type="password"
          placeholder="비밀번호"
          minLength={PASSWORD_MIN_LENGTH}
          required
          errors={[]}
        />
        <Button text="로그인" />
      </form>
    </div>
  );
}
