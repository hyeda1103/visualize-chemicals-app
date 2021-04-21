import React from "react";
import styled from "styled-components/macro";

const Main = () => {
  return (
    <Section>
      <Inner>
        <TitleWrapper>
          <h1>성분의 시각화</h1>
          <h1>생리용품에 대한 질문들 타이머 함수로 띄우기</h1>
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
  h1 {
    font-size: 70px;
  }
`;
