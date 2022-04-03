import React, { useState, useEffect } from "react";
import styled from "styled-components";

import * as T from '../../types';
import { getTermData } from "../../utils";
interface StyleProps {
  close: boolean;
};

const Section = styled.section<StyleProps>`
  position: fixed;
  right: 0;
  top: 60px;
  width: 30%;
  transform: ${({ close }) => (close ? 'translateX(100%)' : 'translateX(0)')};
  height: 100vh;
  padding: 112px 0;
  border-left: 2px dashed ${({ theme }) => theme.text};
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
  align-items: center;
  z-index: 1;
  transition: 0.25s ease;
`

const Inner = styled.div`
  width: 75%;
  margin: 0 auto;
`;

const KeywordWrapper = styled.div``;

const SearchKeyword = styled.div`
  font-size: 30px;
  font-weight: 700;
  margin-right: 13px;
`;

const Drag = styled.div`
  background: ${({ theme }) => theme.text};
  color: ${({ theme }) => theme.background};
  width: 100px;
  text-align: center;
  margin-left: -65px;
  cursor: pointer;
  transform: rotate(270deg);
  padding: 5px 0;
  border-radius: 15px 15px 0 0;
  font-size: 14px;
  font-weight: 300;
  z-index: 1;
  letter-spacing: 4px;
`;

interface Props {
  search: string | null;
  close: boolean;
  clickToClose: () => void;
};

function Dictionary({ search, close, clickToClose }: Props) {
  const [termData, setTermData] = useState<Array<T.Term>>([]);
  const [searchResult, setSearchResult] = useState<T.Term>();
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    async function getResult() {
      try {
        const res = await getTermData()
        setTermData(res)
      } catch (err) {
        console.error(err)
      }
    }
    getResult()
  }, [])
  
  useEffect(() => {
    if (!search) return;
    const result = termData.filter((termItem) => search === termItem.term)[0]
    if (result) {
      setErrorMessage('')
      setSearchResult(result)
    } else {
      setSearchResult(undefined)
      setErrorMessage('아직 등록되지 않은 용어입니다')
    }
  }, [search, termData])

  return (
    <Section close={close}>
      <Drag onClick={clickToClose}>{close ? "열기" : "닫기"}</Drag>
      <Inner>
        <KeywordWrapper>
          용어사전
          <SearchKeyword>
            {searchResult?.term ? searchResult?.term : errorMessage}
          </SearchKeyword>
        </KeywordWrapper>
      </Inner>
    </Section>
  );
};

export default Dictionary;
