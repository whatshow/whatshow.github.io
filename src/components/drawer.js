import React from 'react';
import styled from 'styled-components';

const DrawerContainer = styled.div`
    &{
        display:    block;
        width:  100%;
        margin-top: 20px;
    }
`;
const DrawerTitle = styled.div`// styled
  & {
    display:                  block;
    width:                    100%;
    height:                   40px;
    line-height:              40px;
    background:               #004A80;
    
    color:  #FFF;
    padding:    0 10px;
  }
`;
const DrawerIcon = styled.div`// styled
  & {
    float:  right;
    color:  #FFF;
    font-weight:    bold;
  }
`;
const DrawerContent = styled.div`// styled
  & {
    display:                  block;
    width:                    100%;
    border: 1px #004A80 solid;
    padding:    4px 8px;
  }
`;

export class Drawer extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            title:  props.title,
            collapsed: !!props.defaultCollapsed
        }
    }

    render() {
        let doit = false;
        if(this.props.children){
            if(this.isArray(this.props.children)){
                doit = this.props.children.length > 0;
            }else{
                doit = true;
            }
        }

        return (
            doit ?
                <DrawerContainer onClick={(e)=>{ this.setState({ collapsed: !this.state.collapsed }); }}>
                    {
                        this.props.children ? null : null
                    }
                    <DrawerTitle>
                        { this.state.title }
                        <DrawerIcon>{ this.state.collapsed ? '+' : '-' }</DrawerIcon>
                    </DrawerTitle>
                    {
                        this.state.collapsed ? null : <DrawerContent>{ this.props.children }</DrawerContent>
                    }
                </DrawerContainer>
                :
                null
        );
    }

    /**
     * 是否是数组
     */
    isArray(o){
        return Object.prototype.toString.call(o)=='[object Array]';
    };
}