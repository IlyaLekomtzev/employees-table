import { FC } from 'react';
import { Layout, Button, Space } from 'antd';
import { Children } from 'types/react';
import { useStore } from 'effector-react';
import { employeeStores, employeeEvents } from 'stores/selectedEmployee';
import { employeesEvents } from 'stores/employees';
import { addModalEvents } from 'stores/addModal';
import AddModal from 'components/AddModal';

const { employee } = employeeStores;
const { resetEmployee } = employeeEvents;
const { deleteEmployee } = employeesEvents;
const { setIsModalVisible } = addModalEvents;

const { Header, Content  } = Layout;

interface Props extends Children {}

const MainLayout: FC<Props> = ({ children }) => {
    const selectEmployee = useStore(employee);

    const handleDelete = () => {
        if (selectEmployee) {
            deleteEmployee(selectEmployee.key);
        }
    };

    const handleUnselect = () => {
        resetEmployee();
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
