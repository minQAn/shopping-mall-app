import React from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useQuery } from '@tanstack/react-query';
import { getCart } from '../api/firebase';
import { useAuthContext } from '../context/AuthContext';

export default function CartStatus() {
  const { uid } = useAuthContext();
  const { data: products } = useQuery(['carts'], () => getCart(uid));

  return (
    <div className='relative'>
      <AiOutlineShoppingCart className='text-3xl' />
      {products && (
        <p className='w-5 h-5 text-center text-sm bg-brand text-white font-bold rounded-full absolute -top-2 -right-2'>
          {products.length}
        </p>
      )}
    </div>
  );
}
