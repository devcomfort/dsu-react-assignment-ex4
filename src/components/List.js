// @ts-check

import React from "react";
import DataHandler from "../lib/DataHandler.js";
import { v4 } from "uuid";
import ListObject from "./ListObject.js";

/**
 * @typedef {object} Args
 * @property {string} title
 * @property {import("../lib/DataHandler.js").Data[]} ListData
 *
 * @param {Args} param0
 * @returns
 */
export default function ({ title = "" }) {
	const _Handler = DataHandler();

	/**
	 * @param {SubmitEvent} e
	 */
	const submitFunction = function (e) {
		// 제출 이벤트 취소
		e.preventDefault();

		/** @type {HTMLFormElement | null} */
		// @ts-ignore
		const targetElement = e.target;
		_Handler.addUser({
			id: v4(),
			// @ts-ignore
			name: targetElement?.querySelector("#name")?.value,
			// @ts-ignore
			description: targetElement?.querySelector("#description")?.value,
		});
	};

	return (
		<div>
			<h2>{title}</h2>
			<div>
				{_Handler.data().map((v) => (
					<ListObject
						key={v.id}
						_data={v}
						removeThis={_Handler.removeDataByID}
					></ListObject>
				))}
			</div>

			{/* @ts-ignore */}
			<form onSubmit={submitFunction}>
				<input type="text" name="name" id="name" placeholder="제목" />
				<input
					type="text"
					name="description"
					id="description"
					placeholder="내용"
				/>{" "}
				<input type="submit" value="추가" />
			</form>
		</div>
	);
}
