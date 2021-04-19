import React from "react";
import styled from "styled-components";

const index = () => {
  return (
    <Section>
      <h1>First Page</h1>
    </Section>
  );
};

export default index;

const Section = styled.section`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  h1 {
    font-size: 80px;
  }
`;
