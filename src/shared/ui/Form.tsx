import type { ControllerProps, FieldPath, FieldValues } from 'react-hook-form'

import { createContext, use, useMemo } from 'react'
import { Field } from '@base-ui/react/field'
import { Controller, FormProvider, useController } from 'react-hook-form'

import { cn } from '../lib'

const Form = FormProvider

type FormFieldContextValue<
  F extends FieldValues = FieldValues,
  N extends FieldPath<F> = FieldPath<F>
> = {
  name: N
}

const FormFieldContext = createContext<FormFieldContextValue>(
  {} as FormFieldContextValue
)

const FormField = <
  F extends FieldValues = FieldValues,
  N extends FieldPath<F> = FieldPath<F>
>({
  ...props
}: ControllerProps<F, N>) => {
  const value = useMemo(() => ({ name: props.name }), [props.name])

  return (
    <FormFieldContext value={value}>
      <Controller {...props} />
    </FormFieldContext>
  )
}

const useFormField = () => {
  const fieldContext = use(FormFieldContext)

  const { field, fieldState, formState } = useController({
    name: fieldContext.name
  })

  if (!fieldContext) {
    throw new Error('useFormField should be used within <FormField>')
  }

  return { name: fieldContext.name, field, fieldState, formState }
}

const FormItem = ({ className, ...props }: Field.Root.Props) => {
  const {
    name,
    fieldState: { invalid, isDirty, isTouched }
  } = useFormField()

  return (
    <Field.Root
      className={cn('space-y-2', className)}
      name={name}
      invalid={invalid}
      touched={isTouched}
      dirty={isDirty}
      {...props}
    />
  )
}

const FormLabel = ({ className, ...props }: Field.Label.Props) => {
  const {
    fieldState: { error }
  } = useFormField()

  return (
    <Field.Label
      className={cn(
        'block text-base text-black/50 dark:text-white/50',
        error && 'text-red',
        className
      )}
      {...props}
    />
  )
}

const FormDescription = ({ className, ...props }: Field.Description.Props) => (
  <Field.Description
    className={cn('text-md pl-1 text-black/70 dark:text-white/70', className)}
    {...props}
  />
)

const FormControl = ({ ...props }: Field.Control.Props) => {
  const fieldContext = use(FormFieldContext)

  const {
    field: { value, ref, onBlur, onChange }
  } = useController({ name: fieldContext.name })

  return (
    <Field.Control
      value={value}
      ref={ref}
      onBlur={onBlur}
      onValueChange={onChange}
      {...props}
    />
  )
}

const FormMessage = ({ className, ...props }: Field.Error.Props) => {
  const {
    fieldState: { error }
  } = useFormField()

  return (
    <Field.Error
      match={!!error}
      className={cn('text-red pl-1', className)}
      {...props}>
      {error?.message}
    </Field.Error>
  )
}

export {
  Form,
  FormItem,
  FormLabel,
  FormDescription,
  FormControl,
  FormMessage,
  FormField,
  useFormField
}
