import axios from 'axios'
import { useCallback, useEffect, useReducer } from 'react'
import { createContext } from 'react'
import { ACTION_TYPES } from '../action-types/actionTypes'
import { appointmentsReducer, initialState } from '../reducers/appointmentReducers'

export const AppointmentContext = createContext()

export function AppointmentsProvider({children}) {
    const [state, dispatch] = useReducer(appointmentsReducer, initialState)

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

    const fetchAllAppointments = useCallback(async () => {
        try {
            const token = localStorage.getItem('userToken');
            if (!token) return;
            
            const response = await axios.get(`${BACKEND_URL}/api/appointments/all`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                
            });
            console.log("Fetched Appointments:", response.data)
            dispatch({
                type: ACTION_TYPES.LOAD_APPOINTMENTS,
                data: response.data
            })
        } catch (error) {
            console.error("Error fetching appointments from database", error)
            
        }
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('userToken')
        if (token){
            fetchAllAppointments()
        } 
    }, [fetchAllAppointments])

    return (
        <AppointmentContext.Provider value= {{state, fetchAllAppointments}}>
            {children}
        </AppointmentContext.Provider>
    )
}