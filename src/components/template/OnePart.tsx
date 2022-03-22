import React from "react";
import styled from "styled-components/macro";

const Section = styled.section`
  width: 100%;
`;

interface StyleProps {
  close: boolean;
};

const Inner = styled.div<StyleProps>`
  transform: ${({ close }) => (close ? 'translateX(0)' : 'translateX(-15%)')};
  position: relative;
  padding: 200px 0;
  transition: 0.6s;
`

const Column = styled.div`
  padding: 40px 0;
`;

const TitleWrapper = styled.div`
  text-align: center;
`;

const Title = styled.div`
  font-size: 70px;
  font-weight: 700;
`;

interface Props {
  close: boolean;
  title: JSX.Element;
  content: JSX.Element;
};

const OnePartLayout = ({ close, title, content }: Props) => {
  return (
    <Section>
      <Inner close={close}>
        <Column>
          <TitleWrapper>
            <Title>
              {title}
            </Title>
          </TitleWrapper>
          {content}
        </Column>
      </Inner>
    </Section>
  );
};

export default OnePartLayout;
