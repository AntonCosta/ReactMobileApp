// import * as types from "../actions/types";
//
// export const EVENTs = (state = {}, action) => {
//     switch (action.type) {
//         case types.ADD_EVENT:
//             var EVENTs =  cloneObject(state.EVENTs) //clone the current state
//             EVENTs.unshift(action.EVENT); //add the new quote to the top
//             state = Object.assign({}, state, { EVENTs: EVENTs});
//             return state;
//         case types.AVAILABLE_EVENTS:
//             state = Object.assign({}, state, { EVENTs: action.EVENTs, loading:false });
//             return state;
//         case types.UPDATE_EVENT:
//             var EVENT = action.EVENT;
//             var EVENTs =  cloneObject(state.EVENTs) //clone the current state
//             var index = getIndex(EVENTs, EVENT.id); //find the index of the EVENT with the EVENT id passed
//             if (index !== -1) {
//                 EVENTs[index]['title'] = EVENT.title;
//                 EVENTs[index]['image'] = EVENT.image;
//                 EVENTs[index]['cost'] = EVENT.cost;
//             }
//             state = Object.assign({}, state, { EVENTs: EVENTs});
//             return state;
//         case types.EDIT_EVENT_SUCCESS:
//             return {
//                 ...state,
//                 fetching: action.fetching,
//                 items: updatedEVENTs(state.items, action.item)
//             };
//         case types.EDIT_EVENT_FAIL:
//             return {
//                 ...state,
//                 fetching: action.fetching,
//             };
//         default:
//             return state;
//     }
// }
//
// function updatedEVENTs(state = [], action) {
//     return state.map((EVENT) => {
//         if (EVENT.id === action.id) {
//             return Object.assign({}, EVENT, {
//                 title: action.title,
//                 image: action.image,
//                 cost: action.cost
//             })
//         }
//         return EVENT;
//     });
// }

import {
    EVENT_FETCH_SUCCESS
} from '../actions/types.js';

const INITIAL_STATE = {

};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case EVENT_FETCH_SUCCESS:
            return action.payload;
        default:
            return state;
    }
}