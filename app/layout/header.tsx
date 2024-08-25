import BackButton from '@/ui/back-button';
import { MAX_WIDTH } from '@/constants/style';

type Props = {
  backButtonText?: string;
  leftItem?: React.ReactNode;
  title?: string;
  rightItem?: React.ReactNode;
};

export default function HeaderLayout({ backButtonText = '뒤로', leftItem, title, rightItem }: Props) {
  return (
    <header
      className={`w-full ${MAX_WIDTH} h-14 fixed top-0 left-1/2 transform -translate-x-1/2 p-4 flex justify-center items-center bg-gray-50 dark:bg-zinc-700 border-b border-gray-200 dark:border-zinc-600`}
    >
      <div className="absolute left-4 text-main-theme-color dark:text-blue-500 *:text-main-theme-color *:dark:text-blue-500">
        {leftItem ? leftItem : <BackButton>{backButtonText}</BackButton>}
      </div>
      <h2 className="text-xl font-medium dark:text-neutral-200">{title ? title : <span>&nbsp;</span>}</h2>
      <div className="absolute right-4 text-main-theme-color dark:text-blue-500 *:text-main-theme-color *:dark:text-blue-500">
        {rightItem ? rightItem : null}
      </div>
    </header>
  );
}
