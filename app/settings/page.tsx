import { notFound, redirect } from 'next/navigation';
import db from '@/lib/db';
import getSession from '@/lib/session';

async function getUser() {
  const session = await getSession();
  if (session.id) {
    const user = await db.user.findUnique({
      where: {
        id: session.id,
      },
    });
    if (user) return user;
  }

  notFound();
}

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
      <form action={logout}>
        <button>로그아웃</button>
      </form>
    </>
  );
}
