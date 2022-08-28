import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Landing from "./Components/Home/Landing";
import NotFound from "./Components/Home/NotFound";
import Login from "./Components/Login/Login";

function RequireAuth({ children }: { children: JSX.Element }) {
	if (sessionStorage.getItem("email") === null || sessionStorage.getItem("email") === undefined) {
		return <Navigate to="/login" replace />;
	}
	return children;
}
export default class Redirections extends React.Component {
	render() {
		return (
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Login />} />
					<Route path="/login" element={<Login />} />
					<Route
						path="/home"
						element={
							<RequireAuth>
								<Landing />
							</RequireAuth>
						}
					/>
					<Route path="*" element={<NotFound />}></Route>
				</Routes>
			</BrowserRouter>
		);
	}
}
