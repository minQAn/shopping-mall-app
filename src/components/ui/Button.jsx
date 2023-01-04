import React from 'react';

export default function Button({ text, onClick, disabled }) {
  return (
    <button
      className={`${
        disabled ? 'bg-gray-400' : 'bg-brand hover:brightness-110'
      } text-white py-2 px-4 rounded-sm `}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
}
