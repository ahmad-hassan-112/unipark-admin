import React, { useState } from 'react';
import { mdiPlus } from '@mdi/js';
import AddCampusDialog from './addCampusDialog';
import Button from '@/components/UiComponents/Button';


const CampusFilters = () => {
  const [ openAddCampus, setOpenAddCampus ] = useState<boolean>(false);

  return (
    <>
      <div className="flex justify-between items-center gap-2">
        <div className="flex gap-2">
          <Button text="Add campus" arrowLeft={true} iconLeft={mdiPlus} onClick={() => setOpenAddCampus(true)} />
        </div>
      </div>
      <AddCampusDialog open={openAddCampus} setOpen={setOpenAddCampus} />
    </>
  );
};

export default CampusFilters;
