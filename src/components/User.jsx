import React from 'react';

export default function User({ auth: { photoURL, displayName } }) {
  return (
    <div className='flex items-center shrink-0'>
      {/* shrink-0 is to prevent shrink the image*/}
      <img
        className='w-10 h-10 rounded-full mr-2'
        src={photoURL}
        alt={displayName}
        referrerPolicy='no-referrer' // bc 403 forbbiden error
      />
      <span className='hidden md:block'>{displayName}</span>
    </div>
  );
}
