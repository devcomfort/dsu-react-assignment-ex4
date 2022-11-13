// @ts-check

import { useState } from "react";

/**
 * User Data Loader
 *
 * 평소에 개발하던대로 개발해봤습니다 :)
 * 지난번에 파일 이름 형식 못 지킨 건 죄송합니다..ㅠㅜ
 *
 * [ P.S. ]
 * 현재 주로 RxJS, JavaScript, JSDoc을 개발하고 있습니다!
 * 최근에는 함수형에 이어 반응형 프로그래밍을 공부하고 있는데, 재밌더라구요! :)
 *
 * 읽고 계시다면.. 좋은 하루 되세요 :)
 *
 * @author devcomforts
 * @link https://github.com/devcomfort
 *
 * @typedef {object} Data
 * @property {string} id
 * @property {string} name
 * @property {string} description
 */

/**
 * @typedef {object} Args
 * @property {string} [_key] localStorage 데이터 저장 key 값 (기본값: user_item)
 */
export default function (_key = "user_item") {
	/**
	 * 유저 데이터 불러오기 함수
	 * @returns {Data[]}
	 */
	const _load = function () {
		// localStorage 객체가 지원되지 않는 경우, 기본값 반환
		// 과제라서 polyfill 추가를 못 함..ㅠ
		if (!localStorage) return [];

		// 데이터 가져오기
		const _item = localStorage.getItem(_key);

		// 데이터 없으면, 기본값 반환
		if (_item === null) return [];

		// 데이터 있으면, 데이터 파싱해서 반환
		return JSON.parse(_item);
	};

	let [_data, setData] = useState(_load());

	/**
	 * User 데이터 저장 함수
	 * @param {Data[]} _user
	 */
	const _write = function (_user) {
		// localStorage 객체가 지원되지 않는 경우, 오류 발생
		if (!localStorage)
			throw new Error(`해당 브라우저에서는 localStorage를 지원하지 않습니다.`);

		localStorage.setItem(_key, JSON.stringify(_data));
		setData(_data);
	};

	/**
	 * 중복 아이디 검사 함수
	 * @param {string} _id ID 정보
	 * @return {Boolean}
	 */
	const _checkCollapse = function (_id) {
		return _data.map((v) => v.id).includes(_id);
	};

	/**
	 * 아이디 제거 함수; 아이디 제거 후 저장
	 * @param {string} _id ID 정보 (Unique 자료형으로 구분)
	 */
	const filterID = function (_id) {
		return _data.filter((v) => v.id !== _id);
	};

	/**
	 * 유저 정보 제거 함수, ID 정보 기반
	 * @param {string} _id ID 정보
	 */
	const removeDataByID = function (_id) {
		if (!_checkCollapse(_id)) throw new Error(`존재하지 않는 아이디입니다.`);

		setData(_data.filter((v) => _id !== v.id));
		return _data;
	};

	/**
	 *
	 * @param {string} name
	 * @returns
	 */
	const searchDataByName = (name) => _data.filter((v) => v.name === name);

	/**
	 *
	 * @param {string} _id
	 */
	const searchDataByID = (_id) => _data.filter((v) => v.id === _id);

	/**
	 *
	 * @param {string} _description
	 */
	const searchDataByDescription = (_description) =>
		_data.filter((v) => v.description === _description);

	/**
	 *
	 * @param {Data} param0
	 */
	const updateUser = function ({ id, name, description }) {
		setData(
			_data.map((_user) => {
				if (_user.id === id)
					return {
						id: _user.id,
						name: name,
						description: description,
					};

				return _user;
			})
		);

		return _data;
	};

	/**
	 * 유저 추가 함수
	 * @param {Data} _user
	 */
	const addUser = function (_user) {
		if (_checkCollapse(_user.id))
			throw new Error(`이미 같은 아이디의 사용자가 존재합니다.`);

		setData([..._data, _user]);
		return _data;
	};

	return {
		data: () => _data,
		load: _load,
		write: _write,
		filterID,
		addUser,
		removeDataByID,
		updateUser,
		searchDataByID,
		searchDataByName,
		searchDataByDescription,
		_checkCollapse,
	};
}
