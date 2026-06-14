'use client';

import React from 'react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/UiComponents/HoverCard';

import SidebarWrapper from './style';

const navItems = [
  {
    iconBlack: '/icons/home-black.svg',
    iconWhite: '/icons/home-white.svg',
    name: 'Dashboard',
    path: '/',
  },
  {
    iconBlack: '/icons/ph-globe-black.svg',
    iconWhite: '/icons/ph-globe-white.svg',
    name: 'Campus',
    path: '/campus-management',
  },
  {
    iconBlack: '/icons/users-black.svg',
    iconWhite: '/icons/users-white.svg',
    name: 'Users',
    path: '/users',
  },
  {
    iconBlack: '/icons/enquired-black.svg',
    iconWhite: '/icons/enquired-white.svg',
    name: 'Application',
    path: '/application',
  },
];

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const currentPath = pathname || '/';

  const isSettingActive = currentPath === '/settings';

  return (
    <SidebarWrapper className="flex min-h-screen relative bg-white overflow-hidden">
      <div className="flex flex-col w-[72px] items-center justify-between p-4 relative self-stretch sidebar-main">
        <div className="inline-flex flex-col items-center gap-8 relative">
          <Image alt="Campus" src="/images/unipark.jpg" loading="lazy" width={40} height={40} />

          <div className="inline-flex flex-col items-center gap-3 relative">
            {navItems.map(item => {
              const isActive = item.path === '/' ? currentPath === '/' : currentPath.startsWith(item.path);

              return (
                <HoverCard key={item.name}>
                  <HoverCardTrigger asChild>
                    <div onClick={() => router.push(item.path)} className={`p-2 rounded cursor-pointer transition-colors ${isActive ? 'active-menu' : ''}`}>
                      <Image src={isActive ? item.iconWhite : item.iconBlack} alt={item.name} width={24} height={24} />
                    </div>
                  </HoverCardTrigger>
                  <HoverCardContent side="right" className="text-sm px-3 py-2">
                    {item.name}
                  </HoverCardContent>
                </HoverCard>
              );
            })}
          </div>
        </div>

        <div onClick={() => router.push('/settings')} className={`p-2 rounded cursor-pointer transition-colors ${isSettingActive ? 'active-menu' : ''}`}>
          <Image src={isSettingActive ? '/icons/setting-white.svg' : '/icons/setting-black.svg'} alt="settings" loading="lazy" width={24} height={24} />
        </div>
      </div>
    </SidebarWrapper>
  );
};

export default Sidebar;
