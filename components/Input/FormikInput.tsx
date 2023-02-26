import clsx from "clsx";
import { Field, FieldHookConfig, useField } from "formik";
import React from "react";

import { AuthFormInitialValues } from "@/modules/auth/auth.types";

import Input from "./Input";
import { InputProps } from "./Input.types";

/**
 * Common form text input component.
 * IMPORTANT: This component should be wrapped inside Formik.
 * @example
 * <Formik initialValues={{ test: '' }} validationSchema={validation} onSubmit={() => {}>
 *  {() => (
 *    <Form>
 *      <FormikInput id='name' name='name' placeholder='Enter your name'       startIcon={<BsFillTrashFill />} />
 *    </Form>
 *  )}
 * </Formik>
 */

const FormikInput = ({
  name = "",
  placeholder,
  className,
  ...rest
}: InputProps & FieldHookConfig<string>) => {
  const [field, meta] = useField<AuthFormInitialValues>(name);

  return (
    <div
      className={clsx("relative", [
        meta.touched && meta.error ? "mb-8" : "mb-4",
        className,
      ])}
    >
      <Field
        component={Input}
        error={meta.touched && meta.error}
        id={field.name}
        placeholder={placeholder}
        {...field}
        {...rest}
      />
      {meta.touched && meta.error && (
        <p className="absolute -bottom-5.5 pl-3 text-sm text-tomato font-medium lg:font-normal">
          {meta.error}
        </p>
      )}
    </div>
  );
};

export default FormikInput;
