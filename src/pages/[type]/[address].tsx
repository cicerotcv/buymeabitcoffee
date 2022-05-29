import { useRouter } from 'next/router';
import styled from 'styled-components';
import { QRCode } from '../../components/QrCode';

type TRouterParams = {
  type: string;
  address: string;
};

const PageContainer = styled.main`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #101010;
  justify-content: center;
  align-items: center;
`;

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #f0f0f0;
  text-align: center;
  background-color: #303030;
  border: 1px solid #505050;
  border-radius: 0.5rem;
  padding: 2rem;
  gap: 0.75rem;
  box-shadow: var(--shadow);
  max-width: 90vw;
`;

const Title = styled.h1`
  margin: 0;
  font-size: 1.5rem;
  font-style: italic;
`;

const Address = styled.span`
  font-family: monospace;
  font-weight: bold;
  margin: 0;
  max-width: 100%;
  overflow-x: auto;
  background-color: #202020;
  padding: 1rem;
  border: 1px solid #404040;
  border-radius: 0.25rem;
`;

export default function QrCodePage() {
  const router = useRouter();
  const { address, type } = router.query as TRouterParams;

  return (
    <PageContainer>
      <CardWrapper>
        <Title>Buy me a coffee</Title>
        <QRCode address={address} />
        <span>{type?.toUpperCase()} address:</span>
        <Address>{address}</Address>
      </CardWrapper>
    </PageContainer>
  );
}
