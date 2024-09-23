import { useState } from "react";

type EditProps = {
    initialContent: string;
    onSubmit: (newContent: string) => void;
}

export const useEdit = ({ initialContent, onSubmit }: EditProps) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(initialContent); 

    const handleEditToggle = () => {
        setIsEditing(true);
    };

    const handleContentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditedContent(e.target.value)
    }

    const handleEditSubmit = () => {
        onSubmit(editedContent);
        setIsEditing(false);
    };
    
    return {
        isEditing,
        editedContent,
        handleEditToggle,
        handleEditSubmit,
        handleContentChange
    }
}