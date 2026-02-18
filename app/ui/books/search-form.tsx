import Search from '@/ui/search';

type Props = {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  placeholder?: string;
};

export default function SearchForm({ onSubmit, placeholder }: Props) {
  return (
    <form onSubmit={onSubmit} className="flex gap-2">
      <Search wrapperClassName="flex-grow basis-4/5" placeholder={placeholder} />
      <button className="flex-grow basis-1/5 primary-btn px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-500">
        검색
      </button>
    </form>
  );
}
