import type { InputHTMLAttributes } from 'react';

type Props = {
  name: string;
  errors?: string[];
};

export default function Input({ name, errors = [], ...args }: Props & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex flex-col gap-2">
      <input
        name={name}
        className="w-full h-10 px-2 bg-transparent rounded-md border-none focus:outline-none appearance-none ring-neutral-400 dark:ring-neutral-200 ring-1 focus:ring-2 focus:ring-green-800 transition placeholder:text-neutral-400"
        {...args}
      />
      {errors &&
        errors.map((error, index) => (
          <span key={index} className="text-red-500 font-medium">
            {error}
          </span>
        ))}
    </div>
  );
}
