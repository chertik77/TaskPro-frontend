import type {
  ComponentPropsWithoutRef,
  ElementRef,
  HTMLAttributes
} from 'react'
import type { ControllerProps, FieldPath, FieldValues } from 'react-hook-form'

import { createContext, forwardRef, useContext, useId } from 'react'
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
}: ControllerProps<F, N>) => (
  <FormFieldContext.Provider value={{ name: props.name }}>
    <Controller {...props} />
  </FormFieldContext.Provider>
)

const useFormField = () => {
  const fieldContext = useContext(FormFieldContext)

  const { id } = useContext(FormItemContext)

  const { getFieldState, formState } = useFormContext()

  const fieldState = getFieldState(fieldContext.name, formState)

  if (!fieldContext) {
    throw new Error('useFormField should be used within <FormField>')
  }

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState
  }
}

type FormItemContextValue = { id: string }

const FormItemContext = createContext<FormItemContextValue>(
  {} as FormItemContextValue
)

const FormItem = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const id = useId()

    return (
      <FormItemContext.Provider value={{ id }}>
        <div
          ref={ref}
          className={cn('space-y-2', className)}
          {...props}
        />
      </FormItemContext.Provider>
    )
  }
)

const FormLabel = forwardRef<
  HTMLLabelElement,
  HTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField()

  return (
    <label
      ref={ref}
      className={cn(error && 'text-red', className)}
      htmlFor={formItemId}
      {...props}
    />
  )
})

const FormControl = forwardRef<
  ElementRef<typeof Slot>,
  ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField()

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  )
})

const FormMessage = forwardRef<
  HTMLParagraphElement,
  HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
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
})

export { Form, FormItem, FormLabel, FormControl, FormMessage, FormField }
