'use client';

import { useState } from 'react';

type Props = {
  id: number;
  text: string | null;
  field: string;
  onUpdate: (id: number, field: string, value: string) => Promise<void>;
};

function EditableBox({ text: initialText, id, field, onUpdate }: Props) {
  const [text, setText] = useState(initialText ?? '');
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = async (event: React.FocusEvent<HTMLInputElement>) => {
    try {
      await onUpdate(id, field, event.target.value);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update review:', error);
    }
  };

  return (
    <>
      {isEditing ? (
        <input
          type="text"
          name={field}
          value={text}
          onChange={handleChange}
          onBlur={handleBlur}
          autoFocus
          placeholder="이곳을 눌러 입력하세요."
          className="w-[96%] text-zinc-600 dark:text-zinc-100 dark:bg-zinc-800 focus:outline-none"
        />
      ) : (
        <div>
          {text ? (
            <span onClick={handleClick}>{text}</span>
          ) : (
            <span className="text-zinc-400" onClick={handleClick}>
              이곳을 눌러 입력하세요.
            </span>
          )}
        </div>
      )}
    </>
  );
}

export default EditableBox;
