//import _ from 'lodash';

import React from 'react';
import ReactDOM from 'react-dom';
//import styles
import 'weui';
import 'react-weui/build/packages/react-weui.css';
import './theme.less'
//项目
import { App } from "./app";


ReactDOM.render(
    <App />,
    document.getElementById('root')
);

// function component() {
//     let element = document.createElement('div');
//
//     // Lodash, currently included via a script, is required for this line to work
//     element.innerHTML = _.join(['Hello', 'webpack'], ' ');
//
//     return element;
// }
//
// document.body.appendChild(component());
