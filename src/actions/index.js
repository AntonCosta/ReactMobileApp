export const EDIT_EVENT = 'EDIT_EVENT';

export function editEvent(id, title) {
    return {
        type: EDIT_EVENT,
        id,
        title,
    }
}

export const ActionCreators = Object.assign({},
    editEvent
);