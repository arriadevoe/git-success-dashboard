import React from "react";

import { Layout, Spin } from "antd";

import "./RepositoryPanel.less"

const { Content } = Layout;

const RepositoryPanel = (props) => {
  return (
    <Content className="repo-panel">
      {props.isLoading ? (
        <Spin />
      ) : (
        <>
          <p>{"Repository"}</p>
          <p>{props.summaryData[1].full_name}</p>
          <p>{props.summaryData[1].description}</p>
          <p>{`Last Updated: ${props.summaryData[1].updated}`}</p>
          {/* homepage_url */}
          {/* languages_url */}
          <p>{`Watchers: ${props.summaryData[1].watchers}`}</p>
          <p>{`Stars: ${props.summaryData[1].stars}`}</p>
          <p>{`Forks: ${props.summaryData[1].forks}`}</p>
          <p>{`Contributors: ${props.summaryData[1].contributors}`}</p>
          <p>{`Total Commits: ${props.summaryData[1].total_commits}`}</p>
          <p>{`Open Pull Requests: ${props.summaryData[1].open_pull_requests}`}</p>
        </>
      )}
    </Content>
  );
};

export default RepositoryPanel;
