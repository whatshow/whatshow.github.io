import React from 'react';
// react-intl 支持多语言
import {FormattedMessage} from 'react-intl'
// antd-layout
import { Layout} from 'antd';
const { Content } = Layout;

// components
import { UniFooter } from "../../components/unifooter/unifooter";

// 引入样式
import "./main.less";

export class Main extends React.Component{
    render(){
        return(
            <>
                <Content className='page-main-background'>
                    <div className='page-main-container'>
                        <div className='Left'>
                            <img className='Ava' src="img/avatar.jpeg"/>
                            <ul className='Intro'>
                                <li><h1><FormattedMessage id='main_intro_name'/></h1></li>
                                <li><h3 className='Titles'><FormattedMessage id='main_intro_title'/></h3></li>
                                <li><FormattedMessage id='main_intro'/><a href="mailto:wfwfpwefe2323@gmail.com">wfwfpwefe2323@gmail.com</a></li>
                            </ul>
                            <div className='Block'>

                            </div>
                        </div>
                        <div className='Right'>right</div>
                    </div>
                </Content>
                <UniFooter/>
            </>
        );
    }
}