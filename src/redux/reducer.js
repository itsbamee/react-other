import { combineReducers } from 'redux';

const memberReducer = (state = { members: [] }, action) => {
	switch (action.type) {
		case 'SET_MEMBERS':
			return { ...state, members: action.payload };
		default:
			return state;
	}
};

const historyReducer = (state = { history: [] }, action) => {
	switch (action.type) {
		case 'SET_HISTORY':
			return { ...state, history: action.payload };
		default:
			return state;
	}
};

const youtubeReducer = (state = { youtube: [] }, action) => {
	switch (action.type) {
		case 'SET_YOUTUBE':
			return { ...state, youtube: action.payload };
		default:
			return state;
	}
};

const modalReducer = (state = { isOpen: false }, action) => {
	switch (action.type) {
		case 'SET_MODAL':
			return { ...state, isOpen: action.payload };
		default:
			return state;
	}
};

const menuReducer = (state = { isOpen: false }, action) => {
	switch (action.type) {
		case 'SET_MENU':
			return { ...state, isOpen: action.payload };
		default:
			return state;
	}
};

const reducers = combineReducers({ memberReducer, historyReducer, youtubeReducer, modalReducer, menuReducer });
export default reducers;
