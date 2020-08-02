import React, { useEffect, useState } from "react";
import { Layout, Spin, Empty, Menu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";

import Plot from "react-plotly.js";

import "./App.less";

const { Sider, Content } = Layout;

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({});

  // useEffect(() => {
  //   fetch(
  //     "http://0.0.0.0:5000/visualization/top10contributors/kubernetes/kubernetes",
  //     {
  //       method: "GET",
  //       headers: {
  //         Authorization: process.env.REACT_APP_GH_TOKEN,
  //       },
  //     }
  //   )
  //     .then((response) => response.json())
  //     .then((response) => {
  //       console.log("Success", response);
  //       setData(response);
  //       setIsLoading(false);
  //     })
  //     .catch((err) => {
  //       console.log("Error:", err);
  //     });
  // }, []);

  const chooseVisualization = ({ key }) => {
    console.log(`Click on item ${key}`);
  };

  const menu = (
    <Menu onClick={chooseVisualization}>
      <Menu.Item key="1">Top 10 All-Time Contributors</Menu.Item>
      <Menu.Item key="2">2nd memu item</Menu.Item>
    </Menu>
  );

  return (
    <Layout className="screen">
      <Sider className="side-menu">
        <Content className="menu-item">View1</Content>
        <Content className="menu-item">View2</Content>
        <Content className="menu-item">View3</Content>
      </Sider>
      <Layout>
        <Content className="content">
          <Dropdown overlay={menu}>
            <a
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
            >
              Choose Visualization <DownOutlined />
            </a>
          </Dropdown>
          {isLoading ? (
            <Spin />
          ) : (
            <Plot
              data={[
                {
                  x: data.user,
                  y: data.total_commits,
                  type: "scatter",
                  mode: "markers",
                  marker: {
                    size: 20,
                    color: data.followers,
                    showscale: true,
                  },
                },
              ]}
              layout={{
                width: "100%",
                title: "Top 10 All-Time Contributors",
                xaxis: {
                  tickangle: 45,
                },
                yaxis: {
                  title: "Total Commits",
                },
              }}
            />
          )}
        </Content>
        <Content className="content">
          <Empty description="No Visualization Loaded" />
        </Content>
      </Layout>
      <Layout>
        <Layout>
          <Content className="content">
            <Empty description="No Visualization Loaded" />
          </Content>
          <Content className="content">
            <Empty description="No Visualization Loaded" />
          </Content>
        </Layout>
        <Sider className="side-menu">
          <Content className="menu-item">View7</Content>
          <Content className="menu-item">View8</Content>
          <Content className="menu-item">View9</Content>
        </Sider>
      </Layout>
    </Layout>
  );
};

export default App;
