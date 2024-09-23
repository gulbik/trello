// import React, { useContext, useState } from 'react';
// import { Box, } from '@mui/material';
// import { List } from './List';
// import { BoardContext } from '../context/BoardContext';
// import { AddForm } from '../features/AddForm';
// import { AddButton } from '../shared/AddButton/AddButton';
// import { useDragAndDrop } from '../shared/hooks/useDragAndDrop';
// import { useCreate } from '../shared/hooks/useCreate';
// import { ImageUpload } from '../features/ImageUpload';

// export const Board: React.FC = () => {
//     const { state, dispatch } = useContext(BoardContext);
//     const [backgroundImage, setBackgroundImage] = useState('https://img.freepik.com/premium-photo/orange-purple-background-with-wavy-pattern_81048-164.jpg')

//     const { isAddingItem, newContent, handleAdd, handleChange, handleCancel, handleClick } = useCreate({
//         onSubmit: ( newItemId, content) => {
//             dispatch({ type: 'ADD_LIST', payload: { id: newItemId, title: content } });
//         },
//     });

//     const { handleDragStart, handleDragOver, handleDrop, handleDragLeave } = useDragAndDrop({
//         onDrop: (listId, targetIndex) => {
//             dispatch({type: 'MOVE_LIST', payload: {listId, toIndex: targetIndex}, });
//         },
//     });

//     return (
//         <Box sx={{ display: 'flex', overflowX: 'auto', padding: 2, 
//             backgroundImage: `url(${backgroundImage})`, 
//             backgroundSize:'cover', height: 'calc(100vh - 68.5px)' }}>
    
//             {state.lists.map((list, index) => (
//                 <Box
//                     key={ list.id }
//                     sx={{ minWidth: 300, marginRight: 2, }}
//                     draggable
//                     onDragStart={(e) => {
//                         handleDragStart(e, list.id);
                        
//                     }}
//                     onDragOver={(e) => handleDragOver(e, list.id)}
//                     onDrop={(e) => {handleDrop(e, index)
                        
//                     }}
//                     onDragLeave={handleDragLeave}
                    
//                 >
//                     <List list={list} />
//                 </Box>
//             ))}

//             <Box sx={{minWidth: '450px'}}>
//                 {isAddingItem ? (
//                     <AddForm
//                         title={newContent}
//                         onChange={(e) => handleChange(e)}
//                         onSubmit={() => handleAdd(newContent.trim())}
//                         onCancel={handleCancel}
//                         placeholder="Введите имя колонки..."
//                     />
//                 ) : (
//                     <Box >
//                             <AddButton
//                                 variant = 'primary'
//                                 onClick={() => handleClick()}
//                                 sx={{ p: '10px', pr: '60px', mb: '10px' }} 
//                             >
//                                 Add new list
//                             </AddButton> 
//                     </Box>
//                 )}
//                 <ImageUpload setBackgroundImage = {setBackgroundImage}></ImageUpload>
//             </Box>
//         </Box>
//     );
// };



import React, { useContext, useState } from 'react';
import { Box } from '@mui/material';
import { List } from './List';
import { BoardContext } from '../context/BoardContext';
import { AddForm } from '../features/AddForm';
import { AddButton } from '../shared/AddButton/AddButton';
import { useDragAndDrop } from '../shared/hooks/useDragAndDrop';
import { useCreate } from '../shared/hooks/useCreate';
import { ImageUpload } from '../features/ImageUpload';

export const Board: React.FC = () => {
    const { state, dispatch } = useContext(BoardContext);
    const [backgroundImage, setBackgroundImage] = useState('https://img.freepik.com/premium-photo/orange-purple-background-with-wavy-pattern_81048-164.jpg');

    const { isAddingItem, newContent, handleAdd, handleChange, handleCancel, handleClick } = useCreate({
        onSubmit: (newItemId, content) => {
            dispatch({ type: 'ADD_LIST', payload: { id: newItemId, title: content } });
        },
    });

    const { draggingOverListId, handleDragStart, handleDragOverList, handleDrop, handleDragLeave } = useDragAndDrop({
        onDrop: (listId, targetIndex) => {
            dispatch({ type: 'MOVE_LIST', payload: { listId, toIndex: targetIndex } });
        },
    });
    console.log(draggingOverListId)

    return (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'flex-start',
                overflowX: 'auto',
                padding: 2,
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                height: 'calc(100vh - 68.5px)',
            }}
        >

            {state.lists.map((list, index) => (
                //<Box key={list.id}>
                <Box
                    key={list.id}
                    sx={{ minWidth: 300, marginRight: 2 }}
                    draggable
                    onDragStart={(e) => {handleDragStart(e, list.id)}}
                    onDragOver={(e) => handleDragOverList(e, list.id)}
                    onDrop={(e) => handleDrop(e, index)}
                    onDragLeave={handleDragLeave} 
                    className={draggingOverListId===list.id ? 'list-dragging': ''}
                >
                    <List list={list} />
                </Box>
                //</Box>
            ))}

            <Box sx={{ minWidth: '450px' }}>
                {isAddingItem ? (
                    <AddForm
                        title={newContent}
                        onChange={(e) => handleChange(e)}
                        onSubmit={() => handleAdd(newContent.trim())}
                        onCancel={handleCancel}
                        placeholder="Введите имя колонки..."
                    />
                ) : (
                    <Box>
                        <AddButton
                            variant="primary"
                            onClick={() => handleClick()}
                            sx={{ p: '10px', pr: '60px', mb: '10px' }}
                        >
                            Add new list
                        </AddButton>
                    </Box>
                )}
                <ImageUpload setBackgroundImage={setBackgroundImage} />
            </Box>
        </Box>
    );
};
