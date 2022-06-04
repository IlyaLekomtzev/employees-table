import { ChangeEvent } from 'react';
import { Input, Checkbox, Select, DatePicker, Empty, Typography } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import moment, { Moment } from 'moment';
import { useStore } from 'effector-react';
import { employeeStores } from 'stores/selectedEmployee';
import { dateFormat } from 'constants/forms';
import { genderOptions, positionOptions } from 'constants/options';
import { employeeEvents } from 'stores/selectedEmployee';
import { Gender, Position } from 'constants/data';
import { EditFormWrapper, EditFormInner, FormItem } from './styles';

const { employee } = employeeStores;
const {
    changeName,
    changePosition,
    changeBirthday,
    changeGender,
    changeIsFired
} = employeeEvents;

const { Option } = Select;
const { Title } = Typography;

const EditForm = () => {
    const selectEmployee = useStore(employee);

    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        changeName(e.target.value);
    };

    const handlePositionChange = (value: Position) => {
        changePosition(value);
    };

    const handleDateChange = (_: Moment | null, date: string) => {
        if (date) {
            changeBirthday(date);
        }
    };

    const handleGenderChange = (value: Gender) => {
        changeGender(value);
    };

    const handleFiredChange = (e: CheckboxChangeEvent) => {
        changeIsFired(e.target.checked);
    };

    return (
        <EditFormWrapper>
            {selectEmployee ? (
                <EditFormInner>
                    <FormItem>
                        <Title level={3}>Edit employee</Title>
                    </FormItem>

                    <FormItem>
                        <Title level={5}>Username</Title>
                        <Input
                            value={selectEmployee.name}
                            onChange={handleNameChange}
                            minLength={1}
                        />
                    </FormItem>

                    <FormItem>
                        <Title level={5}>Position</Title>
                        <Select
                            placeholder="Select a position"
                            value={selectEmployee.position}
                            style={{ width: '100%' }}
                            onChange={handlePositionChange}
                        >
                            {positionOptions.map((option) => (
                                <Option key={option} value={option}>{option}</Option>
                            ))}
                        </Select>
                    </FormItem>

                    <FormItem>
                        <Title level={5}>Birthday</Title>
                        <DatePicker
                            format={dateFormat}
                            value={moment(selectEmployee.birthday, dateFormat)}
                            allowClear={false}
                            style={{ width: '100%' }}
                            onChange={handleDateChange}
                        />
                    </FormItem>

                    <FormItem>
                        <Title level={5}>Gender</Title>
                        <Select
                            placeholder="Select a gender"
                            value={selectEmployee.gender}
                            style={{ width: '100%' }}
                            onChange={handleGenderChange}
                        >
                            {genderOptions.map(({ label, value }) => (
                                <Option key={value} value={value}>{label}</Option>
                            ))}
                        </Select>
                    </FormItem>

                    <FormItem>
                        <Checkbox
                            checked={selectEmployee.isFired}
                            onChange={handleFiredChange}
                        >
                            Fired?
                        </Checkbox>
                    </FormItem>
                </EditFormInner>
            ) : (
                <Empty description="Employee not selected" />
            )}
        </EditFormWrapper>
    );
};

export default EditForm;