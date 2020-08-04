import React, { useEffect, useState } from "react";

import { Layout, Spin } from "antd";

import Visualization from "./components/Visualization";

import "./App.less";

const { Sider, Content } = Layout;

const App = () => {
  const [leftRepository, setLeftRepository] = useState("kubernetes/kubernetes");
  const [rightRepository, setrightRepository] = useState("apache/spark");
  const [leftSummaryData, setLeftSummaryData] = useState({});
  const [rightSummaryData, setRightSummaryData] = useState({});
  const [loadingLeftSummary, setLoadingLeftSummary] = useState(true);
  const [loadingRightSummary, setLoadingRightSummary] = useState(true);
  const [leftVisualization1, setLeftVisualization1] = useState(
    "top-10-contributors"
  );
  const [leftVisualization2, setLeftVisualization2] = useState(
    "top-10-contributors"
  );
  const [rightVisualization1, setRightVisualization1] = useState(
    "top-10-contributors"
  );
  const [rightVisualization2, setRightVisualization2] = useState(
    "top-10-contributors"
  );

  useEffect(() => {
    fetch(`http://0.0.0.0:5000/repo-summary/${leftRepository}`, {
      method: "GET",
      headers: {
        Authorization: process.env.REACT_APP_GH_TOKEN,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        console.log("Success", response);
        setLeftSummaryData(response);
        setLoadingLeftSummary(false);
      })
      .catch((err) => {
        console.log("Error:", err);
      });

    fetch(`http://0.0.0.0:5000/repo-summary/${rightRepository}`, {
      method: "GET",
      headers: {
        Authorization: process.env.REACT_APP_GH_TOKEN,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        console.log("Success", response);
        setRightSummaryData(response);
        setLoadingRightSummary(false);
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  }, []);

  // useEffect(() => {

  // }, [leftRepository, rightRepository])

  return (
    <Layout className="screen">
      <Sider className="side-panels">
        <Content className="owner-panel">
          {loadingLeftSummary ? <Spin /> : JSON.stringify(leftSummaryData[0])}
        </Content>
        <Content className="repo-panel">
          {loadingLeftSummary ? <Spin /> : JSON.stringify(leftSummaryData[1])}
        </Content>
        <Content className="search-panel">Search</Content>
      </Sider>
      <Layout>
        <Content className="content">
          <Visualization
            visualization={leftVisualization1}
            repo={leftRepository}
          />
        </Content>
        <Content className="content">
          <Visualization
            visualization={leftVisualization2}
            repo={leftRepository}
          />
        </Content>
      </Layout>
      <Layout>
        <Layout>
          <Content className="content">
            <Visualization
              visualization={rightVisualization1}
              repo={rightRepository}
            />
          </Content>
          <Content className="content">
            <Visualization
              visualization={rightVisualization2}
              repo={rightRepository}
            />
          </Content>
        </Layout>
        <Sider className="side-panels">
          <Content className="owner-panel">
            {loadingRightSummary ? (
              <Spin />
            ) : (
              JSON.stringify(rightSummaryData[0])
            )}
          </Content>
          <Content className="repo-panel">
            {loadingRightSummary ? (
              <Spin />
            ) : (
              JSON.stringify(rightSummaryData[1])
            )}
          </Content>
          <Content className="search-panel">Search</Content>
        </Sider>
      </Layout>
    </Layout>
  );
};

export default App;
