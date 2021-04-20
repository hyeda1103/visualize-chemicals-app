import React from "react";
import styled from "styled-components/macro";

const Main = () => {
  return (
    <Section>
      <Inner>
        <TitleWrapper>
          <h1>내가 사용하는 생리용품에서 검출되었다, 무엇?</h1>
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
  padding: 64px 0;
`;

const TitleWrapper = styled.div`
  margin-bottom: 80px;
  h1 {
    font-size: 70px;
  }
`;
