import React from "react";
import { Layout } from "antd";
import "./App.less";

const { Sider, Content } = Layout;

const App = () => {
  return (
    <Layout className="screen">
      <Sider>
        <Content>View1</Content>
        <Content>View2</Content>
        <Content>View3</Content>
      </Sider>
      <Layout>
        <Content>View4</Content>
        <Layout>
          <Content>View5</Content>
          <Sider>View6</Sider>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default App;
