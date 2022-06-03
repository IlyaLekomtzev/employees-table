import { useMemo } from 'react';
import { Table } from 'antd';
import { useStore } from 'effector-react';
import { employeeEvents, employeeStores } from 'stores/selectedEmployee';
import { employeesStores } from 'stores/employees';
import { genderLabels } from 'constants/data';
import { columns, defaultRowSelectionParams } from './constants';
import { TableData } from './types';
import { TableWrapper } from './styles';

const { setEmployee, resetEmployee } = employeeEvents;
const { employee } = employeeStores;
const { employees: employeesStore } = employeesStores;

const EmployeeTable = () => {
    const selectEmployee = useStore(employee);
    const employees = useStore(employeesStore);

    const items: TableData[] = useMemo(() => {
        return employees.map((item) => ({
            ...item,
            genderPrint: item.gender ? genderLabels[item.gender] : '-',
            positionPrint: item.position || '-',
            firedPrint: item.isFired ? 'Yes' : 'No',
        }));
    }, [employees]);

    const handleRowSelect = (item: TableData) => {
        if (item.key === selectEmployee?.key) {
            resetEmployee();
        } else {
            setEmployee({
                key: item.key,
                name: item.name,
                birthday: item.birthday,
                isFired: item.isFired,
                gender: item.gender,
                position: item.position
            });
        }
    };

    return (
        <TableWrapper>
            <Table
                rowSelection={{
                    ...defaultRowSelectionParams,
                    type: 'checkbox',
                    onSelect: handleRowSelect,
                    selectedRowKeys: selectEmployee ? [selectEmployee.key] : []
                }}
                columns={columns}
                dataSource={items}
                pagination={false}
                scroll={{ y: 'calc(100vh - 149px)' }}
                style={{ height: '100%' }}
                onRow={(record) => {
                    return {
                        onClick: () => handleRowSelect(record)
                    };
                }}
            />
        </TableWrapper>
    );
};

export default EmployeeTable;
