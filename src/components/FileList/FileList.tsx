import React from "react";
import { IFile } from "../../@types/file";

import { Container, FileInfo, Preview } from "./styles";

interface IFileListProps {
  files: IFile[];
  onDelete?: (id: string) => void;
}

const FileList: React.FC<IFileListProps> = ({ files, onDelete }) => {
  return (
    <Container>
      {files.map((file) => {
        return (
          <li key={file.name}>
            <FileInfo>
              <Preview src={file.preview} />
              <div>
                <strong>{file?.name}</strong>
                <span>
                  {/* <button onClick={() => onDelete(file.id)}>Excluir</button> */}
                </span>
              </div>
            </FileInfo>
          </li>
        );
      })}
    </Container>
  );
};

export default FileList;
