import "./App.css";
import "./additional.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useState } from "react";

import ListDataHandler from "./lib/DataHandler";
import List from "./components/List";

function App() {
	const _ListDataHandler = ListDataHandler();

	return (
		<div className="App">
			<Header>Lecture Notification System</Header>
			<div className="container">
				<List title="공지사항"></List>
				<List title="강의내용"></List>
			</div>
			<Footer>소프트웨어개발실습2 20211343 김동현</Footer>
		</div>
	);
}

export default App;
