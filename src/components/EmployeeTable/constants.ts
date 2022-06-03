import type { ColumnsType } from 'antd/lib/table';
import { TableData } from './types';

export const columns: ColumnsType<TableData> = [
    {
        title: 'Name',
        dataIndex: 'name'
    },
    {
        title: 'Birthday',
        dataIndex: 'birthday'
    },
    {
        title: 'Gender',
        dataIndex: 'genderPrint'
    },
    {
        title: 'Position',
        dataIndex: 'positionPrint'
    },
    {
        title: 'Fired',
        dataIndex: 'firedPrint'
    }
];

export const defaultRowSelectionParams = {
    hideSelectAll: true
};