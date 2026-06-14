import React, { useState } from 'react';
import { ChevronDownIcon, ChevronLeft } from 'lucide-react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { capitalize } from 'lodash';
import { useSelector } from 'react-redux';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/UiComponents/Avatar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/UiComponents/Popover';
import { useLogout } from '@/hooks/useAuth';
import RenderIf from '../Common/renderIf';
import { getFullName, getInitials, getProfileImage } from '@/utils/common';
import { RootState } from '@/store';

import NavbarWrapper from './style';

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { logout } = useLogout();
  const { selectedCustomer } = useSelector((state: RootState) => state?.customer);
  const { selectedCampus } = useSelector((state: RootState) => state?.campus);

  const data = useSelector((state: RootState) => state?.user?.data);
  const [ openPopover, setOpenPopover ] = useState<boolean>(false);

  const userData = data?.data;

  const segments = pathname.split('/').filter(Boolean);
  const maybeId = segments[segments.length - 1];

  const hasId = !isNaN(Number(maybeId));

  const getNavbarTitle = () => {
    if (pathname === '/') {
      return 'My dashboard';
    }
    if (hasId) {
      if (selectedCustomer) {
        return getFullName(selectedCustomer);
      }
      if (selectedCampus) {
        return `Edit ${selectedCampus.name}`;
      }
    }
    return capitalize(pathname.split('/').pop()?.replace('-', ' ') || '');
  };

  return (
    <NavbarWrapper>
      <div className="flex items-center justify-between px-8 py-4 self-stretch w-full bg-white navbar-main">
        <div className="flex items-center gap-4">
          <RenderIf isTrue={hasId}>
            <div>
              <ChevronLeft className="w-6 h-6 cursor-pointer" color="#64748B" onClick={() => router.back()} />
            </div>
          </RenderIf>

          <h6 className="text-black">{getNavbarTitle()}</h6>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-8">

            <Popover open={openPopover} onOpenChange={() => setOpenPopover(!openPopover)}>
              <PopoverTrigger asChild>
                <div className="flex items-center gap-3 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-10 w-10 bg-[var(--neutral100)]">
                      <AvatarImage src={userData?.profile_image && getProfileImage(userData?.profile_image)} alt={userData?.first_name} />
                      <AvatarFallback>{getInitials(userData)}</AvatarFallback>
                    </Avatar>

                    <span className="text-lg  leading-6 font-semibold text-black whitespace-nowrap">{userData?.first_name}</span>
                  </div>
                  <ChevronDownIcon className="w-5 h-5" onClick={() => setOpenPopover(!openPopover)} />
                </div>
              </PopoverTrigger>

              <PopoverContent className="w-79 mt-4 mr-8">
                <NavbarWrapper>
                  <div className="flex items-center gap-2 p-4">
                    <Avatar className="h-10 w-10 bg-[var(--neutral100)]">
                      <AvatarImage src={getProfileImage(userData?.profile_image)} alt={userData?.first_name} />
                      <AvatarFallback>{getInitials(userData)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-base font-semibold mb-1">{getFullName(userData)}</p>
                      <p className="text-xs text-black">{userData?.email}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 px-4 py-3 cursor-pointer text-sm font-medium logout-menu" onClick={() => logout()}>
                    <Image src="/icons/logout.svg" alt="logout" loading="lazy" width={20} height={20} />
                    Log out
                  </div>
                </NavbarWrapper>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </NavbarWrapper>
  );
};

export default Navbar;
