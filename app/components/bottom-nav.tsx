import { MAX_WIDTH } from '@/constants/style';
import NavLinks from './nav-links';

export default function BottomNav() {
  return (
    <div
      className={`w-full fixed bottom-0 left-1/2 transform -translate-x-1/2 ${MAX_WIDTH} px-3 md:px-8 py-2 flex justify-between bg-gray-50 dark:bg-zinc-700 border-t border-gray-200 dark:border-zinc-600`}
    >
      <NavLinks />
    </div>
  );
}
