import React, { useEffect, useState } from "react";

import { Layout, Spin, Avatar } from "antd";

import Visualization from "./components/Visualization";
import RepositoryPanel from "./components/RepositoryPanel";

import "./App.less";

const { Sider, Content } = Layout;

const defaultVisualization1 = "yearly-code-frequency";
const defaultVisualization2 = "yearly-commit-activity";

const App = () => {
  const [leftRepository, setLeftRepository] = useState("kubernetes/kubernetes");
  const [rightRepository, setRightRepository] = useState("apache/spark");
  const [leftSummaryData, setLeftSummaryData] = useState({});
  const [rightSummaryData, setRightSummaryData] = useState({});
  const [loadingLeftSummary, setLoadingLeftSummary] = useState(true);
  const [loadingRightSummary, setLoadingRightSummary] = useState(true);

  useEffect(() => {
    fetch(`http://0.0.0.0:5000/repo-summary/${leftRepository}`, {
      method: "GET",
      headers: {
        Authorization: process.env.REACT_APP_GH_TOKEN,
      },
    })
      .then((response) => response.json())
      .then((response) => {
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
        setRightSummaryData(response);
        setLoadingRightSummary(false);
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  }, []);

  return (
    <Layout className="screen">
      <Sider className="side-panels">
        <Content className="owner-panel">
          {loadingLeftSummary ? (
            <Spin />
          ) : (
            <>
              <p>{"Owner"}</p>
              <Avatar src={leftSummaryData[0].avatar_url} size="large" />
              {/* gh_url */}
              <p>{leftSummaryData[0].name}</p>
              <p>{leftSummaryData[0].login}</p>
            </>
          )}
        </Content>
        <RepositoryPanel isLoading={loadingLeftSummary} summaryData={leftSummaryData} />
        <Content className="search-panel">Search</Content>
      </Sider>
      <Layout>
        <Content className="content">
          <Visualization
            defaultVisualization={defaultVisualization1}
            repo={leftRepository}
          />
        </Content>
        <Content className="content">
          <Visualization
            defaultVisualization={defaultVisualization2}
            repo={leftRepository}
          />
        </Content>
      </Layout>
      <Layout>
        <Layout>
          <Content className="content">
            <Visualization
              defaultVisualization={defaultVisualization1}
              repo={rightRepository}
            />
          </Content>
          <Content className="content">
            <Visualization
              defaultVisualization={defaultVisualization2}
              repo={rightRepository}
            />
          </Content>
        </Layout>
        <Sider className="side-panels">
          <Content className="owner-panel">
            {loadingRightSummary ? (
              <Spin />
            ) : (
              <>
                <p>{"Owner"}</p>
                <Avatar src={rightSummaryData[0].avatar_url} size="large" />
                {/* gh_url */}
                <p>{rightSummaryData[0].name}</p>
                <p>{rightSummaryData[0].login}</p>
              </>
            )}
          </Content>
          <RepositoryPanel isLoading={loadingRightSummary} summaryData={rightSummaryData} />
          <Content className="search-panel">Search</Content>
        </Sider>
      </Layout>
    </Layout>
  );
};

export default App;
