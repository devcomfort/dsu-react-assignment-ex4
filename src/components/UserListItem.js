import React, { useState } from "react";
import UserInputForm from "./UserInputForm";

function UserListItem({
	id = "",
	name = "No Name",
	point = 0,
	onRemove = (f) => f,
	onUpdate = (f) => f,
}) {
	const [editable, setEditable] = useState(false);

	return (
		<div>
			<h3 onClick={() => (editable ? setEditable(false) : setEditable(true))}>
				{name}, {point}
				<button onClick={() => onRemove(id)}>삭제</button>
			</h3>
			{editable ? (
				<UserInputForm
					id={id}
					name={name}
					point={point}
					onUpdateUser={onUpdate}
				/>
			) : null}
		</div>
	);
}

export default UserListItem;
