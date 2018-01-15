import {
    EVENT_UPDATE,
    EVENT_CREATE,
    EVENT_SAVE_SUCCESS,
    EVENT_DELETE_SUCCESS
} from '../actions/types.js';

const INITIAL_STATE = {
    uid: '',
    title: '',
    location: '',
    organizor: '',
    nr: 0
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case EVENT_UPDATE:
            return { ...state, [action.payload.prop]: action.payload.value };
        case EVENT_CREATE:
            return INITIAL_STATE;
        case EVENT_SAVE_SUCCESS:
            return INITIAL_STATE;
        case EVENT_DELETE_SUCCESS:
            return { ...state, visible: false };
        default:
            return state;
    }
};