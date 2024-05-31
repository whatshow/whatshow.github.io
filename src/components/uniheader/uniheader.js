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
import { DingdingOutlined, HomeFilled, DropboxOutlined } from '@ant-design/icons';
// utils
import { isObjEmpty } from '../../utils/commonfns';

// css
import "./uniheader.less";

export class UniHeader extends React.Component{
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
        return(
            <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                <div className="uni-header-logo">
                    <DingdingOutlined className='Image'/>
                    <span className='Txt'><FormattedMessage id="header_name"/></span>
                </div>
                <Menu className="uni-header-menu" theme="dark" mode="horizontal" selectedKeys={this.state.headerMenuSelectedIds} onClick={this.menuOnClick}>
                    <Menu.Item key="1">
                        <HomeFilled />
                        <span><FormattedMessage id="header_menu_1"/></span>
                        <Link to="/" />
                    </Menu.Item>
                    <Menu.Item key="2">
                        <DropboxOutlined />
                        <span><FormattedMessage id="header_menu_2"/></span>
                        <Link to="/demos" />
                    </Menu.Item>
                </Menu>
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