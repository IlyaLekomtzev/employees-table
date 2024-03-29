import { css } from 'styled-components';

export const commonContentStyles = css`
    width: 100%;
    height: calc(100vh - 64px);
    padding-top: 30px;

    @media screen and (max-width: 991px) {
        height: auto;
    }
`;

export const flexCenter = css`
    display: flex;
    justify-content: center;
    align-items: center;
`;