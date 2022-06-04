import styled from 'styled-components';
import { commonContentStyles } from 'constants/mixins';

export const TableWrapper = styled.section`
    ${commonContentStyles};

    @media screen and (max-width: 991px) {
        max-height: 80vh;
    }
`;