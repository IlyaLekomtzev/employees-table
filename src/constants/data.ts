export enum Gender {
    Male = 'M',
    Female = 'F'
}

export const genderLabels = {
    [Gender.Male]: 'Male',
    [Gender.Female]: 'Female'
};

export enum Position {
    Developer = 'Developer',
    Designer = 'Designer',
    Manager = 'Manager',
    Tester = 'QA Engineer'
}

export const successTitle = 'Success';
export const errorTitle = 'Error';

export const successEmployeeAdded = 'Employee successfully added';
export const errorEmployeeAdded = 'Failed to add employee';

export const successEmployeeSaved = 'Employee successfully saved';
export const errorEmployeeSaved = 'Failed to save employee';

export const successEmployeeDeleted = 'Employee successfully deleted';
export const errorEmployeeDeleted = 'Failed to delete employee';