import React, { useEffect, useState } from "react";

import { Layout, Spin, Empty, Menu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";

import Top10ContributorsPlot from "./Top10ContributorsPlot";
import YearlyCommitActivityPlot from "./YearlyCommitActivityPlot";

const { Content } = Layout;

const Visualization = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});

  useEffect(() => {
    fetch(
      `http://0.0.0.0:5000/visualization/${props.visualization}/${props.repo}`,
      {
        method: "GET",
        headers: {
          Authorization: process.env.REACT_APP_GH_TOKEN,
        },
      }
    )
      .then((response) => response.json())
      .then((response) => {
        response = JSON.parse(response)
        console.log("Success", response);
        setData(response);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  }, []);

  const chooseVisualization = ({ key }) => {
    console.log(`Click on item ${key}`);
  };

  const menu = (
    <Menu onClick={chooseVisualization}>
      <Menu.Item key="1">Top 10 All-Time Contributors</Menu.Item>
      <Menu.Item key="2">2nd menu item</Menu.Item>
    </Menu>
  );

  let content = <Empty description="No Visualization Loaded" />;

  if (isLoading) {
    content = <Spin />;
  } else if (props.visualization === "top-10-contributors") {
    content = <Top10ContributorsPlot data={data} repo={props.repo} />;
  } else if (props.visualization === "yearly-commit-activity") {
    content = <YearlyCommitActivityPlot data={data} repo={props.repo} />;
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
