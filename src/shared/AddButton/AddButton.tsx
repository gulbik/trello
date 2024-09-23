import { Add } from "@mui/icons-material"
import { Button } from "@mui/material";
import { ButtonHTMLAttributes } from "react";
import { bg, dark } from "../color";


interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    sx: object;
    variant: 'primary' | 'ghost';
}
export const AddButton: React.FC<ButtonProps> = ({ variant, sx = {}, children, onClick}) => {
    const variantStyles = variant === 'primary'
        ? { backgroundColor: bg, color: 'white', '&:hover': { backgroundColor: dark, } } 
        : { backgroundColor: 'transparent', color: bg, '&:hover': { color: dark} }; 

    return (
        <Button
            onClick={onClick}
            size="large"
            startIcon={<Add />}
            sx={{ textTransform: 'none', ...variantStyles, ...sx }}
        >
            {children}
        </Button>
    )
}