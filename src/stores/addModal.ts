import { createEvent, createStore } from 'effector';

// Events

const setIsModalVisible = createEvent<boolean>('Set is visible add modal');

// Stores

const modalVisible = createStore<boolean>(false)
    .on(setIsModalVisible, (_, payload) => payload);

// Exports

const addModalEvents = {
    setIsModalVisible
};

const addModalStores = {
    modalVisible
};

export { addModalEvents, addModalStores };