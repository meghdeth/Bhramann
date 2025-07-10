import React from 'react';
import { Bell, MessageSquare, User, ChevronDown, Menu, User2 } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../../Logo';

export default function Header({onClose}) {
  const location = useLocation();
  const isUser = location.pathname.startsWith('/user-dashboard');
  return (
    <header className="bg-gradient-to-r from-slate-50 to-blue-50 border-b border-slate-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className='flex items-center gap-5'>
        <div className='block md:hidden cursor-pointer' onClick={onClose}>
          <Menu/>
        </div>
        {/* Logo and Title */}
        <div className="flex items-center space-x-4 z-[999]">
          <div className="flex items-center space-x-3">
            <div>
              <Logo className="!text-4xl" />
              <p className="text-2xl text-slate-500 font-medium">{isUser ? "User Dashboard" : "Seller Dashboard"}</p>
            </div>
          </div>
        </div>
</div>

        {/* Right Actions */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button className="relative p-2 text-slate-600 hover:!text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200">
            <Bell className="size-8" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
              <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
            </span>
          </button>

          {/* Messages */}
          <button className="relative p-2 text-slate-600 hover:!text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200">
            <MessageSquare className="size-8" />
          </button>
          <Link to={"settings"} className="relative p-2 text-slate-600 hover:!text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200">
            <User2 className="size-8" />
          </Link>
        </div>
      </div>
    </header>
  );
}