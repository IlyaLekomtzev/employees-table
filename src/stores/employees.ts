import { notification } from 'antd';
import axios from 'axios';
import { apiUrl } from 'constants/api';
import {
    errorEmployeeAdded,
    errorEmployeeDeleted,
    errorEmployeeSaved,
    errorTitle,
    successEmployeeAdded,
    successEmployeeDeleted,
    successEmployeeSaved,
    successTitle
} from 'constants/data';
import { createEffect, createEvent, createStore } from 'effector';
import connectLocalStorage from 'effector-localstorage/sync';
import { IEmployee, IEmployeeRequest } from 'types/data';

// Local storage connection

const employeesLocalStorage = connectLocalStorage('employees')
  .onError((error) => console.log(error));

// Events

const editEmployee = createEvent<IEmployee>('Edit employee');

// Effects

const getEmployeesFx = createEffect({
    handler: async () => {
        const { data } = await axios.get<IEmployee[]>(apiUrl);
        return data;
    }
});

const addEmployeeFx = createEffect({
    handler: async (employee: IEmployeeRequest) => {
        const { data } = await axios.post<IEmployee>(apiUrl, employee);
        return data;
    }
});

const editEmployeeFx = createEffect({
    handler: async (employee: IEmployee) => {
        const { data } = await axios.put<IEmployee>(`${apiUrl}/${employee.key}`, employee);
        return data;
    }
});

const deleteEmployeeFx = createEffect({
    handler: async (id: string) => {
        const { data } = await axios.delete<IEmployee>(`${apiUrl}/${id}`);
        return data;
    }
});

// Stores

const employees = createStore<IEmployee[]>(employeesLocalStorage.init([]))
    .on(getEmployeesFx.doneData, (_, payload) => payload)
    .on(addEmployeeFx.doneData, (state, payload) => [
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
    .on(deleteEmployeeFx.doneData, (state, payload) => state.filter((item) => item.key !== payload.key));

employees.watch(employeesLocalStorage);

// Notifications

addEmployeeFx.done.watch(() => {
    notification.open({
        message: successTitle,
        description: successEmployeeAdded
    });
});

addEmployeeFx.fail.watch(() => {
    notification.open({
        message: errorTitle,
        description: errorEmployeeAdded
    });
});

editEmployeeFx.done.watch(() => {
    notification.open({
        message: successTitle,
        description: successEmployeeSaved
    });
});

editEmployeeFx.fail.watch(() => {
    notification.open({
        message: errorTitle,
        description: errorEmployeeSaved
    });
});

deleteEmployeeFx.done.watch(() => {
    notification.open({
        message: successTitle,
        description: successEmployeeDeleted
    });
});

deleteEmployeeFx.fail.watch(() => {
    notification.open({
        message: errorTitle,
        description: errorEmployeeDeleted
    });
});

// Exports

const employeesEffects = {
    getEmployeesFx,
    addEmployeeFx,
    editEmployeeFx,
    deleteEmployeeFx
};

const employeesEvents = {
    editEmployee
};

const employeesStores = {
    employees
};

export { employeesEffects, employeesEvents, employeesStores };