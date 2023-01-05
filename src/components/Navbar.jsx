import React from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingBag } from 'react-icons/fi';
import { BsFillPencilFill } from 'react-icons/bs';
import User from './User';
import Button from './ui/Button';
import { useAuthContext } from '../context/AuthContext';
import CartStatus from './CartStatus';

export default function Navbar() {
  const { auth, login, logout } = useAuthContext();

  return (
    <header className='flex justify-between border-b border-gray-300 p-3'>
      <Link
        to='/'
        className='flex items-center text-4xl text-brand whitespace-nowrap'
      >
        <FiShoppingBag />
        <h1>Shopping Mall App</h1>
      </Link>

      <nav className='flex items-center gap-4 font-semibold'>
        <Link to='/products'>Products</Link>
        {auth && (
          <Link to='/carts'>
            <CartStatus />
          </Link>
        )}
        {auth && auth.isAdmin && (
          <Link to='/products/new' className='text-xl'>
            <BsFillPencilFill />
          </Link>
        )}
        {auth && <User auth={auth} />}
        {!auth && <Button text={'Login'} onClick={login} />}
        {auth && <Button text={'Logout'} onClick={logout} />}
      </nav>
    </header>
  );
}
