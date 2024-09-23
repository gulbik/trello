import { useState } from "react";

type CreateProps = {
    onSubmit: ( newItemId: string, content: string, listId?: string) => void
}

export const useCreate = ({onSubmit}: CreateProps) => {
    const [isAddingItem, setAddingItem] = useState(false);
    const [newContent, setNewContent] = useState('');

    const handleAdd = (newContentTrim: string, listId?: string) => {
        if (newContentTrim.length > 0) {
            const newItemId = Date.now().toString();
            onSubmit(newItemId, newContentTrim, listId)
            setNewContent('');
            setAddingItem(false);
        }
    };

    const handleCancel = () => {
        setAddingItem(false);
        setNewContent('');
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewContent(e.target.value)
    }

    const handleClick = () => {
        setAddingItem(true)
    }

    return{
        isAddingItem,
        newContent,
        handleAdd,
        handleChange,
        handleCancel,
        handleClick
    }
}