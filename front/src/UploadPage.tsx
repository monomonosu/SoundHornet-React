import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

const style = {
    width: 200,
    height: 150,
    border: "1px dotted #888"
};
export default function UploadPage() {
    const onDrop = useCallback((acceptedFiles: any) => {
        // Do something with the files
        console.log("onDrop:", acceptedFiles);
    }, []);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
    return (
        <div {...getRootProps()} style={style}>
            <input {...getInputProps()} />
            {isDragActive ? (
                <p>Drop the files here ...</p>
            ) : (
                <p>Drag 'n' drop some files here, or click to select files</p>
            )}
        </div>
    );
}