/**
 * @typedef {object} Args
 * @property {import("../lib/DataHandler.js").Data} _data
 * @property {(id: string) => void} removeThis
 */

import { useState } from "react";
import "../list.css";

/**
 *
 * @param {Args} param0
 */
export default function ({ _data: { id, description, name }, removeThis }) {
	/** 접힙 상태 값 (기본값: true) */
	const [collapsed, setCollapsed] = useState(true);

	const flip = () => setCollapsed(!collapsed);

	/** @param {MouseEvent} e */
	const _removeThis = (e) => {
		e.preventDefault(); // 이벤트 진행 차단
		e.stopPropagation(); // 이벤트 전파 차단 (collapsible 이벤트 때문에 추가됨)
		removeThis(id); // ID에 대응되는 데이터 제거 진행
	};

	return (
		<div className="collapsible" onClick={flip}>
			<span title={description}>
				{name} <button onClick={_removeThis}>삭제</button>
			</span>
			<div
				className="content"
				style={
					collapsed
						? { maxHeight: 0 }
						: { maxHeight: "200px", marginTop: "0.5rem" }
				}
			>
				{description}
			</div>
		</div>
	);
}
