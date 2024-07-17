import './flow.scss'
import React from "react";
import { ReactFlowProvider } from 'react-flow-renderer';
import FlowSider from "./FlowSider";
import FlowCanvas from './FlowCanvas'
import Modal from './Modal'
export default () => {

    return (
      <div className="page-container">
        <h1>react flow</h1>
        <ReactFlowProvider>
            <div className="main">
                <FlowSider />
                <FlowCanvas />
            </div>  
            <Modal />
        </ReactFlowProvider>
      </div>
    );
  }