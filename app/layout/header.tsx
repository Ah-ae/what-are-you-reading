import BackButton from '@/ui/back-button';
import { MAX_WIDTH, SAFE_TOP } from '@/constants/style';
import { cn } from '@/lib/utils';

type Props = {
  backButtonText?: string;
  leftItem?: React.ReactNode;
  title?: string;
  rightItem?: React.ReactNode;
};

export default function HeaderLayout({ backButtonText = '뒤로', leftItem, title, rightItem }: Props) {
  return (
    <header
      className={cn(
        'w-full fixed top-0 left-1/2 transform -translate-x-1/2 bg-gray-50 dark:bg-zinc-700 border-b border-gray-200 dark:border-zinc-600 z-20',
        MAX_WIDTH,
        SAFE_TOP,
      )}
    >
      <div className="relative h-12 flex-center">
        <div className="absolute left-2 text-main-theme-color dark:text-blue-500 *:text-main-theme-color *:dark:text-blue-500">
          {leftItem ? leftItem : <BackButton>{backButtonText}</BackButton>}
        </div>
        <h2 className="font-medium dark:text-neutral-200">{title ? title : <span>&nbsp;</span>}</h2>
        <div className="absolute right-2 text-main-theme-color dark:text-blue-500 *:text-main-theme-color *:dark:text-blue-500">
          {rightItem ? rightItem : null}
        </div>
      </div>
    </header>
  );
}
