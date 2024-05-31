import React from 'react';
// react-intl 支持多语言
import {FormattedMessage} from 'react-intl'
// antd-layout
import { Layout, Menu} from 'antd';
const { Sider, Content } = Layout;
// antd-icon
import { DockerOutlined } from '@ant-design/icons';
// demos
import { Demo01 } from './demo01';

// 引入样式
import "./demos.less";

export class Demos extends React.Component{
    render(){
        return(
            <>
                <Sider className="page-demos-sider">
                    <Menu mode="inline" defaultSelectedKeys={['1']} className="Menu">
                        <Menu.Item key="1">
                            <DockerOutlined />
                            <span><FormattedMessage id="demos_menu_01"/></span>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <div className='page-demos-content'>
                    <Demo01 />
                </div>
            </>
        );
    }
}