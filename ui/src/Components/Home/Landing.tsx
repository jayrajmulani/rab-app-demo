import React from "react";
export default class Landing extends React.Component {
	render() {
		return <h1>{sessionStorage.getItem("email")}</h1>;
	}
}
