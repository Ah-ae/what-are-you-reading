'use client';

import { useState } from 'react';

function EditableReview() {
  const [review, setReview] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setReview(event.target.value);
  };

  const handleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
  };

  return (
    <>
      {isEditing ? (
        <input
          type="text"
          value={review}
          onChange={handleChange}
          onBlur={handleBlur}
          autoFocus
          placeholder="한 줄 평을 작성해 보세요."
          className="w-[96%] text-zinc-600 border-b-[1px] border-gray-300 focus:outline-none"
        />
      ) : (
        <span onClick={handleClick}>
          {review ? `한 줄 평: ${review}` : <span className="text-zinc-400">한 줄 평을 작성해 보세요.</span>}
        </span>
      )}
    </>
  );
}

export default EditableReview;
