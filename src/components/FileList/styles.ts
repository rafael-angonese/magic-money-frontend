import styled from "styled-components";

export const Container = styled.ul`
  margin-top: 20px;

  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: ${(props) => props.theme.palette.whiteAlpha[600]};

    & + li {
      margin-top: 15px;
    }
  }
`;

export const FileInfo = styled.div`
  display: flex;
  align-items: center;

  div {
    display: flex;
    flex-direction: column;

    span {
      font-size: 12px;
      color: ${(props) => props.theme.palette.whiteAlpha[800]};
      margin-top: 5px;

      button {
        border: 0;
        background: transparent;
        color: ${(props) => props.theme.palette.red[400]};
        margin-left: 5px;
        cursor: pointer;
      }
    }
  }
`;

interface IPreview {
  src: string
}

export const Preview = styled.div<IPreview>`
  width: 36px;
  height: 36px;
  border-radius: 5px;
  background-image: url(${props => props.src});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
  margin-right: 10px;
`;
