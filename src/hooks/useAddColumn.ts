import { valibotResolver } from '@hookform/resolvers/valibot';
import { columnSchema, ColumnModal } from 'lib/schemas/addComumn-shema';

import { useForm, SubmitHandler } from 'react-hook-form';


export const useAddColumnForm  = () => {
    const {
        register,
        handleSubmit,
        formState:{errors},
    } = useForm<ColumnModal>({
        resolver: valibotResolver(columnSchema),
        mode:"onChange"
    })
    const handleAddColumn: SubmitHandler<ColumnModal> = (data) => {
        console.log("data:", data)
}

return {register, handleSubmit:handleSubmit(handleAddColumn),errors}
}