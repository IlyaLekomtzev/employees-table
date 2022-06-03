import { Modal } from 'antd';
import AddForm from 'components/AddForm';
import { useStore } from 'effector-react';
import { addModalStores, addModalEvents } from 'stores/addModal';

const { modalVisible } = addModalStores;
const { setIsModalVisible } = addModalEvents;

const AddModal = () => {
    const isModalVisible = useStore(modalVisible);

    return (
        <Modal
            title="Add employee"
            visible={isModalVisible}
            footer={null}
            centered
            onCancel={() => setIsModalVisible(false)}
        >
            <AddForm />
        </Modal>
    );
};

export default AddModal