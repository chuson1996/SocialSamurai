import update from 'react-addons-update';
const LEVEL_UP = 'social-samurai/challenge/LEVEL_UP';
const LEVEL_UP_SUCCESS = 'social-samurai/challenge/LEVEL_UP_SUCCESS';
const LEVEL_UP_FAIL = 'social-samurai/challenge/LEVEL_UP_FAIL';
const LOAD = 'social-samurai/challenge/LOAD';
const LOAD_SUCCESS = 'social-samurai/challenge/LOAD_SUCCESS';
const LOAD_FAIL = 'social-samurai/challenge/LOAD_FAIL';
const SAVE_COMMENT = 'social-samurai/challenge/SAVE_COMMENT';
const SAVE_COMMENT_SUCCESS = 'social-samurai/challenge/SAVE_COMMENT_SUCCESS';
const SAVE_COMMENT_FAIL = 'social-samurai/challenge/SAVE_COMMENT_FAIL';

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
				data: action.result,
			};
		case LOAD_FAIL:
			return {
				...state,
				loading: false,
				loaded: false,
				error: action.error
			};
		case LEVEL_UP:
			return {
				...state,
				loading: true
			};
		case LEVEL_UP_SUCCESS:
			return {
				...state,
				loading: false,
				loaded: true,
				user: action.result
			};
		case LEVEL_UP_FAIL:
			return {
				...state,
				loading: false,
				loaded: false,
				error: action.error
			};
		case SAVE_COMMENT:
			return {
				...state,
				saving: true
			};
		case SAVE_COMMENT_SUCCESS:
			return {
				...state,
				saving: false,
				data: update(state.data, {
					comments: {
						$push: [action.result]
					}
				})
			};
		default:
			return state;
	}
}

export function load(challengeLevel) {
	return {
		types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
		promise: (client) => client.get(`/challenges/${challengeLevel}`)
	};
}

export function saveComment({ challengeId, commentId, body }) {
	return {
		types: [SAVE_COMMENT, SAVE_COMMENT_SUCCESS, SAVE_COMMENT_FAIL],
		promise: (client) => {
			if (!challengeId) {
				return Promise.reject({
					message: 'Unknown challengeId or challengeId is undefined'
				});
			}

			if (commentId) {
					return client.post(`/challenges/${challengeId}/comments/${commentId}`, {
						data: {
							body
						}
					}).then((res) => Promise.resolve({ ...res, parentChallengeId: challengeId, parentCommentId: commentId }));
			}

			return client.post(`/challenges/${challengeId}/comments`, {
				data: { body }
			}).then((res) => Promise.resolve({ ...res, parentChallengeId: challengeId }));
		}
	};
}

export function levelUp(userId) {
	return {
		types: [LEVEL_UP, LEVEL_UP_SUCCESS, LEVEL_UP_FAIL],
		promise: (client) => {
			return client.post(`/users/${userId}/levelup`);
		}
	};
}
