import { Gender, Position } from 'constants/data';
import { createEvent, createStore } from 'effector';
import { IEmployee } from 'types/data';
import { employeesEvents, employeesEffects } from './employees';

const { editEmployee } = employeesEvents;
const { deleteEmployeeFx, editEmployeeFx } = employeesEffects;

// Events

const setEmployee = createEvent<IEmployee | null>('Set employee');
const saveEmployee = createEvent('Save employee');
const resetEmployee = createEvent('Reset employee');

const changeName = createEvent<string>('Change name');
const changePosition = createEvent<Position>('Change position');
const changeBirthday = createEvent<string>('Change birthday');
const changeGender = createEvent<Gender>('Change gender');
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
    .reset([resetEmployee, deleteEmployeeFx.done]);

[changeName, changePosition, changeBirthday, changeGender, changeIsFired].forEach((event) => {
    employee.watch<string | undefined | boolean>(event, (state) => {
        if (state) {
            editEmployee(state);
        }
    });
});

employee.watch(saveEmployee, (state) => {
    if (state) {
        editEmployeeFx(state);
    }
});

const changed = createStore<boolean>(false)
    .on([changeName, changePosition, changeBirthday, changeGender, changeIsFired], () => (true))
    .reset([setEmployee, resetEmployee, deleteEmployeeFx.done, editEmployeeFx.done]);

// Exports

const employeeEvents = {
    setEmployee,
    saveEmployee,
    resetEmployee,
    changeName,
    changePosition,
    changeBirthday,
    changeGender,
    changeIsFired
};

const employeeStores = {
    employee,
    changed
};

export { employeeEvents, employeeStores };