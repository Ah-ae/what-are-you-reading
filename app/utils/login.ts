import getSession from '@/lib/session';

export const login = async (id: number) => {
  const session = await getSession();
  session.id = id;
  await session.save();
};
