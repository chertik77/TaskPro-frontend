import { valibotResolver } from '@hookform/resolvers/valibot';
import { columnSchema, ColumnModal } from 'lib/schemas/addComumn-shema';
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

export const useEditColumnForm = (initialData?: ColumnModal) => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<ColumnModal>({
        resolver: valibotResolver(columnSchema),
        mode: "onChange",
    });

    const [isEditing, setIsEditing] = React.useState(!!initialData);

    const handleEdit = (data: ColumnModal) => {
        setIsEditing(true);
        setValue('title', data.title);
    };

    const handleAddColumn: SubmitHandler<ColumnModal> = (data) => {
        console.log("data:", data);

        setIsEditing(false);
        setValue('title', '');
    };

    return {
        register,
        handleSubmit: handleSubmit(handleAddColumn),
        errors,
        isEditing,
        handleEdit,
    };
};
