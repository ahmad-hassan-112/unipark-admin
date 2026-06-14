import React, { useState } from 'react';

import { FilterConfig } from '@/types';
import InviteUserDialog from '../SettingsContent/components/inviteUserDialog';
import Button from '@/components/UiComponents/Button';
import RenderIf from '../Common/renderIf';

interface ContentFiltersProps {
  additionalFilters?: FilterConfig[];
  searchPlaceholder?: string;
  searchKey?: string;
  page?: string;
}

const ContentFilters: React.FC<ContentFiltersProps> = ({ page }) => {
  const [ openDialog, setOpenDialog ] = useState(false);

  return (
    <div className="flex items-center justify-between gap-6">
      <div className="flex items-center gap-6">
        <RenderIf isTrue={page === 'users'}>
          <div className="flex gap-3">
            <Button text="Create User" className="!px-4" onClick={() => setOpenDialog(true)} />
          </div>
        </RenderIf>
        <InviteUserDialog open={openDialog} setOpen={setOpenDialog} />
      </div>
    </div>
  );
};

export default ContentFilters;
