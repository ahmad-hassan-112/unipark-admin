'use client';

import { Form, Formik } from 'formik';
import * as Yup from 'yup';

import { Dialog, DialogContent, DialogTitle, DialogFooter } from '@/components/UiComponents/Dialog';
import Button from '@/components/UiComponents/Button';
import { emailValidation, passwordValidation } from '@/utils/validation';
import FormField from '@/components/UiComponents/FormFields';
import FormSelect from '@/components/UiComponents/FormSelect';
import RenderIf from '@/components/Common/renderIf';
import { useInviteUser } from '@/hooks/useSettings';
import { showDataToast, showErrorToast } from '@/utils/common';

type InviteUserDialogProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
  isEdit?: boolean;
};

const InviteUserDialog = ({ open, setOpen, isEdit }: InviteUserDialogProps) => {
  const { mutate: inviteUser, isPending } = useInviteUser();

  const validationSchema = Yup.object({
    fullName: Yup.string().required('Name is required.'),
    email: emailValidation,
    password: passwordValidation,
    role: Yup.string().required('User role is required.'),
    maxVehicles: Yup.number().required('Vehicle count is required.'),
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:!max-w-[652px] p-0">
        <div className="p-6">
          <DialogTitle className="!mb-1">Invite user</DialogTitle>
        </div>
        <Formik
          initialValues={{
            fullName: '',
            email: '',
            password: '',
            role: '',
            maxVehicles: 0,
          }}
          validationSchema={validationSchema}
          onSubmit={values => {
            const payload = {
              ...values,
              is_sent_invite: true,
            };

            inviteUser(payload, {
              onSuccess: () => {
                setOpen(false);
                showDataToast('Created Successfully');
                window.location.reload();
              },
              onError: (error: any) => {
                showErrorToast((error?.response?.data as any)?.error);
              },
            });
          }}
        >
          {({ values, setFieldValue, errors, touched }) => (
            <Form className="">
              <div className="p-6 pt-0 space-y-4">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <FormField name="fullName" label="Full name" type="text" placeholder="Enter Full name" />
                  </div>
                  <div className="flex-1">
                    <FormField name="maxVehicles" label="Max Vehicles" type="number" placeholder="Enter Max Vehicles" />
                  </div>
                </div>
                <div>
                  <FormField name="email" label="Email address" type="email" placeholder="Enter email address" />
                </div>
                <div>
                  <FormField name="password" label="Password" type="text" placeholder="Enter password" />
                </div>
                <div>
                  <FormSelect
                    name="role"
                    label="Assign user role"
                    placeholder="Select user role"
                    options={[
                      { label: 'Admin', value: 'SystemAdministrator' },
                      { label: 'Permits Operator', value: 'PermitsOperator' },
                    ]}
                    value={values.role}
                    onChange={val => setFieldValue('role', val)}
                    isError={(errors.role && touched.role) || false}
                  />
                </div>
              </div>
              <DialogFooter className="pt-4">
                <RenderIf isTrue={isEdit || false}>
                  <Button text="Cancel" className="outlined" onClick={() => setOpen(false)} />
                </RenderIf>
                <Button type="submit" text={isEdit ? 'Save' : 'Create User'} isLoading={isPending} disabled={isPending} />
              </DialogFooter>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default InviteUserDialog;
