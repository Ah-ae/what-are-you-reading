import { MAX_WIDTH } from '@/constants/style';
import BackButton from '@/ui/back-button';

type Props = {
  backButtonText?: string;
  title: string;
};

export default function HeaderLayout({ backButtonText = '뒤로', title }: Props) {
  return (
    <header
      className={`w-full fixed top-0 left-1/2 transform -translate-x-1/2 ${MAX_WIDTH} p-4 flex justify-center items-center bg-gray-50 dark:bg-zinc-700 border-b border-gray-200 dark:border-zinc-600`}
    >
      <BackButton className="absolute left-4 dark:text-blue-500">{backButtonText}</BackButton>
      <h2 className="text-xl font-medium dark:text-neutral-200">{title}</h2>
    </header>
  );
}
