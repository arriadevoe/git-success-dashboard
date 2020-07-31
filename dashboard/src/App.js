import React, { useEffect, useState } from "react";
import { Layout, Spin } from "antd";

import Plot from "react-plotly.js";

import "./App.less";

const { Sider, Content } = Layout;

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});

  useEffect(() => {
    fetch(
      "http://0.0.0.0:5000/visualization/top10contributors/kubernetes/kubernetes",
      {
        method: "GET",
        headers: {
          Authorization: process.env.REACT_APP_GH_TOKEN,
        },
      }
    )
      .then((response) => response.json())
      .then((response) => {
        console.log("Success", response);
        setData(response);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  }, []);

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
          <Content>
            {isLoading ? 
              <Spin /> : 
              <Plot 
                data={[
                  {
                    x: data.user,
                    y: data.total_commits,
                    type: "scatter",
                    mode: "markers",
                    marker: {
                      size: 20, 
                      color: data.followers,showscale: true,
                    }
                  }
                ]}
                layout={
                  {
                    width: "100%",
                    title: "Top 10 All-Time Contributors",
                    xaxis: {
                      tickangle: 45
                    },
                    yaxis: {
                      title: "Total Commits"
                    }
                  }
                }
              />}
            </Content>
          <Sider>View6</Sider>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default App;
