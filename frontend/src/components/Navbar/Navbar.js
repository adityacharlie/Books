import { PureComponent } from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import "./Navbar.css";
import { Link } from "react-router-dom";

const { Header, Content } = Layout;

class Navbar extends PureComponent {
  render() {
    return (
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
            <Menu.Item key="1">
              <Link to={`/`}>Home</Link>
            </Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: "0 50px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}></Breadcrumb>
        </Content>
      </Layout>
    );
  }
}

export default Navbar;
