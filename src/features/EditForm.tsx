import { Check } from "@mui/icons-material";
import { Box, IconButton, TextField } from "@mui/material";

type EditFormProps = {
    editedContent: string; 
    onSubmit: () => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const EditForm: React.FC <EditFormProps> = ({ editedContent , onSubmit, onChange}) => {
    return (
        <Box
            component="form"
            sx={{ display: 'flex' }}
            onSubmit={(e) => {
                e.preventDefault();
                editedContent.trim().length > 0 && onSubmit();
            }}
        >
            <TextField
                value={editedContent}
                onChange={onChange}
                size="small"
            />
            <IconButton type='submit'>
                <Check fontSize="inherit" />
            </IconButton>
        </Box>
    )
}