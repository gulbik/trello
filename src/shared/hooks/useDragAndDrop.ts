// import { useState } from 'react';

// type DragAndDropProps = {
//     onDrop: (itemId: string, targetIndex: number, fromListId?: string, toListId?: string) => void;
// };

// export const useDragAndDrop = ({ onDrop }: DragAndDropProps) => {
//     const [draggingOverId, setDraggingOverId] = useState<string| null>(null);

//     const handleDragStart = (e: React.DragEvent<HTMLDivElement>, itemId: string, fromListId?: string) => {
//         e.stopPropagation(); 
//         e.dataTransfer.setData('itemId', itemId);
//         if (fromListId) {
//             e.dataTransfer.setData('fromListId', fromListId);
//         }
//     };

//     const handleDragOver = (e: React.DragEvent<HTMLDivElement>, targetId: string) => {
//         e.preventDefault();
//         setDraggingOverId(targetId);

//     };

//     const handleDragLeave = () => {
//         setDraggingOverId(null); 
//     };

//     const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetIndex: number, toListId?: string) => {
//         e.stopPropagation(); 
//         e.preventDefault();

//         const itemId = e.dataTransfer.getData('itemId'); 
//         const fromListId = e.dataTransfer.getData('fromListId'); 

//         onDrop(itemId, targetIndex, fromListId , toListId);
//         setDraggingOverId(null); 
//     };

//     return {
//         draggingOverId,
//         handleDragStart,
//         handleDragOver,
//         handleDrop,
//         handleDragLeave,
//     };
// };


import { useState } from 'react';

type DragAndDropProps = {
    onDrop: (itemId: string, targetIndex: number, fromListId?: string, toListId?: string) => void;
};

export const useDragAndDrop = ({ onDrop }: DragAndDropProps) => {
    const [draggingOverCardId, setDraggingOverCardId] = useState<string | null>(null);
    const [draggingOverListId, setDraggingOverListId] = useState<string | null>(null);

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, itemId: string, fromListId?: string) => {
        e.stopPropagation();
        e.dataTransfer.setData('itemId', itemId);
        if (fromListId) {
            e.dataTransfer.setData('fromListId', fromListId);
        }
    };

    const handleDragOverCard = (e: React.DragEvent<HTMLDivElement>, targetId: string) => {
        e.preventDefault();
        setDraggingOverCardId(targetId);
        setDraggingOverListId(null);
    };

    const handleDragOverList = (e: React.DragEvent<HTMLDivElement>, targetId: string) => {
        e.preventDefault();
        setDraggingOverListId(targetId);
        setDraggingOverCardId(null);
    };

    const handleDragLeave = () => {
        setDraggingOverCardId(null);
        setDraggingOverListId(null);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>, targetIndex: number, toListId?: string) => {
        e.stopPropagation();
        e.preventDefault();
        setDraggingOverCardId(null);
        setDraggingOverListId(null);

        const itemId = e.dataTransfer.getData('itemId');
        const fromListId = e.dataTransfer.getData('fromListId');

        onDrop(itemId, targetIndex, fromListId, toListId);
        
    };

    return {
        draggingOverCardId,
        draggingOverListId,
        handleDragStart,
        handleDragOverCard,
        handleDragOverList,
        handleDrop,
        handleDragLeave,
    };
};
