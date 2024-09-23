import { DeleteOutline, Edit } from "@mui/icons-material";
import { Box, Card, IconButton, Typography, } from "@mui/material";
import { useContext } from "react";
import { BoardContext } from "../context/BoardContext";
import { EditForm } from "../features/EditForm";
import { useEdit } from "../shared/hooks/useEdit";

type ActionCardProps = {
    card: { id: string; content: string };
    listId: string;
};

const ActionCard: React.FC<ActionCardProps> = ({ card, listId }) => {
    const { dispatch } = useContext(BoardContext);

    const handleDelete = () => {
        dispatch({ type: 'DELETE_CARD', payload: { listId, cardId: card.id } });
    };

    const {isEditing, editedContent, handleEditToggle, handleContentChange, handleEditSubmit} = useEdit ({
        initialContent: card.content,
        onSubmit: (newContent: string) => {
            dispatch({ type: 'EDIT_CARD', payload: { listId, cardId: card.id, content: newContent } });
        }
    });

    return (
        <Card
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                p: '10px',
                backgroundColor: "#EEEDEB",
                '&:hover .card-icon': { visibility: 'visible' },
            }}
        >
            {isEditing ? (
                <EditForm
                    editedContent={editedContent}
                    onSubmit={() => handleEditSubmit()}  
                    onChange={handleContentChange} 
                />
            ) : (
                <>
                <Typography>{card.content}</Typography>
                    <Box>
                        <IconButton onClick={handleEditToggle} size="small" className="card-icon" sx={{ visibility: 'hidden' }}>
                            <Edit fontSize="inherit" />
                        </IconButton>
                        <IconButton onClick={handleDelete} size="small" className="card-icon" sx={{ visibility: 'hidden' }}>
                            <DeleteOutline fontSize="inherit" />
                        </IconButton>
                    </Box>
                </>
            )}
        </Card>
    );
};

export default ActionCard;