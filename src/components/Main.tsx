import React from "react";
import styled from "styled-components/macro";

type Props = {
  clickToSearch: any;
};

const Main = ({ clickToSearch }: Props) => {
  return (
    <Section>
      <Inner>
        <TitleWrapper>
          <Series>2021 여름호</Series>
          <Title>
            <Box onClick={clickToSearch}>생리용품</Box>에 대하여
          </Title>
        </TitleWrapper>
      </Inner>
    </Section>
  );
};

export default Main;

const Section = styled.section`
  width: 100%;
`;

const Inner = styled.div`
  width: 80%;
  margin: 0 auto;
  height: 100vh;
  padding: 96px 0;
`;

const TitleWrapper = styled.div`
  margin-bottom: 80px;
`;

const Series = styled.h1`
  font-size: 80px;
`;

const Title = styled.h1`
  font-size: 120px;
  line-height: 120px;
  margin: 80px 0;
`;

const Box = styled.span`
  margin: 0 50px 0 0;
  padding: 20px 80px;
  background: ${({ theme }: any) => theme.text};
  color: ${({ theme }: any) => theme.body};
  cursor: pointer;
  border-radius: 10px;
  transition: 0.6s ease;
  box-sizing: border-box;
  border: 3px solid ${({ theme }: any) => theme.text};

  &:hover {
    color: ${({ theme }: any) => theme.text};
    background: ${({ theme }: any) => theme.body};
    border: 3px solid ${({ theme }: any) => theme.text};
  }
`;
