import { Position, Gender } from 'constants/data';

export interface IEmployee {
    key: string;
    name: string;
    birthday: string;
    isFired: boolean;
    gender: Gender;
    position: Position;
}

export type IEmployeeRequest = Omit<IEmployee, 'key'>;
