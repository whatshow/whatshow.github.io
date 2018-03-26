import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';

/*** 不同页面 ***/
import { Home, Details } from './ielts/pages';

export class App extends React.Component{
    /**
     * 构造方法
     */
    constructor(props){
        super(props);
    }
    /**
     * 构造前执行
     */
    componentWillMount(){
    }

    /**
     * 构造app
     */
    render(){
        return(
            <BrowserRouter>
                <div>
                    <Route exact path="/ielts" component={Home}/>
                    <Route path="/ielts/details" component={Details}/>
                </div>
            </BrowserRouter>
        );
    }
}