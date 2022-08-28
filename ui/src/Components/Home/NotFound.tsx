import React from "react";
import { Result, Button } from "antd";
const NotFound: React.FC = () => {
	return (
		<Result
			status="404"
			title="404"
			subTitle="Sorry, the page you visited does not exist."
			extra={
				<Button
					onClick={() => {
						window.location.replace("/home");
					}}
					type="primary">
					Back Home
				</Button>
			}></Result>
	);
};

export default NotFound;
