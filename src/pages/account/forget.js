import React from 'react';
// react-intl 支持多语言
import {FormattedMessage} from 'react-intl'
// antd-layout
import { Layout} from 'antd';
const { Content } = Layout;
// antd-form, input, checkbox, button
import { Form, Input, Checkbox, Button } from 'antd';
// antd-alert
import { Alert } from 'antd';
// antd-modall
import { Modal } from 'antd';
// antd-icons
import { UserOutlined, LockOutlined, EyeInvisibleOutlined, EyeTwoTone, ExclamationCircleOutlined} from '@ant-design/icons';
// utils
import { isObjEmpty } from '../../utils/commonfns';
// axios
const axios = require('axios');

// 引入样式
import "./account.less";

export class Forget extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isAutoLogin: true,
            form: null,
            selected_lang_obj: props.lang,
            // 注册对话框
            dialog_register_visible: false,
            dialog_register_loading: false,
        };
    };

    /**
     * 接收到属性更新后
     */
    static getDerivedStateFromProps(props, state){
        let res = {};
        // update isLogin
        if (state.selected_lang_obj != props.lang){
            res.selected_lang_obj = props.lang;
        }
        // tell React to update (if res is empty, we return null to stop update)
        return isObjEmpty(res) ? null :res;
    };

    //---------------------------------------------
    /**
     * 表单创建完成
     */
    formDidCreate = (instance) => {
        this.state.form = instance;
    };
    /**
     * 表单回调 
     */
    formOnFinish = (values) =>{
        console.log(values);
        this.openDialogRegister();
    };
    /**
     * 再次输入密码的校验
     */
    formRepwdValidate = async (rule, value) => {
        if (value != this.state.form.getFieldValue("pwd")){
            throw new Error(this.state.selected_lang_obj.register_pwd_again_hnt_wrong);
        }
    }
    /**
     * 安全问题答案校验
     */
    formAnswerValidate = async (rule, value) =>{
        let question = this.state.form.getFieldValue("question");
        if (question == undefined || question == null){
            question = "";
        }
        question = question.trim();
        let answer = value;
        if (value == undefined || value == null){
            answer = "";
        }
        answer = answer.trim();
        if (question != "" && answer == ""){
            throw new Error(this.state.selected_lang_obj.register_answer_hint);
        }
    }
    //---------------------------------------------


    //---------------------------------------------
    /**
     * 打开模态对话框
     */
    openDialogRegister = () =>{
        this.setState({
            dialog_register_visible: true
        });
    }
    /**
     * 确认模态对话
     */
    confirmDialogRegister = () => {
        this.setState({
            dialog_register_loading: true,
        });
        setTimeout(() => {
            this.setState({
                dialog_register_visible: false,
                dialog_register_loading: false
            });
        }, 2000);
      };
    /**
     * 取消模态对话框
     */
    cancelDialogRegister = () => {
        this.setState({
            dialog_register_visible: false
        });
    }
    //---------------------------------------------
    
    render(){
        return(
            <Content className='account-container'>
                <Form className="Form" layout="vertical" name="login" onFinish={this.formOnFinish} ref={this.formDidCreate}>
                    <p className='Title'><b><FormattedMessage id="register_name"/></b></p>
                    <Form.Item
                        label={ <FormattedMessage id="register_email"/>}
                        name="email"
                        rules={[
                            { required: true, message: this.state.selected_lang_obj.register_email_hint_empyty },
                            { pattern: /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/, warningOnly:true, message: this.state.selected_lang_obj.register_email_hint_wrong}
                        ]}
                    >
                        <Input size="large" prefix={<UserOutlined />} />
                    </Form.Item>
                    <Form.Item
                        label={ <FormattedMessage id="register_pwd"/>}
                        name="pwd"
                        rules={[{ required: true, message: this.state.selected_lang_obj.register_pwd_hnt }]}
                    >
                        <Input.Password size="large" prefix={<LockOutlined />} iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}/>
                    </Form.Item>
                    <Form.Item
                        label={ <FormattedMessage id="register_pwd_again"/>}
                        name="repwd"
                        validateFirst={true}
                        rules={[
                            {
                                required: true,
                                message: this.state.selected_lang_obj.register_pwd_again_hnt_empty,
                            },
                            {
                                validator: this.formRepwdValidate
                            }
                        ]}
                    >
                        <Input.Password size="large" prefix={<LockOutlined />} iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}/>
                    </Form.Item>
                    <Form.Item
                        label={ <FormattedMessage id="register_question"/>}
                        name="question"
                        rules={[{ warningOnly:true, required: true, message: this.state.selected_lang_obj.register_question_hint }]}
                    >
                        <Input size="large" />
                    </Form.Item>
                    <Form.Item
                        label={ <FormattedMessage id="register_answer"/>}
                        name="answer"
                        rules={[{validator: this.formAnswerValidate}]}
                    >
                        <Input size="large" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="Btn-Submit"><FormattedMessage id="register_btn"/></Button>
                    </Form.Item>
                </Form>
                <Modal
                    title={
                        <div className='Account-Register-Dialog-Title'>
                            <ExclamationCircleOutlined className='Icon' />
                            <FormattedMessage id="register_dialog_title"/>
                        </div>
                    }
                    visible={this.state.dialog_register_visible}
                    onOk={this.confirmDialogRegister}
                    confirmLoading={this.state.dialog_register_loading}
                    onCancel={this.cancelDialogRegister}
                    okText={<FormattedMessage id="register_dialog_btn_ok"/>}
                    cancelText={<FormattedMessage id="register_dialog_btn_no"/>}
                >
                    <p><FormattedMessage id="register_dialog_txt"/></p>
                </Modal>
            </Content>
        );
    }
}