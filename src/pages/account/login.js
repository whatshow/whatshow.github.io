import React from 'react';
// react-link
import { Link } from 'react-router-dom';
// react-intl 支持多语言
import {FormattedMessage} from 'react-intl'
// antd-layout
import { Layout} from 'antd';
const { Content } = Layout;
// antd-form, input, checkbox, button
import { Form, Input, Checkbox, Button } from 'antd';
// antd-icons
import { UserOutlined, LockOutlined, EyeInvisibleOutlined, EyeTwoTone, ConsoleSqlOutlined } from '@ant-design/icons';
// utils
import { isObjEmpty } from '../../utils/commonfns';
// axios
const axios = require('axios');

// 引入样式
import "./account.less";

export class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isAutoLogin: true,
            selected_lang_obj: props.lang
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

    /**
     * 表单回调 
     */
    formOnFinish = (values) =>{
        console.log(values);
    };

    render(){
        return(
            <Content className='account-container'>
                <Form className="Form" layout="vertical" name="login" initialValues={{ remember: true }} onFinish={this.formOnFinish}>
                    <p className='Title'><b><FormattedMessage id="login_name"/></b></p>
                    <Form.Item
                        label={ <FormattedMessage id="login_email"/>}
                        name="email"
                        rules={[{ required: true, message: this.state.selected_lang_obj.login_email_hint }]}
                    >
                        <Input size="large" prefix={<UserOutlined />} />
                    </Form.Item>
                    <Form.Item
                        label={ <FormattedMessage id="login_pwd"/>}
                        name="pwd"
                        rules={[{ required: true, message: this.state.selected_lang_obj.login_pwd_hnt }]}
                    >
                        <Input.Password size="large" prefix={<LockOutlined />} iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}/>
                    </Form.Item>
                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox><FormattedMessage id="login_keep"/></Checkbox>
                        </Form.Item>
                        <Link className="ForgetPwd" to="/forget"><FormattedMessage id="login_forget_pwd"/></Link>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="Btn-Submit"><FormattedMessage id="login_btn"/></Button>
                    </Form.Item>
                </Form>
            </Content>
        );
    }
}