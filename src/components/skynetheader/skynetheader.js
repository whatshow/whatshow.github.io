import React from 'react';
// react-link
import { Link } from 'react-router-dom';
// react-intl 支持多语言
import {FormattedMessage} from 'react-intl'
// antd
// antd-layout
import { Layout, Menu} from 'antd';
const { Header} = Layout;
// antd-icon
import { SkypeFilled, HomeFilled, AppstoreFilled, SettingFilled } from '@ant-design/icons';
// antd-button
import { Button } from 'antd';
// utils
import { isObjEmpty } from '../../utils/commonfns';

// css
import "./skynetheader.less";

export class SkyNetHeader extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isLogin: typeof(props.isLogin) == "undefined" || !props.isLogin ? false : props.isLogin,
            headerMenuSelectedIds: ["1"]
        };
    };
    
    static getDerivedStateFromProps(props, state){
        let res = {};
        // update isLogin
        if (state.isLogin != props.isLogin){
            res.isLogin = typeof(props.isLogin) == "undefined" || !props.isLogin ? false : props.isLogin
        }
        // tell React to update (if res is empty, we return null to stop update)
        return isObjEmpty(res) ? null :res;
    };


    render(){
        // add `center` & `account` if login
        let menuRestBtns = [];
        if (this.state.isLogin){
            menuRestBtns.push(
                <Menu.Item key="1">
                    <AppstoreFilled />
                    <span><FormattedMessage id="header_menu_center"/></span>
                    <Link to="/center" />
                </Menu.Item>
            );
            menuRestBtns.push(
                <Menu.Item key="2">
                    <SettingFilled />
                    <span><FormattedMessage id="header_menu_account"/></span>
                    <Link to="/account" />
                </Menu.Item>
            );
        }else{
            menuRestBtns.push(
                <Menu.Item key="1">
                    <HomeFilled />
                    <span><FormattedMessage id="header_menu_home"/></span>
                    <Link to="/" />
                </Menu.Item>
            );
        }


        // add login, register btn if not login
        let headerBtns = [];
        if (!this.state.isLogin){
            headerBtns.push(
                <li>
                    <Button type="text" className='skynetheader-btn' onClick={this.headerBtnOnClick}>
                        <FormattedMessage id="header_btn_login"/>
                        <Link to="/login"/>
                    </Button>
                </li>
            );
            headerBtns.push(
                <li>
                    <Button type="text" className='skynetheader-btn' onClick={this.headerBtnOnClick}>
                        <FormattedMessage id="header_btn_register"/>
                        <Link to="/register"/>
                    </Button>
                </li>
            );
        }

        return(
            <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                <div className="skynetheader-logo">
                    <SkypeFilled className='Image'/>
                    <span className='Txt'><FormattedMessage id="header_company_name"/></span>
                </div>
                <Menu className="skynetheader-menu" theme="dark" mode="horizontal" selectedKeys={this.state.headerMenuSelectedIds} onClick={this.menuOnClick}>
                    { menuRestBtns }
                </Menu>
                <ul className='skynetheader-btn-panel'>
                    { headerBtns }
                </ul>
            </Header>
        )
    };


    menuOnClick = ({ item, key, keyPath, domEvent }) =>{
        this.setState({
            headerMenuSelectedIds: [key]
        });
    }
    headerBtnOnClick = (event) => {
        this.setState({
            headerMenuSelectedIds: null
        });
    }
}