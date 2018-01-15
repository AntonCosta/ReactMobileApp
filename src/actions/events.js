// import * as types from "./types";
//
// export const fetchEventsStarted = (uid) => {
//     return {
//         type: types.FETCH_EVENTS_STARTED,
//         fetching: true,
//         uid: uid
//     }
// };
//
// export const fetchEventsSuccess = (items) => {
//     return {
//         type: types.FETCH_EVENTS_SUCCESS,
//         fetching: false,
//         items: items
//     }
// };
//
//
// export const fetchEventsFail = () => {
//     return {
//         type: types.FETCH_EVENTS_FAIL,
//         fetching: false,
//     }
// };
//
// export const fetchEvents = (uid) => {
//     return (dispatch) => {
//         dispatch(fetchEventsStarted(uid))
//         return firebase.database()
//             .ref('accounts/' + uid + '/Events')
//             .once('value')
//             .then((Events) => {
//                 const items = Events.val();
//                 const normalizedItems = normalizeEventsObject(items)
//                 console.log("fetched Events: ", normalizedItems);
//                 dispatch(
//                     fetchEventsSuccess(
//                         normalizedItems
//                     )
//                 )
//                 return normalizedItems;
//             })
//             .catch((error) => {
//                 console.log("Cannot fetch Events: ", error);
//                 dispatch(fetchEventsFail());
//             })
//     }
// }
//
// const normalizeEventsObject = (Events) =>{
//     Events = (Events === null || Events === undefined)? [] : Events;
//     return Object.keys(Events).map(
//         (key) => {
//             return {
//                 id: key,
//                 title: Events[key].title,
//                 image: Events[key].image,
//                 cost: Events[key].cost
//             }
//         }
//     )
// }
//
// export const editEventStarted = () => {
//     return {
//         type: types.EDIT_EVENT_STARTED,
//         fetching: true,
//     }
// };
//
// export const editEventSuccess = (item) => {
//     return {
//         type: types.EDIT_EVENT_SUCCESS,
//         fetching: false,
//         item: item
//     }
// };
//
//
// export const editEventFail = () => {
//     return {
//         type: types.EDIT_EVENT_FAIL,
//         fetching: false,
//     }
// };
//
// export const editEvent = (uid, Event) => {
//     //not waiting for async to finish
//     //does not save to store the new edited EVENT
//     //TODO: fix this
//     return (dispatch) => {
//         dispatch(editEventStarted());
//         return firebase.database()
//             .ref('/accounts/' + uid + '/Events/' + Event.id)
//             .set({
//                 title: Event.title,
//                 startDate: Event.startDate,
//                 endDate: Event.endDate
//             })
//             .then((item) => {
//                 // console.log("Edit success: ", item);
//                 dispatch(editEventSuccess({}))
//             })
//             .catch((error => {
//                 console.log("Could not edit Event: ", error);
//             }))
//     }
// }

import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import * as types from "./types";
// import { NavigationActions } from 'react-navigation';

export const eventUpdate = ({ prop, value }) => {
    return {
        type: types.EVENT_UPDATE,
        payload: { prop, value }
    }
};

export const eventCreate = ({ title, location, organizor, nr}) => {
    const { currentUser } = firebase.auth();
    return (dispatch) => {
        firebase.database().ref(`/events`)
            .push({ title, location, organizor, nr })
            .then(() => {
                dispatch({
                    type: types.EVENT_CREATE
                });
                Actions.viewEvents();

            });
    }
};

export const eventsFetch = () => {
    const { currentUser } = firebase.auth();
    return (dispatch) => {
        firebase.database().ref(`/events`)
            .on('value', snapshot => {
                dispatch({
                    type: types.EVENT_FETCH_SUCCESS,
                    payload: snapshot.val(),
                })
            });
    };
};

export const eventSave = ({ title, location, organizor, nr, uid }) => {
    const { currentUser } = firebase.auth();
    return (dispatch) => {
        dispatch({
            type: types.EVENT_SAVE_SUCCESS
        });
        firebase.database().ref(`/events/${uid}`)
            .set({ title, location, organizor, nr})
            .then(() => {
                Actions.viewEvents();
            });
    }
};

export const eventDelete = ({ uid }) => {
    const { currentUser } = firebase.auth();
    return (dispatch) => {
        firebase.database().ref(`/events/${uid}`)
            .remove()
            .then(() => {
                Actions.viewEvents();
            });
    }
};