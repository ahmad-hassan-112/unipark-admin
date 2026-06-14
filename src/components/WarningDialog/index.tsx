'use client';

import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogFooter } from '@/components/UiComponents/Dialog';
import Button from '@/components/UiComponents/Button';

type DeleteCampusModalProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
  heading: string;
  desc1?: string;
  desc2?: string;
  cancelBtnText?: string;
  deleteBtnText?: string;
  onDelete?: () => void;
  isLoading?: boolean;
};

const WarningModal = ({ open, setOpen, heading, desc1, desc2, cancelBtnText, deleteBtnText, onDelete, isLoading }: DeleteCampusModalProps) => {
  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:!max-w-[552px]">
        <div className="p-6">
          <DialogTitle>{heading}</DialogTitle>
          <DialogDescription asChild>
            <div className="text-sm text-[var(--neutral400)] space-y-1">
              {desc1 && <p>{desc1}</p>}
              {desc2 && <p>{desc2}</p>}
            </div>
          </DialogDescription>
        </div>
        <DialogFooter>
          <Button text={cancelBtnText || 'Cancel'} className="outlined w-[85]" onClick={handleCancel} />
          <Button text={deleteBtnText || 'Delete'} onClick={() => onDelete?.()} className="danger min-w-[85]" isLoading={isLoading} />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WarningModal;
