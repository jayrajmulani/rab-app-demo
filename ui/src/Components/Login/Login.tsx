import React from "react";
import type { FormInstance } from "antd/es/form";
import { Form, Input, Button, Typography, Modal, message, Divider } from "antd";
import config from "../../config";
import logo from "../../rab_logo.png";
import "antd/dist/antd.css";
import "./Login.css";
const { Title } = Typography;
interface LoginState {
	waitingForLogin: boolean;
	waitingForRegistration: boolean;
	registerModalVisible: boolean;
}
type LoginProps = any;
interface LoginValues {
	email: string;
	password: string;
}
interface RegisterValues {
	email: string;
	password: string;
	display_name: string;
	confirm_password: string;
}
export default class Login extends React.Component<LoginProps, LoginState> {
	constructor(props: LoginProps) {
		super(props);
		this.state = {
			waitingForRegistration: false,
			waitingForLogin: false,
			registerModalVisible: false,
		};
	}
	formRef = React.createRef<FormInstance>();
	registerFormRef = React.createRef<FormInstance>();
	onClickRegister = () => {
		this.setState({ registerModalVisible: true });
	};
	onRegister = (values: RegisterValues) => {
		this.setState({ waitingForRegistration: true });
		let url = `${config.baseUrl}/register`;
		fetch(url, {
			method: "POST",
			headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
			body: JSON.stringify(values),
		})
			.then((res) => res.json())
			.then((response) => {
				if (response.status) {
					this.setState({ registerModalVisible: false });
					message.success("Registration Successful! You can login to the system now.");
				} else {
					message.error(response.data, 3);
					this.registerFormRef.current!.resetFields();
				}
				this.setState({ waitingForRegistration: false });
			})
			.catch((err) => console.log(err));
	};
	onLogin = (values: LoginValues) => {
		this.setState({ waitingForLogin: true });
		let url = `${config.baseUrl}/login`;
		fetch(url, {
			method: "POST",
			headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
			body: JSON.stringify(values),
		})
			.then((res) => res.json())
			.then((response) => {
				if (response.status) {
					message.success("Login Successful.");
					sessionStorage.setItem("loggedIn", "true");
					sessionStorage.setItem("email", response.data.email);
					sessionStorage.setItem("display_name", response.data.display_name);
				} else {
					sessionStorage.setItem("loggedIn", "false");
					message.error(response.data, 3);
					this.formRef.current!.resetFields();
				}
				this.setState({ waitingForLogin: false });
				if (sessionStorage.getItem("loggedIn") !== null && sessionStorage.getItem("loggedIn") === "true") {
					window.location.replace("/home");
				}
			})
			.catch((err) => console.log(err));
	};
	render(): React.ReactNode {
		return (
			<div className="row">
				<div className="col-md-3 center">
					<Form
						ref={this.formRef}
						name="basic"
						labelCol={{
							span: 8,
						}}
						wrapperCol={{
							span: 40,
						}}
						initialValues={{
							remember: true,
						}}
						onFinish={this.onLogin}>
						<Title className="center_title" level={3}>
							<img alt="logo" src={logo} style={{ width: "70%", height: "80%" }}></img>
						</Title>
						<Divider></Divider>
						<Form.Item
							label="Email"
							name="email"
							rules={[
								{
									required: true,
									message: "Please input your Email!",
								},
							]}>
							<Input />
						</Form.Item>
						<Form.Item
							label="Password"
							name="password"
							rules={[
								{
									required: true,
									message: "Please input your password!",
								},
							]}>
							<Input.Password />
						</Form.Item>
						<Form.Item
							wrapperCol={{
								offset: 8,
								span: 16,
							}}>
							<Button type="primary" htmlType="submit" loading={this.state.waitingForLogin}>
								Submit
							</Button>
						</Form.Item>
						<Form.Item
							wrapperCol={{
								offset: 7,
								span: 16,
							}}>
							<Button type="link" onClick={this.onClickRegister}>
								Register?
							</Button>
						</Form.Item>
					</Form>
				</div>
				<Modal visible={this.state.registerModalVisible} title="Register" okText="Submit" footer={null} closable={false}>
					<Form
						ref={this.registerFormRef}
						labelCol={{
							span: 8,
						}}
						wrapperCol={{
							span: 40,
						}}
						onFinish={this.onRegister}>
						<Form.Item
							name="email"
							label="Email"
							hasFeedback
							rules={[
								{
									required: true,
									type: "email",
									message: "Please input valid Email",
								},
							]}>
							<Input />
						</Form.Item>
						<Form.Item
							label="Display Name"
							name="display_name"
							rules={[
								{
									required: true,
									message: "Please enter your Full Name",
								},
							]}>
							<Input />
						</Form.Item>
						<Form.Item
							name="password"
							label="Password"
							rules={[
								{
									required: true,
									message: "Please input password. This will be used for Login.",
								},
								{
									pattern: new RegExp(".{8,}"),
									message: "Password must be minumum 8 characters long.",
								},
							]}
							hasFeedback>
							<Input.Password />
						</Form.Item>
						<Form.Item
							name="confirm"
							label="Confirm Password"
							dependencies={["password"]}
							hasFeedback
							rules={[
								{
									required: true,
									message: "Please confirm your password!",
								},
								({ getFieldValue }) => ({
									validator(_, value) {
										if (!value || getFieldValue("password") === value) {
											return Promise.resolve();
										}

										return Promise.reject(new Error("The two passwords that you entered do not match!"));
									},
								}),
							]}>
							<Input.Password />
						</Form.Item>
						<Button
							type="link"
							style={{ marginLeft: "15px" }}
							onClick={() => {
								this.registerFormRef.current!.resetFields();
							}}>
							Reset
						</Button>
						<Button
							type="default"
							style={{ marginLeft: "15px" }}
							onClick={() => {
								this.setState({ registerModalVisible: false });
							}}>
							Cancel
						</Button>
						<Button style={{ marginLeft: "15px" }} type="primary" htmlType="submit">
							Submit
						</Button>
					</Form>
				</Modal>
			</div>
		);
	}
}
