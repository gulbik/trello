import { TextField } from "@mui/material";
import { useImageUpload } from "../model/useImageUpload";

type ImageUploadProps = {
    setBackgroundImage: (image: string) => void;
};

export const ImageUpload: React.FC<ImageUploadProps> = ({ setBackgroundImage }) => {
    const { drag, setDrag, handleImageUpload, handleDragOver, handleDrop } = useImageUpload(setBackgroundImage);

    return (
        <div
            onDragOver={handleDragOver}
            onDragLeave={() => setDrag(false)}
            onDrop={handleDrop}
        >
            {drag ? (
                <div className="drop-area">Отпустите файл для загрузки</div>
            ) : (
                <TextField
                    type="file"
                    onChange={handleImageUpload}
                    inputProps={{ accept: "image/*" }}
                />
            )}
        </div>
    );
};
