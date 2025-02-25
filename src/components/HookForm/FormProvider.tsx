import { ReactNode } from 'react'
import {
  FieldValues,
  FormProvider as RHFProvider,
  SubmitHandler,
  UseFormReturn,
} from 'react-hook-form'

type Props<T extends FieldValues> = {
  children: ReactNode
  onSubmit: SubmitHandler<T>
} & UseFormReturn<T>

export const FormProvider = <T extends FieldValues>({
  children,
  onSubmit,
  ...methods
}: Props<T>) => {
  return (
    <RHFProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </RHFProvider>
  )
}
