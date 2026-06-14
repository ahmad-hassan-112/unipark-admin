'use client';

import React from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';

import Button from '@/components/UiComponents/Button';
import FormField from '@/components/UiComponents/FormFields';
import { ROUTES } from '@/constants/pathName';

import { emailValidation } from '@/utils/validation';
import { useSignInAuth } from '@/hooks/useAuth';

const SignIn = () => {
  const router = useRouter();
  const { login, isPending } = useSignInAuth();

  const validationSchema = Yup.object({
    email: emailValidation,
    password: Yup.string().required('Password is required.'),
  });

  return (
    <div>
      <h3 className="mb-10">Sign into your account</h3>
      <Formik
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={validationSchema}
        onSubmit={values => {
          login(values);
        }}
      >
        {() => (
          <Form className="space-y-6 md:space-y-8">
            <FormField name="email" label="Work email" type="email" placeholder="Enter your email" />
            <div>
              <FormField name="password" label="Password" type="password" placeholder="Enter your password" />
              <div className="flex justify-end">
                <Button text="Forgot password?" type="button" className="mt-2 text !text-sm !h-auto" onClick={() => router.push(ROUTES.REQUEST_RESET_PASSWORD)} />
              </div>
            </div>
            <Button text="Login" type="submit" className="w-full mt-8 !h-12 !text-sm" disabled={isPending} isLoading={isPending} />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignIn;
