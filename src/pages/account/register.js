import React from 'react';
// react-intl 支持多语言
import {FormattedMessage} from 'react-intl'
// urls
import urls from '../../components/urls';
// antd
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

export class Register extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isAutoLogin: true,
            form: null,
            selected_lang_obj: props.lang,
            // 验证码
            verifyimage_loaded: false,
            verifyimage_src: urls.register_verifyimage,
            verifyimage_status: undefined,
            verifyimage_hint: null,
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
        // 如果验证码错误，提示
        let verifycode = this.state.form.getFieldValue("verifycode");
        this.setState({
            verifyimage_status: 'warning', //'success' 'warning' 'error' 'validating'
            verifyimage_hint: this.state.selected_lang_obj.register_verify_hint_wrong
        });        
        
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
    /**
     * 验证码图片加载完成
     */
    formVerifyCodeOnLoad = () => {
        this.setState({
            verifyimage_loaded: true
        });
    }
    /**
     * 验证码图片点击
     */
    formVerifyCodeOnClick = () => {
        // do nothing if image is still loading
        if (this.state.verifyimage_loaded == false){
            return;
        }
        this.setState({
            verifyimage_loaded: false,
            verifyimage_loaded: true,
            verifyimage_src: urls.register_verifyimage + "?" + String(Date.parse(new Date()))
        });
    }
    /**
     * 验证码校验
     */
    formVerifyCodeValidate = async (rule, value) =>{
        let verifycode = this.state.form.getFieldValue("verifycode");
        if (verifycode == undefined || verifycode == null || verifycode == ""){
            this.setState({
                verifyimage_status: 'error', //'success' 'warning' 'error' 'validating'
                verifyimage_hint: this.state.selected_lang_obj.register_verify_hint_empty
            });   
        }else{
            this.setState({
                verifyimage_status: 'success', //'success' 'warning' 'error' 'validating'
                verifyimage_hint: undefined
            });   
        }
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
                        extra={<><FormattedMessage id="register_email_declare_l1"/><br/><FormattedMessage id="register_email_declare_l2"/></>}
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
                        <Form.Item
                            className='Verify'
                            label={ <FormattedMessage id="register_verify"/>}
                            name="verifycode"
                            help={this.state.verifyimage_hint}
                            validateStatus={this.state.verifyimage_status}
                            rules={[{ validator:this.formVerifyCodeValidate }]}
                        >
                            <Input size="large" />
                        </Form.Item>
                        <img className="Verify-img" src={this.state.verifyimage_src} onLoad={this.formVerifyCodeOnLoad} onClick={this.formVerifyCodeOnClick}/>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="Btn-Submit"><FormattedMessage id="register_btn"/></Button>
                    </Form.Item>
                </Form>
            </Content>
        );
    }
}