import styled from 'styled-components';

const _Image = styled.img`
  height: auto;
  max-width: 100%;
`;

export const HeroImage: React.FC = () => (
  <_Image alt="Cyber TOON" height="576" src="/assets/hero-image.webp" width="1024" />
);
