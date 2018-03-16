import React from 'react';
import { Link } from 'react-router-dom';
//引入数据
import { data } from '../data';

import { Tab,TabBody, NavBar, NavBarItem, Article } from 'react-weui';
import {
    Cells,
    CellsTitle,
    Cell,
    CellHeader,
    CellBody,
    CellFooter,
} from 'react-weui';
import { Radio } from 'react-weui';

export class Home extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            part1: [],
            part2: [],
            part3: [],
            tab:  1
        };
    }
    /**
     * 构造前执行
     */
    componentWillMount(){
        /*** 构造partI ***/
        //第一层循环
        for(let i = 0; i < data.part1.length; i++){
            //增加头部
            this.state.part1.push(<CellsTitle key={i}>{data.part1[i].category}</CellsTitle>);
            //增加子内容
            let contents = [];
            for(let j = 0; j < data.part1[i].contents.length; j++){
                //显示是否写了
                let isChecked = {};
                if(data.part1[i].contents[j].answers && data.part1[i].contents[j].answers.length > 0) {
                    isChecked = <CellFooter style={{color: "#00FF00"}}>完成</CellFooter>
                }else{
                    isChecked = <CellFooter style={{color: "#FF0000"}}>未完成</CellFooter>
                }
                contents.push(
                    <Link to={`/details?param=${JSON.stringify(data.part1[i].contents[j])}&&tab=1`} className="weui-cell weui-cell_access">
                        <CellBody>{ data.part1[i].contents[j].question}</CellBody>
                        { isChecked }
                    </Link>
                );
            }
            this.state.part1.push(<Cells>{ contents }</Cells>);
        }

        /*** 构造partII ***/
        //第一层循环
        for(let i = 0; i < data.part2.length; i++){
            //增加头部
            this.state.part2.push(<CellsTitle key={i}>{data.part2[i].category}</CellsTitle>);
            //增加子内容
            let contents = [];
            for(let j = 0; j < data.part2[i].contents.length; j++){
                //显示是否写了
                let isChecked = {};
                if(data.part2[i].contents[j].answers && data.part2[i].contents[j].answers.length > 0) {
                    isChecked = <CellFooter style={{color: "#00FF00"}}>完成</CellFooter>
                }else{
                    isChecked = <CellFooter style={{color: "#FF0000"}}>未完成</CellFooter>
                }
                //增加内容
                contents.push(
                    <Link to={`/details?param=${JSON.stringify(data.part2[i].contents[j])}&&tab=2`} className="weui-cell weui-cell_access">
                        <CellBody>{ data.part2[i].contents[j].question}</CellBody>
                        { isChecked }
                    </Link>
                );
            }
            this.state.part2.push(<Cells>{ contents }</Cells>);
        }

        //构造partIII

        //激活标签
        let tab = this.getUrlParms("tab");
        if(tab && tab !== "" && tab !== "null" && tab !== NaN){
            this.state.tab = parseInt(tab);
        }else{
            this.state.tab = 1;
        }

        //强制刷新
        this.forceUpdate();
    }

    render(){
        return (
            <Tab className="navbar">
                <NavBar>
                    <NavBarItem key="part1" label="Part I" active={this.state.tab === 1} onClick={e=>{e.preventDefault();this.setState({tab:1})}}/>
                    <NavBarItem key="part2" label="Part II" active={this.state.tab === 2} onClick={e=>{e.preventDefault();this.setState({tab:2})}}/>
                    <NavBarItem key="part3" label="Part III" active={this.state.tab === 3} onClick={e=>{e.preventDefault();this.setState({tab:3})}}/>
                </NavBar>
                <TabBody>
                    <Article className="NoPadding" style={{display: this.state.tab === 1 ? null : 'none'}}>
                        { this.state.part1 }
                    </Article>
                    <Article className="NoPadding" style={{display: this.state.tab === 2 ? null : 'none'}}>
                        { this.state.part2 }
                    </Article>
                    <Article className="NoPadding" style={{display: this.state.tab === 3 ? null : 'none'}}>
                        <h1>Page 3</h1>
                    </Article>
                </TabBody>
            </Tab>
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