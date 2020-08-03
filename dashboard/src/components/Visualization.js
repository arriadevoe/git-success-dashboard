import React, { useEffect, useState } from "react";
import { Layout, Spin, Empty, Menu, Dropdown } from "antd";
import { DownOutlined } from "@ant-design/icons";

const { Content } = Layout;

const Visualization = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({});



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
      content = <Spin />
  } else if (data) {
      content = <Spin />
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
