import { Row, Col } from 'antd';
import MainLayout from './components/MainLayout';
import EmployeeTable from 'components/EmployeeTable';
import EditForm from 'components/EditForm';
import './App.css';

const App = () => {
    return (
        <MainLayout>
            <Row>
                <Col span={12}>
                    <EmployeeTable />
                </Col>
                <Col span={12}>
                    <EditForm />
                </Col>
            </Row>
        </MainLayout>
    );
};

export default App;
