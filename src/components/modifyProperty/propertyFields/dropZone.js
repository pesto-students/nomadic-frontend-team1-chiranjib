//importing react and dropZone
import React from "react";
import { useDropzone } from "react-dropzone";
import Button from "../../common/button";
//importing styles
import styles from "./styles.module.css";

//dropzone component
function Dropzone({ open, onDrop,disabled }) {
    const { getRootProps, getInputProps, isDragActive } =
        useDropzone({ accept:"image/*", onDrop, maxFiles:5,maxSize:8145728,disabled:disabled });


    return (
        <div {...getRootProps({ className: styles.dropzone })}>
            <input className="input-zone" {...getInputProps()} />
            <div className="text-center">
                {isDragActive ? (
                    <p className="dropzone-content">
                        Release to drop the files here
                    </p>
                ) : (
                    <p className="dropzone-content">
                        Drag’n’drop files or click to Select (Max 5 file)
                    </p>
                )}
                <Button 
                onClick={open} 
                className="btn"
                disabled={disabled}
                >
                    Click here to select files
                </Button>
            </div>
        </div>
    );
}

export default Dropzone;
