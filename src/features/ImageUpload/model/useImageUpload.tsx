import { useState } from "react";

export const useImageUpload = (setBackgroundImage: (image: string) => void) => {
    const [drag, setDrag] = useState(false);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const uploadedFile = e.target.files?.[0];
        if (uploadedFile) {
            const imageUrl = URL.createObjectURL(uploadedFile);
            setBackgroundImage(imageUrl);
        }
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDrag(true);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const uploadedFile = e.dataTransfer.files?.[0];
        if (uploadedFile) {
            const imageUrl = URL.createObjectURL(uploadedFile);
            setBackgroundImage(imageUrl);
        }
        setDrag(false);
    };

    return {
        drag,
        setDrag,
        handleImageUpload,
        handleDragOver,
        handleDrop,
    };
};