import ReactQRCode from 'react-qr-code';
import styled from 'styled-components';

interface IQRCodeProps {
  address?: string;
}

const QRCodeContainer = styled.div`
  background-color: white;
  border-radius: 0.5rem;
  width: fit-content;
  box-shadow: var(--shadow);
  display: flex;
  padding: 0.5rem;
`;

export const QRCode = ({ address }: IQRCodeProps) => {
  if (!address) {
    return null;
  }
  return (
    <QRCodeContainer>
      <ReactQRCode value={address} level="M" size={128} />
    </QRCodeContainer>
  );
};
