import {EDIT_EVENT} from "./src/actions/index";

const initialState = {
    events: [
        {
            id: 1,
            title: "Library",
            img: require("./src/images/book.png")
        },
        {
            id: 2,
            title: "Gym",
            img: require("./src/images/weight_lifting.png")
        },
        {
            id: 3,
            title: "Birthday",
            img: require("./src/images/party_popper.png")
        },
        {
            id: 4,
            title: "Concert Flying",
            img: require("./src/images/flying_circus.png")
        }
    ]
};


function events(state = [], action) {
    switch(action.type) {
        case EDIT_EVENT:
            return  updatedEvent(state.events, action);
            break;
        default:
            return state.events;
    }
}

function updatedEvent(state = [], action) {
    return state.map((eveniment) => {
        if (eveniment.id === action.id) {
            return Object.assign({}, eveniment, {
                title: action.title
            })
        }
        return eveniment;
    });
}

export const Reducer = (state = initialState, action) => {
    return {
        events: events(state, action)
    }
};