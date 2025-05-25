import type { ComponentProps } from 'react'
import type { ControllerProps, FieldPath, FieldValues } from 'react-hook-form'

import { createContext, use, useId, useMemo } from 'react'
import { Slot } from '@radix-ui/react-slot'
import { Controller, FormProvider, useFormContext } from 'react-hook-form'

import { cn } from '../lib/cn'

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

  const { id } = use(FormItemContext)

  const { getFieldState, formState } = useFormContext()

  const fieldState = getFieldState(fieldContext.name, formState)

  if (!fieldContext) {
    throw new Error('useFormField should be used within <FormField>')
  }

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState
  }
}

type FormItemContextValue = { id: string }

const FormItemContext = createContext<FormItemContextValue>(
  {} as FormItemContextValue
)

const FormItem = ({ className, ref, ...props }: ComponentProps<'div'>) => {
  const id = useId()

  const value = useMemo(() => ({ id }), [id])

  return (
    <FormItemContext value={value}>
      <div
        ref={ref}
        className={cn('space-y-2', className)}
        {...props}
      />
    </FormItemContext>
  )
}

const FormLabel = ({ className, ref, ...props }: ComponentProps<'label'>) => {
  const { error, formItemId } = useFormField()

  return (
    <label
      ref={ref}
      className={cn('block', error && 'text-red', className)}
      htmlFor={formItemId}
      {...props}
    />
  )
}

const FormControl = ({ ref, ...props }: ComponentProps<typeof Slot>) => {
  const { error, formItemId, formMessageId } = useFormField()

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={formMessageId}
      aria-invalid={!!error}
      {...props}
    />
  )
}

const FormMessage = ({
  className,
  ref,
  children,
  ...props
}: ComponentProps<'p'>) => {
  const { error, formMessageId } = useFormField()

  const body = error ? String(error?.message ?? '') : children

  return (
    body && (
      <p
        ref={ref}
        id={formMessageId}
        className={cn('text-red', className)}
        {...props}>
        {body}
      </p>
    )
  )
}

export { Form, FormItem, FormLabel, FormControl, FormMessage, FormField }
