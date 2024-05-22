'use client'

import React, { useState, KeyboardEvent } from 'react';
import { Input } from './input';

interface TagsInputProps {
  tags: string[];
  setTags: React.Dispatch<React.SetStateAction<string[]>>;
}

const TagsInput: React.FC<TagsInputProps> = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = useState<string>('');

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputValue) {
      if (!tags.includes(inputValue)) {
        setTags([...tags, inputValue]);
        setInputValue('');
      }
    }
  };

  const removeTag = (indexToRemove: number) => {
    setTags(tags.filter((_, index) => index !== indexToRemove));
  };

  return (
    <div className="flex flex-wrap items-center border p-2 rounded">
      {tags.map((tag, index) => (
        <div
          key={index}
          className="flex items-center bg-blue-500 text-white rounded px-2 py-1 m-1"
        >
          <span>{tag}</span>
          <button
            type="button"
            className="ml-2"
            onClick={() => removeTag(index)}
          >
            &times;
          </button>
        </div>
      ))}
      <Input
        type="text"
        name='tags'
        id='tags'
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-grow p-2 border-none focus:outline-none"
        placeholder="Enter a tag"
      />
    </div>
  );
};

export default TagsInput;
