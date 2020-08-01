import React, { useEffect, useState } from "react";
import { Layout, Spin, Empty } from "antd";

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

  return (
    <Layout className="screen">
      <Sider className="side-menu">
        <Content className="content">View1</Content>
        <Content className="content">View2</Content>
        <Content className="content">View3</Content>
      </Sider>
      <Layout>
        <Content className="content">
          <Empty description="No Visualization Loaded" />
        </Content>
        <Content className="content">
          <Empty description="No Visualization Loaded" />
        </Content>
      </Layout>
      <Layout>
        <Layout>
          <Content className="content">
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
        <Sider className="side-menu">
          <Content className="content">View7</Content>
          <Content className="content">View8</Content>
          <Content className="content">View9</Content>
        </Sider>
      </Layout>
    </Layout>
  );
};

export default App;
