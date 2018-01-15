// import { events as eventsReducer } from './events';
// import { users as usersReducer } from './users';
// import {combineReducers} from "redux";
// const initialState = {
//     events: [
//         // {
//         //     id: 1,
//         //     title: "Event 1",
//         //     img: require("../../images/1.jpg")
//         // },
//         // {
//         //     id: 2,
//         //     title: "Event 2",
//         //     img: require("../../images/2.jpg")
//         // },
//         // {
//         //     id: 3,
//         //     title: "Event 3",
//         //     img: require("../../images/3.jpg")
//         // },
//     ]
// };
//
//
// // export const reducer = (state = initialState, action) => {
// //     return {
// //         events: eventsReducer(state.events, action),
// //         user: usersReducer(state.user, action)
// //     }
// // };
//
// const rootReducer = combineReducers({
//     eventsReducer,
//     usersReducer
// });
//
// export default rootReducer;

import { combineReducers } from 'redux';
import AuthReducer from './users';
import EventFormReducer from './event';
import EventReducer from './events';

export default combineReducers({
    auth: AuthReducer,
    eventForm: EventFormReducer,
    eventData: EventReducer,
});