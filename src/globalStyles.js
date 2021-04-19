import { createGlobalStyle } from "styled-components/macro";

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Noto Sans KR', sans-serif;
    }

    html, body {
        overflow-x: hidden;
    }
`;

export default GlobalStyle;
