import Image from 'next/image';
import { redirect } from 'next/navigation';
import getSession from '@/lib/session';
import { getUser } from '@/lib/data';

export default async function Settings() {
  const user = await getUser();

  const logout = async () => {
    'use server';
    const session = await getSession();
    session.destroy();
    redirect('/');
  };

  return (
    <>
      <h1>반갑습니다, {user?.name} 님!</h1>
      {user?.avatar && <Image src={user?.avatar ?? ''} alt="사용자 프로필 이미지" width={48} height={48} />}
      <form action={logout}>
        <button>로그아웃</button>
      </form>
    </>
  );
}
