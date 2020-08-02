import React, { useEffect, useState } from "react";
import { Layout, Spin } from "antd";

import Visualization from "./components/Visualization";

import "./App.less";

const { Sider, Content } = Layout;

const App = () => {
  const [leftRepository, setLeftRepository] = useEffect()
  const [rightRepository, setrightRepository] = useEffect()

  return (
    <Layout className="screen">
      <Sider className="side-panel">
        <Content className="panel-item">Owner</Content>
        <Content className="panel-item">Repository</Content>
        <Content className="panel-item">Search</Content>
      </Sider>
      <Layout>
        <Content className="content">
          <Visualization repo={leftRepository} />
        </Content>
        <Content className="content">
          <Visualization repo={leftRepository} />
        </Content>
      </Layout>
      <Layout>
        <Layout>
          <Content className="content">
            <Visualization repo={rightRepository} />
          </Content>
          <Content className="content">
            <Visualization repo={rightRepository} />
          </Content>
        </Layout>
        <Sider className="side-panel">
          <Content className="panel-item">Owner</Content>
          <Content className="panel-item">Repository</Content>
          <Content className="panel-item">Search</Content>
        </Sider>
      </Layout>
    </Layout>
  );
};

export default App;
