import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

// 1. check whether user logged in or not
// 2. check whether the user is admin or not
// 3. When requiredAmind is ture, it must be logged in, and has admin authority
// 4. if the condition doesn't not match, direct to home page
// 5. only when the condition matches, passed children will show

export default function ProtectedRoute({ children, requiredAdmin }) {
  const { auth } = useAuthContext();
  // console.log('ProtectedRoute: ', auth);

  if (!auth || (requiredAdmin && !auth.isAdmin)) {
    return <Navigate to='/' replace />; // replace=true: if you want to not save this path in history to prevent coming from unapproved user
  }

  return children;
}
