import { MAX_WIDTH } from '@/constants/style';
import NavLinks from './nav-links';

export default function BottomNav() {
  return (
    <div className={`bg-gray-50 w-full fixed bottom-0 left-1/2 transform -translate-x-1/2 ${MAX_WIDTH}`}>
      <div className="px-8 py-2 flex justify-between border-t border-gray-200">
        <NavLinks />
      </div>
    </div>
  );
}
