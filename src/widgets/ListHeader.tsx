import { Delete, Edit } from "@mui/icons-material"
import { Box, IconButton, Typography } from "@mui/material"
import { useContext, useState } from "react";
import { BoardContext } from "../context/BoardContext";
import { EditForm } from "../features/EditForm";

type ListHeaderProps = {
    list: {id: string; title: string;}
}

const ListHeader: React.FC <ListHeaderProps> = ({list}) => {
    const { dispatch } = useContext(BoardContext);
    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(list.title); 

    const handleEditSubmit = () => {
        setIsEditing(false)
        dispatch({type:'EDIT_LIST', payload: {id: list.id, title: editedTitle}})
    }
    const handleDelete = () => {
        dispatch({ type: 'DELETE_LIST', payload: list.id });
    };
    
    return(
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: '10px' }}>
            {isEditing ? (
                <EditForm
                    editedContent={editedTitle}
                    onSubmit={() => handleEditSubmit()}
                    onChange={(e) => setEditedTitle(e.target.value)}
                />
            ) : (
            <>
                <Typography variant="h6" >
                    {list.title}
                </Typography>
                <Box>
                    <IconButton onClick={() => setIsEditing(true)}>
                        <Edit />
                    </IconButton>
                    <IconButton onClick={handleDelete}>
                        <Delete />
                    </IconButton>
                </Box>
            </>)}
        </Box>
        
    )
   
}

export default ListHeader
