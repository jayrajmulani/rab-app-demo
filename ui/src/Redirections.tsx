import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Components/Home/Home";
import NotFound from "./Components/Home/NotFound";
import Login from "./Components/Login/Login";
import LogOut from "./Components/Login/Logout";

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
					<Route path="/logout" element={<LogOut />} />
					<Route
						path="/home"
						element={
							<RequireAuth>
								<Home />
							</RequireAuth>
						}
					/>
					<Route path="*" element={<NotFound />}></Route>
				</Routes>
			</BrowserRouter>
		);
	}
}
