import { FC } from 'react';
import { Layout, Button, Space } from 'antd';
import { Children } from 'types/react';
import { useStore } from 'effector-react';
import { employeeStores, employeeEvents } from 'stores/selectedEmployee';
import { employeesEffects } from 'stores/employees';
import { addModalEvents } from 'stores/addModal';
import AddModal from 'components/AddModal';

const { employee, changed } = employeeStores;
const { resetEmployee, saveEmployee } = employeeEvents;
const { deleteEmployeeFx, editEmployeeFx } = employeesEffects;
const { setIsModalVisible } = addModalEvents;

const { Header, Content  } = Layout;

interface Props extends Children {}

const MainLayout: FC<Props> = ({ children }) => {
    const selectEmployee = useStore(employee);
    const isChanged = useStore(changed);
    const isDeleteLoading = useStore(deleteEmployeeFx.pending);
    const isSaveLoading = useStore(editEmployeeFx.pending);

    const handleDelete = () => {
        if (selectEmployee) {
            deleteEmployeeFx(selectEmployee.key);
        }
    };

    const handleUnselect = () => {
        resetEmployee();
    };

    const handleSave = () => {
        saveEmployee();
    };

    return (
        <>
            <Header>
                <Space>
                    <Button
                        type="primary"
                        size="large"
                        danger
                        onClick={handleDelete}
                        disabled={selectEmployee === null}
                        loading={isDeleteLoading}
                    >
                        Delete
                    </Button>
                    <Button
                        type="primary"
                        size="large"
                        onClick={() => setIsModalVisible(true)}
                    >
                        Add
                    </Button>
                    <Button
                        type="primary"
                        size="large"
                        onClick={handleSave}
                        disabled={selectEmployee === null || !isChanged}
                        loading={isSaveLoading}
                    >
                        Save
                    </Button>
                    <Button
                        type="primary"
                        size="large"
                        onClick={handleUnselect}
                        disabled={selectEmployee === null}
                    >
                        Unselect
                    </Button>
                </Space>
            </Header>

            <Content style={{padding: '0 50px'}}>
                {children}
            </Content>

            <AddModal />
        </>
    );
};

export default MainLayout;
