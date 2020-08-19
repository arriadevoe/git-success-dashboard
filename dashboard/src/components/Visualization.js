import React, { useEffect, useState } from "react";

import { Layout, Spin, Empty, Menu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";

import Top10ContributorsPlot from "./Top10ContributorsPlot";
import YearlyCommitActivityPlot from "./YearlyCommitActivityPlot";
import YearlyCodeFrequencyPlot from "./YearlyCodeFrequencyPlot";

const { Content } = Layout;

const Visualization = (props) => {
  const [currentVisualization, setCurrentVisualization] = useState(props.defaultVisualization);
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

    switch(key) {
      case "1":
        setCurrentVisualization("top-10-contributors");
      case "2":
        console.log(key)
        setCurrentVisualization("yearly-commit-activity");
        break;
      case "3":
        setCurrentVisualization("yearly-code-frequency");
      case "4":
        setCurrentVisualization("daily-commits");
    }    
  };

  const menu = (
    <Menu onClick={chooseVisualization}>
      <Menu.Item key="1">Top 10 All-Time Contributors</Menu.Item>
      <Menu.Item key="2">Yearly Commit Activity</Menu.Item>
      <Menu.Item key="3">Yearly Code Frequency</Menu.Item>
      <Menu.Item key="4">Daily Commits</Menu.Item>
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
    content = <YearlyCodeFrequencyPlot data={data} repo={props.repo} />;
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
