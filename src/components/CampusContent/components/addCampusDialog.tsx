'use client';

import { Form, Formik } from 'formik';
import * as Yup from 'yup';

import { Dialog, DialogContent, DialogTitle, DialogFooter } from '@/components/UiComponents/Dialog';
import Button from '@/components/UiComponents/Button';
import FormField from '@/components/UiComponents/FormFields';
import { useAddCampus } from '@/hooks/useCampus';
import { showDataToast, showErrorToast } from '@/utils/common';

type AddCampusDialogProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

const AddCampusDialog = ({ open, setOpen }: AddCampusDialogProps) => {
  const { mutate: addCampus, isPending } = useAddCampus();

  const validationSchema = Yup.object({
    name: Yup.string().required('Campus name is required.'),
    location: Yup.string().required('Location name is required.'),
  });


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:!max-w-[652px] p-0">
        <div className="p-6">
          <DialogTitle className="!mb-1">Add campus</DialogTitle>
        </div>
        <Formik
          initialValues={{
            name: '',
            location: '',
          }}
          validationSchema={validationSchema}
          validateOnBlur={false}
          onSubmit={values => {
            addCampus(values, {
              onSuccess: () => {
                showDataToast('Campus Added Successfully');
                setOpen(false);
              },
              onError: (error: any) => {
                showErrorToast((error?.response?.data as any)?.error);
              },
            });
          }}
        >
          {() => (
            <Form className="">
              <div className="p-6 pt-0 space-y-4">
                <FormField name="name" label="Name" placeholder="Enter Campus name" />
                <FormField name="location" label="Location" placeholder="Enter Campus location" />
              </div>
              <DialogFooter className="pt-4">
                <Button text="Cancel" className="outlined" onClick={() => setOpen(false)} />
                <Button type="submit" text="Continue" isLoading={isPending} disabled={isPending} />
              </DialogFooter>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default AddCampusDialog;
