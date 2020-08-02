import React, { useEffect, useState } from "react";
import { Layout, Spin } from "antd";

import Visualization from "./components/Visualization";

import "./App.less";

const { Sider, Content } = Layout;

const App = () => {
  return (
    <Layout className="screen">
      <Sider className="side-menu">
        <Content className="menu-item">Owner</Content>
        <Content className="menu-item">Repository</Content>
        <Content className="menu-item">Search</Content>
      </Sider>
      <Layout>
        <Content className="content">
          <Visualization name="top10contributors" />
        </Content>
        <Content className="content">
          <Visualization name="top10contributors" />
        </Content>
      </Layout>
      <Layout>
        <Layout>
          <Content className="content">
            <Visualization name="top10contributors" />
          </Content>
          <Content className="content">
            <Visualization name="top10contributors" />
          </Content>
        </Layout>
        <Sider className="side-menu">
          <Content className="menu-item">Owner</Content>
          <Content className="menu-item">Repository</Content>
          <Content className="menu-item">Search</Content>
        </Sider>
      </Layout>
    </Layout>
  );
};

export default App;
