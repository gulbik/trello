import { Cancel } from "@mui/icons-material";
import { Box, Button, IconButton, TextField } from "@mui/material";
import { useRef } from "react";
import { dark } from "../shared/color";

type AddFormProps = {
    title: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onSubmit: () => void;
    onCancel: () => void;
    placeholder: string;

}

export const AddForm: React.FC<AddFormProps> = ({title, onChange, onSubmit, onCancel, placeholder}) => {
    const inputRef = useRef<HTMLInputElement>(null)

    setTimeout(() => {
        inputRef.current?.focus();
    }, 0);

  
    return(
        <Box component="form" onSubmit={(e) => {
            e.preventDefault();
            title.trim().length > 0 ? onSubmit() : onCancel()
        }}>
            <TextField
                value={title}
                onChange={onChange}
                placeholder={placeholder}
                variant="outlined"
                className='adding-list'
                sx={{ borderRadius:'6px', marginBottom: 1, backgroundColor: "#EEEDEB", width: '248px' }}
                inputRef={inputRef}
            />
            <Button type="submit" sx={{color:dark}}>
                Add
            </Button>
            <IconButton onClick={onCancel} aria-label="delete">
                <Cancel />
            </IconButton>
        </Box>
    )
}