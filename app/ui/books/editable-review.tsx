'use client';

import { useState, useTransition } from 'react';
import { updateReview } from '@/books/[id]/actions';

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
        <form onSubmit={handleSubmit} className="flex justify-between items-center gap-3">
          <input
            type="text"
            name="review"
            value={review}
            onChange={handleChange}
            autoFocus
            placeholder="한 줄 평을 작성해 보세요."
            className="w-[96%] text-zinc-600 focus:outline-none"
          />
          <button className="w-12 px-2 py-px bg-slate-50 rounded-md border border-slate-400">저장</button>
        </form>
      ) : (
        <span onClick={handleClick}>
          {review ? review : <span className="text-zinc-400">한 줄 평을 작성해 보세요.</span>}
        </span>
      )}
    </>
  );
}

export default EditableReview;
