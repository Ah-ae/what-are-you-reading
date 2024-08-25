import { MAX_WIDTH } from '@/constants/style';

type Props = {
  children: React.ReactNode;
};

export default function HeaderLayout({ children }: Props) {
  return (
    <header
      className={`w-full fixed top-0 left-1/2 transform -translate-x-1/2 ${MAX_WIDTH} z-10 p-4 flex justify-between items-center bg-gray-50 dark:bg-zinc-700 border-b border-gray-200 dark:border-zinc-600 *:dark:text-blue-500`}
    >
      {children}
    </header>
  );
}
