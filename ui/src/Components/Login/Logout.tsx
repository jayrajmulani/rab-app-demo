import { Button, Result } from "antd";
import { CheckCircleFilled } from "@ant-design/icons";

const LogOut = () => {
	return (
		<Result
			icon={<CheckCircleFilled></CheckCircleFilled>}
			title={"You have been logged out"}
			subTitle="Hope you had a great experience"
			extra={
				<Button
					type="primary"
					onClick={() => {
						window.location.replace("/login");
					}}>
					Back to Login
				</Button>
			}></Result>
	);
};
export default LogOut;
