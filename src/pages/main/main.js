import React from 'react';
// react-intl 支持多语言
import {FormattedMessage} from 'react-intl'
// antd-layout
import { Layout} from 'antd';
const { Content } = Layout;
// antd
// antd-走马灯
import { Carousel } from 'antd';
// antd-icon
import { SnippetsTwoTone, WarningTwoTone, ApiTwoTone, EditTwoTone, MailTwoTone, LockTwoTone } from '@ant-design/icons';

// components
import { SkyNetFooter } from "../../components/skynetfooter/skynetfooter";

// 引入样式
import "./main.less";

export class Main extends React.Component{
    render(){
        return(
            <>
                <Content className='page-main-background'>
                    <div className="page-main-container" style={{ minHeight: 380 }}>
                        <div className='Title'>
                            <FormattedMessage id="main_blogger_title"/>
                            <div className='Subtitle'>
                                <FormattedMessage id="main_blogger_subtitle"/>
                            </div>
                        </div>
                        <Carousel autoplay className='fuck'>
                            <div className='Carousel-Indicator'>
                                <div className='Image Image-1'/>
                            </div>
                            <div className='Carousel-Indicator'>
                                <div className='Image Image-2'/>
                            </div>
                            <div className='Carousel-Indicator'>
                                <div className='Image Image-3'/>
                            </div>
                            <div className='Carousel-Indicator'>
                                <div className='Image Image-4'/>
                            </div>
                            <div className='Carousel-Indicator'>
                                <div className='Image Image-5'/>
                            </div>
                        </Carousel>
                        {/* <iframe src="https://ourworldindata.org/grapher/total-cases-covid-19?tab=map" width="100%" height="600px"></iframe> */}
                        <div className='Title'>
                            <FormattedMessage id="main_destination_title"/>
                            <div className='Subtitle'>
                                <FormattedMessage id="main_destination_subtitle"/>
                            </div>
                        </div>
                        <ul className='Destinations'>
                            <li>
                            <div><FormattedMessage id="main_destination_ex_1"/></div>
                            </li>
                            <li>
                                <div><FormattedMessage id="main_destination_ex_2"/></div>
                            </li>
                            <li>
                                <div><FormattedMessage id="main_destination_ex_3"/></div>
                            </li>
                            <li>
                            <   div><FormattedMessage id="main_destination_ex_4"/></div>
                            </li>
                        </ul>
                        <div className='Title'>
                            <FormattedMessage id="main_service_title"/>
                            <div className='Subtitle'>
                                <FormattedMessage id="main_service_subtitle"/>
                            </div>
                        </div>
                        <div className='service-container'>
                            <ul>
                                <li>
                                    <p><SnippetsTwoTone/></p>
                                    <p><FormattedMessage id="main_service_1_name"/></p>
                                    <p><FormattedMessage id="main_service_1_intro"/></p>
                                </li>
                                <li>
                                    <p><WarningTwoTone/></p>
                                    <p><FormattedMessage id="main_service_2_name"/></p>
                                    <p><FormattedMessage id="main_service_2_intro"/></p>
                                </li>
                                <li>
                                    <p><ApiTwoTone/></p>
                                    <p><FormattedMessage id="main_service_3_name"/></p>
                                    <p><FormattedMessage id="main_service_3_intro"/></p>
                                </li>
                            </ul>
                            <ul>
                                <li>
                                    <p><EditTwoTone/></p>
                                    <p><FormattedMessage id="main_service_4_name"/></p>
                                    <p><FormattedMessage id="main_service_4_intro"/></p>
                                </li>
                                <li>
                                    <p><MailTwoTone /></p>
                                    <p><FormattedMessage id="main_service_5_name"/></p>
                                    <p><FormattedMessage id="main_service_5_intro"/></p>
                                </li>
                                <li>
                                    <p><LockTwoTone /></p>
                                    <p><FormattedMessage id="main_service_6_name"/></p>
                                    <p><FormattedMessage id="main_service_6_intro"/></p>
                                </li>
                            </ul>
                        </div>
                    </div>
                </Content>
                <SkyNetFooter/>
            </>
        );
    }
}