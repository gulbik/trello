import React, { useContext, } from 'react';
import { Card, CardContent } from '@mui/material';
import ActionCard from './ActionCard';
import { BoardContext } from '../context/BoardContext';
import { AddForm } from '../features/AddForm';
import ListHeader from './ListHeader';
import { AddButton } from '../shared/AddButton/AddButton';
import { useDragAndDrop } from '../shared/hooks/useDragAndDrop';
import { useCreate } from '../shared/hooks/useCreate';

interface ListProps {
    list: {
        id: string;
        title: string;
        cards: { id: string; content: string }[];
    };
}

export const List: React.FC<ListProps> = ({ list }) => {
    const { dispatch } = useContext(BoardContext);

    const { isAddingItem, newContent, handleAdd, handleChange, handleCancel, handleClick } = useCreate({
        onSubmit: (newItemId, content, listId) => {
            dispatch({ type: 'ADD_CARD', payload: { cardId: newItemId, content, listId } });
        },
    });

    const { draggingOverCardId, handleDragStart, handleDragOverCard, handleDrop, handleDragLeave } = useDragAndDrop({
        onDrop: (itemId, targetIndex, fromListId, toListId) => {
            dispatch({
                type: 'MOVE_CARD',
                payload: {cardId: itemId, fromListId, toListId, newCardIndex: targetIndex},
            });
        },
    });

    return (
        <Card sx={{ maxWidth: '300px', }}>
            <CardContent>
                <ListHeader list={list} />
                {list.cards.map((card, index) => (
                    <div
                        key={card.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, card.id, list.id)}
                        onDrop={(e) => handleDrop(e, index, list.id)}
                        onDragOver={(e) => handleDragOverCard(e, card.id)}
                        onDragLeave={handleDragLeave}
                        onDragEnd={handleDragLeave}
                        className={`card ${draggingOverCardId ===card.id ? 'card-dragging' : ''}`}
                    >
                        <ActionCard card={card} listId={list.id} />
                    </div>
                ))}

                <div onDrop={(e) => handleDrop(e, list.cards.length, list.id)} onDragOver={(e) => handleDragOverCard(e, 'new-card')} onDragLeave={handleDragLeave} >
                    {isAddingItem ? (
                        <AddForm
                            title={newContent}
                            onChange={(e) => handleChange(e)}
                            onSubmit={() => handleAdd(newContent.trim(), list.id)}
                            onCancel={handleCancel}
                            placeholder="Enter card content..."
                        />
                    ) : (
                        <AddButton
                            variant='ghost'
                            onClick={() => handleClick()}
                            sx={{ mt: '5px' }}
                        >
                            Add new card
                        </AddButton>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};