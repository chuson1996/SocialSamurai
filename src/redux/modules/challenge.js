/**
 * Created by tvtri on 11/10/2016.
 */
const LEVEL_UP = 'social-samurai/challenge/LEVEL_UP';
const LEVEL_UP_SUCCESS = 'social-samurai/challenge/LEVEL_UP_SUCCESS';
const LEVEL_UP_FAIL = 'social-samurai/challenge/LEVEL_UP_FAIL';
const LOAD_CHALLENGES = 'social-samurai/challenge/LOAD_CHALLENGES';
const LOAD_CHALLENGES_SUCCESS = 'social-samurai/challenge/LOAD_CHALLENGES_SUCCESS';
const LOAD_CHALLENGES_FAIL = 'social-samurai/challenge/LOAD_CHALLENGES_FAIL';

const initialState = {
    loaded: false,
    saved: false
};

export default function reducer(state = initialState, action = {}) {
    switch (action.type) {
        case LOAD_CHALLENGES:
            return {
                ...state,
                loading: true
            };
        case LOAD_CHALLENGES_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                challenges: action.result
            };
        case LOAD_CHALLENGES_FAIL:
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
        default:
            return state;
    }
}

export function getChallenges() {
    return {
        types: [LOAD_CHALLENGES, LOAD_CHALLENGES_SUCCESS, LOAD_CHALLENGES_FAIL],
        promise: (client) => client.get('/challenges')
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
