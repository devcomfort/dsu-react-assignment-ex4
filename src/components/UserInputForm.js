import React, { useState } from "react";

function UserInputForm({
	id = "",
	name = "",
	point = "",
	onAddUser = (f) => f,
	onUpdateUser = (f) => f,
}) {
	const [txtName, setName] = useState(name);
	const [txtPoint, setPoint] = useState(point);

	const handleSubmit = (event) => {
		event.preventDefault();
		if (id) {
			onUpdateUser(id, txtName, txtPoint);
		} else {
			onAddUser(txtName, txtPoint);
		}
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<input
					type="text"
					value={txtName}
					onChange={(event) => setName(event.target.value)}
					placeholder="User Name"
					required
				></input>
				<input
					type="text"
					value={txtPoint}
					onChange={(event) => setPoint(event.target.value)}
					placeholder="Point"
					required
				></input>
				<input type="submit" value={id ? "수정" : "추가"}></input>
			</form>
		</div>
	);
}

export default UserInputForm;
