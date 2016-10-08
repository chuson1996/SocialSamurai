const LOAD = 'social-samurai/comment/LOAD';
const LOAD_SUCCESS = 'social-samurai/comment/LOAD_SUCCESS';
const LOAD_FAIL = 'social-samurai/comment/LOAD_FAIL';
const SAVE = 'social-samurai/comment/SAVE';
const SAVE_SUCCESS = 'social-samurai/comment/SAVE_SUCCESS';
const SAVE_FAIL = 'social-samurai/comment/SAVE_FAIL';

const initialState = {
	loaded: false,
	saved: false
};

export default function reducer(state = initialState, action = {}) {
	switch (action.type) {
		case LOAD:
			return {
				...state,
				loading: true
			};
		case LOAD_SUCCESS:
			return {
				...state,
				loading: false,
				loaded: true,
				user: action.result
			};
		case LOAD_FAIL:
			return {
				...state,
				loading: false,
				loaded: false,
				error: action.error
			};
		case SAVE:
			return {
				saving: true
			};
		case SAVE_SUCCESS: {
			return {
				saving: false,
				saved: false,
				data: action.data
			};
		}
		default:
			return state;
	}
}

export function isLoaded(globalState) {
	return globalState.auth && globalState.auth.loaded;
}

export function saveComment({ challengeId, commentId }) {
	return {
		types: [SAVE, SAVE_SUCCESS, SAVE_FAIL],
		promise: (client) => {
			if (!challengeId) {
				return Promise.reject({
					message: 'Unknown challengeId or challengeId is undefined'
				});
			}

			if (commentId) return client.post(`/challenges/${challengeId}/comments/${commentId}`);

			return client.post(`/challenges/${challengeId}/comments`);
		}
	};
}
