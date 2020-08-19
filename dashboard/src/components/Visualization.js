import React, { useEffect, useState } from "react";

import { Layout, Spin, Empty, Menu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";

import Top10ContributorsPlot from "./Top10ContributorsPlot";
import YearlyCommitActivityPlot from "./YearlyCommitActivityPlot";
import YearlyCodeFrequencyPlot from "./YearlyCodeFrequencyPlot";
import DailyCommitsPlot from "./DailyCommitsPlot";
import IssueActivityPlot from "./IssueActivityPlot";
import IssueCommentsPlot from "./IssueCommentsPlot";

const { Content } = Layout;

const Visualization = (props) => {
  const [currentVisualization, setCurrentVisualization] = useState(
    props.defaultVisualization
  );
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});

  useEffect(() => {
    fetch(
      `http://0.0.0.0:5000/visualization/${currentVisualization}/${props.repo}`,
      {
        method: "GET",
        headers: {
          Authorization: process.env.REACT_APP_GH_TOKEN,
        },
      }
    )
      .then((response) => response.json())
      .then((response) => {
        response = JSON.parse(response);
        setData(response);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  }, [currentVisualization]);

  const chooseVisualization = ({ key }) => {
    setIsLoading(true);

    switch (key) {
      case "1":
        setCurrentVisualization("top-10-contributors");
        break
      case "2":
        setCurrentVisualization("yearly-commit-activity");
        break
      case "3":
        setCurrentVisualization("yearly-code-frequency");
        break
      case "4":
        setCurrentVisualization("daily-commits");
        break
      case "5":
        setCurrentVisualization("issue-activity");
        break
      case "6":
        setCurrentVisualization("issue-comments");
        break
    }
  };

  const menu = (
    <Menu onClick={chooseVisualization}>
      <Menu.Item key="1">Top 10 All-Time Contributors</Menu.Item>
      <Menu.Item key="2">Yearly Commit Activity</Menu.Item>
      <Menu.Item key="3">Yearly Code Frequency</Menu.Item>
      <Menu.Item key="4">Daily Commits</Menu.Item>
      <Menu.Item key="5">Issue Activity</Menu.Item>
      <Menu.Item key="6">Issue Comments</Menu.Item>
    </Menu>
  );

  let content = <Empty description="No Visualization Loaded" />;

  if (isLoading) {
    content = <Spin />;
  } else if (currentVisualization === "top-10-contributors") {
    content = <Top10ContributorsPlot data={data} repo={props.repo} />;
  } else if (currentVisualization === "yearly-commit-activity") {
    content = <YearlyCommitActivityPlot data={data} repo={props.repo} />;
  } else if (currentVisualization === "yearly-code-frequency") {
    content = <YearlyCodeFrequencyPlot data={data} repo={props.repo} />;
  } else if (currentVisualization === "daily-commits") {
    content = <DailyCommitsPlot data={data} repo={props.repo} />;
  } else if (currentVisualization === "issue-activity") {
    content = <IssueActivityPlot data={data} repo={props.repo} />;
  } else if (currentVisualization === "issue-comments") {
    content = <IssueCommentsPlot data={data} repo={props.repo} />;
  }

  return (
    <Content className="content">
      <Dropdown overlay={menu}>
        <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
          Choose Visualization <DownOutlined />
        </a>
      </Dropdown>
      {content}
    </Content>
  );
};

export default Visualization;
