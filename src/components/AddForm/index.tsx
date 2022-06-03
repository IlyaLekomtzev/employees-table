import { Form, Input, Button, Checkbox, Select, DatePicker } from 'antd';
import moment from 'moment';
import { IEmployee } from 'types/data';
import { genderOptions, positionOptions } from 'constants/options';
import { employeesEvents } from 'stores/employees';
import { addModalEvents } from 'stores/addModal';
import { birthdayRules, dateFormat, nameRules, positionRules } from 'constants/forms';
import { initialFormValues } from './constants';

const { addEmployee } = employeesEvents;
const { setIsModalVisible } = addModalEvents;

const { Option } = Select;

const AddForm = () => {
    const [form] = Form.useForm();

    const onFinish = (values: Omit<IEmployee, 'key'>) => {
        addEmployee({
            key: Date.now().toString(),
            name: values.name,
            birthday: moment(values.birthday).format(dateFormat),
            position: values.position,
            isFired: values.isFired,
            gender: values.gender
        });
        setIsModalVisible(false);
        form.resetFields();
    };

    return (
        <Form
            name="add-form"
            form={form}
            initialValues={initialFormValues}
            onFinish={onFinish}
            autoComplete="off"
            layout="vertical"
        >
            <Form.Item
                name="name"
                label="Username"
                rules={nameRules}
            >
                <Input />
            </Form.Item>

            <Form.Item
                name="position"
                label="Position"
                rules={positionRules}
            >
                <Select
                    placeholder="Select a position"
                >
                    {positionOptions.map((option) => (
                        <Option key={option} value={option}>{option}</Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item
                name="birthday"
                label="Birthday"
                rules={birthdayRules}
            >
                <DatePicker
                    format={dateFormat}
                    style={{ width: '100%' }}
                />
            </Form.Item>

            <Form.Item
                name="gender"
                label="Gender"
            >
                <Select
                    placeholder="Select a gender"
                >
                    {genderOptions.map(({ label, value }) => (
                        <Option key={value} value={value}>{label}</Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item name="isFired" valuePropName="checked">
                <Checkbox>Fired?</Checkbox>
            </Form.Item>

            <Button
                type="primary"
                htmlType="submit"
            >
                Save
            </Button>
        </Form>
    );
};

export default AddForm;
