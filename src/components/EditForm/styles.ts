import styled from 'styled-components';
import { commonContentStyles, flexCenter } from 'constants/mixins';

export const EditFormWrapper = styled.section`
    ${commonContentStyles};
    ${flexCenter};
`;

export const EditFormInner = styled.div`
    width: 50%;
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

export const FormItem = styled.div`
    width: 100%;
`;