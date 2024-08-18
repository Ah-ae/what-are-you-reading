'use client';

import { useState, useTransition } from 'react';
import { updateReview } from '@/books/[id]/actions';

const wrapperStyles = 'group flex justify-between items-center gap-3';
const textButtonStyles =
  'w-[44px] px-1 py-px bg-slate-50 rounded-md border border-slate-400 text-sm dark:text-neutral-700';

type Props = {
  review: string | null;
  bookId: number;
};

function EditableReview({ review: initialReview, bookId }: Props) {
  const [review, setReview] = useState(initialReview ?? '');
  const [isEditing, setIsEditing] = useState(false);
  const [_, startTransition] = useTransition();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReview(event.target.value);
  };

  const handleClick = () => {
    setIsEditing(true);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    startTransition(async () => {
      try {
        await updateReview(bookId, review);
        setIsEditing(false);
      } catch (error) {
        console.error('Failed to update review:', error);
      }
    });
  };

  return (
    <>
      {isEditing ? (
        <form onSubmit={handleSubmit} className={wrapperStyles}>
          <input
            type="text"
            name="review"
            value={review}
            onChange={handleChange}
            autoFocus
            placeholder="한 줄 평을 작성해 보세요."
            className="w-[96%] text-zinc-600 dark:text-zinc-100 dark:bg-zinc-800 focus:outline-none"
          />
          <button className={textButtonStyles}>저장</button>
        </form>
      ) : (
        <div className={wrapperStyles}>
          {review ? (
            <>
              <span>{review}</span>
              <button className={`${textButtonStyles} group-hover:block hidden`} onClick={handleClick}>
                편집
              </button>
            </>
          ) : (
            <span className="text-zinc-400" onClick={handleClick}>
              한 줄 평을 작성해 보세요.
            </span>
          )}
        </div>
      )}
    </>
  );
}

export default EditableReview;
