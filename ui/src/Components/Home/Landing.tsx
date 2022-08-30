import React from "react";
import { Divider, Result, Typography, Popconfirm, message, Button } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import logo from "../../rab_logo.png";
export default class Landing extends React.Component {
	onLogOut = () => {
		sessionStorage.clear();
		message.success("User Logged out successfully.", 1);
		window.location.replace("/logout");
	};
	render() {
		return (
			<>
				<Typography.Text style={{ float: "right" }} type="secondary">
					Logged in as {sessionStorage.getItem("display_name")}
				</Typography.Text>
				<br></br>
				<Popconfirm title="Are you sure?" onConfirm={this.onLogOut} okText="Yes" cancelText="No" icon={<QuestionCircleOutlined />}>
					<Button style={{ float: "right" }} type="link">
						Logout
					</Button>
				</Popconfirm>
				<Result
					icon={
						<>
							<img src={logo} style={{ width: "30%", height: "50%" }}></img>
							<Divider></Divider>
						</>
					}
					title="Rapid Access Biosecurity - Data Visualization Module"
					subTitle={
						<>
							<p>
								<b>Welcome, {sessionStorage.getItem("display_name")}!</b>
							</p>
						</>
					}></Result>
			</>
		);
	}
}
