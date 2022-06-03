import { Position, Gender, genderLabels } from 'constants/data';

export const positionOptions = Object.keys(Position) as Array<keyof typeof Position>;

export const genderOptions = [
    {
        label: genderLabels[Gender.Male],
        value: Gender.Male
    },
    {
        label: genderLabels[Gender.Female],
        value: Gender.Female
    }
];