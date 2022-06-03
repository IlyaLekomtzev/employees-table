import { Gender, Position } from 'constants/data';
import { createEvent, createStore } from 'effector';
import { IEmployee } from 'types/data';
import { employeesEvents } from './employees';

const { deleteEmployee, editEmployee } = employeesEvents;

// Events

const setEmployee = createEvent<IEmployee | null>('Set employee');
const resetEmployee = createEvent('Reset employee');

const changeName = createEvent<string>('Change name');
const changePosition = createEvent<Position>('Change position');
const changeBirthday = createEvent<string>('Change birthday');
const changeGender = createEvent<Gender | undefined>('Change gender');
const changeIsFired = createEvent<boolean>('Change is fired');

// Stores

const employee = createStore<IEmployee | null>(null)
    .on(setEmployee, (_, employee) => employee)
    .on(changeName, (state, name) => {
        if (state) {
            return { ...state, name };
        }

        return state;
    })
    .on(changePosition, (state, position) => {
        if (state) {
            return { ...state, position };
        }

        return state;
    })
    .on(changeBirthday, (state, birthday) => {
        if (state) {
            return { ...state, birthday };
        }

        return state;
    })
    .on(changeGender, (state, gender) => {
        if (state) {
            return { ...state, gender };
        }

        return state;
    })
    .on(changeIsFired, (state, isFired) => {
        if (state) {
            return { ...state, isFired };
        }

        return state;
    })
    .reset([resetEmployee, deleteEmployee]);

[changeName, changePosition, changeBirthday, changeGender, changeIsFired].forEach((event) => {
    employee.watch<string | undefined | boolean>(event, (state) => {
        if (state) {
            editEmployee(state);
        }
    });
});

// Exports

const employeeEvents = {
    setEmployee,
    resetEmployee,
    changeName,
    changePosition,
    changeBirthday,
    changeGender,
    changeIsFired
};

const employeeStores = {
    employee
};

export { employeeEvents, employeeStores };