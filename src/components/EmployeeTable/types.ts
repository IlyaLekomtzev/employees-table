import { IEmployee } from 'types/data';

export interface TableData extends IEmployee {
    genderPrint: string;
    positionPrint: string;
    firedPrint: string;
}