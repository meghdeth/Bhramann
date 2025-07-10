import React from 'react';
import { Link } from 'react-router-dom';

export default function Logo({ className = '' }) {
  return (
    <Link to='/' className={`flex items-center gap-2 ${className}`}>
      <img src='/bhramann_logo.svg' alt='Bhramann Logo' className='h-12 w-auto' />
    </Link>
  );
} 