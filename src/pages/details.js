import React from 'react';
import { browserHistory, Link } from 'react-router-dom';
import { Article } from "react-weui"

//引入组件
import { Drawer } from '../components/drawer';

export class Details extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            title: null,
            subtitles: [],
            content: [],
            scratch: [],
            audios: []
        };
    }

    componentWillMount(){
        //当前传递过来的状态
        let param = this.getUrlParms("param");
        if(param){
            param = JSON.parse(param);
            if(param && param.question){
                this.state.title = param.question;
            }
            if(param && param.subquestions){
                for(let i = 0; i < param.subquestions.length; i++){
                    this.state.subtitles.push(<h6 key={`details-subtitle${i}`} style={{fontStyle:"italic"}}>{param.subquestions[i]}</h6>)
                }
            }
            if(param && param.answers){
                for(let i = 0; i < param.answers.length; i++){
                    this.state.content.push(<p key={`details-answers${i}`} className="LeftMarginButNotTheFirst">{param.answers[i]}</p>);
                }
            }
            if(param && param.scratch && param.scratch.length > 0){
                for(let i = 0; i < param.scratch.length; i++){
                    this.state.scratch.push(<p>{ param.scratch[i] }</p>);
                }
            }
            if(param && param.voices){
                for(let i =0; i < param.voices.length; i++){
                    this.state.audios.push(
                        <div>
                            { i + 1 }.
                            <audio src={param.voices[i]} controls="controls"/>
                        </div>
                    );
                }
            }
        }
        this.forceUpdate();

        //console.log(this.props.location.state)
    }

    render(){
        let tab = this.getUrlParms("tab");
        return (
            <div>
                <Link to={`/?tab=${tab}`} className="navbar-back">返回</Link>
                <Article>
                    <h3 style={{backgroundColor: "#FFFF00"}}>{ this.state.title }</h3>
                    <hr/>
                    { this.state.subtitles }
                    <hr/>
                    <Drawer title="大纲" >
                        { this.state.scratch }
                    </Drawer>
                    <Drawer title="详细全文" defaultCollapsed={(tab == 2)}>
                        { this.state.content }
                    </Drawer>
                    <Drawer title="音频" >
                        { this.state.audios }
                    </Drawer>
                </Article>
            </div>
        );
    }

    /**
     * 获取url参数
     * @name 参数名
     */
    getUrlParms(name){
        let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
        let r = window.location.search.substr(1).match(reg);
        if(r!=null){
            return unescape(r[2]);
        }else{
            return null;
        }
    }
}