import styled, { css } from "styled-components";

const dragActive = css`
border-color: ${(props) => props.theme.palette.green[500]};
`;

const dragReject = css`
border-color: ${(props) => props.theme.palette.red[500]};
`;

interface DropContainerProps {
  isDragActive: boolean;
  isDragReject: boolean;
}

export const DropContainer = styled.div.attrs({
  className: "dropzone"
}) <DropContainerProps>`
  border: 1px dashed ${(props) => props.theme.palette.whiteAlpha[800]};
  border-radius: 4px;
  cursor: pointer;

  transition: height 0.2s ease;

  ${props => props.isDragActive && dragActive};
  ${props => props.isDragReject && dragReject};
`;

const messageColors = {
  default: css`${(props) => props.theme.palette.whiteAlpha[800]}`,
  error: css`${(props) => props.theme.palette.red[500]}`,
  success: css`${(props) => props.theme.palette.green[500]}`
};

interface UploadMessageProps {
  type?: "success" | "error";
}

export const UploadMessage = styled.p<UploadMessageProps>`
  display: flex;
  color: ${props => messageColors[props.type || "default"]};
  justify-content: center;
  align-items: center;
  padding: 15px 0;
`;
