import React from 'react';
import { getCharacter } from '../../helper';
import "./Files.css";

const Files = ({ files }) => {
    return (
        <div className="files">
            {files.map(file => {
                return <span key={file}>{getCharacter(file)}</span>;
            })}
        </div>
    );
}

export default Files;
