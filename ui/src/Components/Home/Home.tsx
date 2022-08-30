import React from "react";
import "./Home.css";
import logo from "../../rab_logo.png";
import { Layout, Menu } from "antd";
import type { MenuProps } from "antd";
import Landing from "./Landing";
import { GlobalOutlined, HomeOutlined, UserOutlined } from "@ant-design/icons";
import Population from "../Population/Population";
import Movements from "../Movements/Movements";
const { Header, Content } = Layout;

interface HomeState {
	selected_tab: string;
}
interface HomeProps {}
export default class Home extends React.Component<HomeProps, HomeState> {
	constructor(props: HomeProps) {
		super(props);
		this.state = {
			selected_tab: "",
		};
	}
	onTabChange: MenuProps["onClick"] = (e) => {
		this.setState({
			selected_tab: e.key,
		});
	};
	render(): React.ReactNode {
		let renderTab = <Landing />;
		switch (this.state.selected_tab) {
			case "population":
				renderTab = <Population />;
				break;
			case "movements":
				renderTab = <Movements />;
		}
		return (
			<Layout style={{ maxHeight: "1000px" }}>
				<Header
					style={{
						position: "fixed",
						zIndex: 1,
						width: "100%",
						backgroundColor: "#f7f7f7",
						float: "left",
					}}>
					<div className="logo">
						<img src={logo} style={{ width: "100px", height: "50px" }} alt="logo"></img>
					</div>

					<Menu theme="light" mode="horizontal" style={{ backgroundColor: "#f7f7f7" }} defaultSelectedKeys={["home"]} onClick={this.onTabChange}>
						<Menu.Item key="home" style={{ float: "left" }} icon={<HomeOutlined />}>
							Home
						</Menu.Item>
						<Menu.Item style={{ float: "left" }} key="population" icon={<UserOutlined />}>
							Population
						</Menu.Item>
						<Menu.Item key="movements" style={{ float: "left" }} icon={<GlobalOutlined />}>
							Movements
						</Menu.Item>
					</Menu>
				</Header>
				<Content style={{ margin: "0 16px", marginTop: "120px" }}>{renderTab}</Content>
			</Layout>
		);
	}
}
