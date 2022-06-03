import { createEvent, createStore } from 'effector';
import connectLocalStorage from 'effector-localstorage/sync';
import { IEmployee } from 'types/data';

// Local storage connection

const employeesLocalStorage = connectLocalStorage('employees')
  .onError((error) => console.log(error));

// Events

const addEmployee = createEvent<IEmployee>('Add employee');
const editEmployee = createEvent<IEmployee>('Edit employee');
const deleteEmployee = createEvent<string>('Delete employee');

// Stores

const employees = createStore<IEmployee[]>(employeesLocalStorage.init([]))
    .on(addEmployee, (state, payload) => [
        ...state,
        payload
    ])
    .on(editEmployee, (state, payload) => {
        const index = state.findIndex((item) => item.key === payload.key);

        if (index !== -1) {
            const newState = [...state];
            newState[index] = payload;
            return newState;
        }

        return state;
    })
    .on(deleteEmployee, (state, key) => state.filter((item) => item.key !== key));

employees.watch(employeesLocalStorage);

// Exports

const employeesEvents = {
    addEmployee,
    editEmployee,
    deleteEmployee
};

const employeesStores = {
    employees
};

export { employeesEvents, employeesStores };