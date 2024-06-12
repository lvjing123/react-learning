import React from "react";
import "@/view/DragPage/RightPanel/RightPanel.scss"
import {Form, Input} from "antd";
import {counterActions, RootState, store} from "../../../store";
import {useSelector} from "react-redux";
import { setItemViewText } from '@/store/dragReducer'
import { useDispatch } from 'react-redux'


const CustomizedForm = ({onChange, fields}) => (
    <Form
        name="global_state"
        layout="inline"
        fields={fields}
        onFieldsChange={(_, allFields) => {
            onChange(allFields);
        }}>
        {fields.map((e, i) => (
            <Form.Item
                name={e.name}
                label={e.name}
                rules={[{required: true, message: '必填'}]}>
                <Input/>
            </Form.Item>
        ))}
    </Form>
);


export default function RightPanel (props){
    const state = useSelector((state) => state.drag)
    const dispatch = useDispatch()
    const onChange = (e) => {
        dispatch(setItemViewText({text: e.target.value, id: state.currentSelect.id}))
    }
    return (
        <div className={"right-panel"}>
            <div>文字：
                <Input style={{width: '80%'}}
                       placeholder="Flight name"
                       size="middle"
                       value={state.currentSelect.text}
                       onChange={onChange}
                />
            </div>
        </div>
    );
}