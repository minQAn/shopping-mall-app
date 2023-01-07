import React from 'react';

export default function Banner() {
  return (
    <section className='h-96 bg-yellow-900 relative'>
      <div className='w-full h-full bg-cover bg-center bg-banner opacity-80'></div>

      <div className='absolute w-full top-32 text-center text-gray-50 drop-shadow-2xl'>
        <h2 className='text-6xl mb-2'>Find your Best Goods</h2>
        <p className='text-2xl'>Free Shopping Shuttle</p>
      </div>
    </section>
  );
}
