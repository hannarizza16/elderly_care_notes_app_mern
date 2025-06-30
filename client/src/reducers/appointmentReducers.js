export const initialState = {
    appointmentData: {
        title: "",
        date: Date.now(),
        time: ""
    },
    appointments: [], // store all appointments
}

export function appointmentsReducer(state, action) {
    switch(action.type) {
        case 'LOAD_APPOINTMENTS':
            return {
                ...state,
                appointments: action.data || [] // loading all appointments from the database
            }
        default:
            return state;
    }
}