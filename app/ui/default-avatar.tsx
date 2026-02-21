import { UserIcon } from '@heroicons/react/24/solid';
import { cn } from '@/lib/utils';

type Props = { className?: string };

export default function DefaultAvatar({ className }: Props) {
  return (
    <div className={cn('size-12 shrink-0 rounded-full bg-gray-100 flex items-center justify-center', className)}>
      <UserIcon className="w-2/3 h-2/3 text-gray-400" />
    </div>
  );
}
