import { createContext, useReducer, useEffect } from 'react'

export const WorkoutsContext = createContext()

export const lostReducer= (state, action) => {
  switch (action.type) {
    case 'SET_WORKOUTS':
      return { 
        ...state,
        lostitems: action.payload 
      }
    case 'CREATE_WORKOUT':
      return { 
        lostitems: [action.payload, ...state.lostitems] 
      }
    case 'DELETE_WORKOUT':
      return { 
        lostitems: state.lostitems.filter(w => w._id !== action.payload._id) 
      }
    default:
      return state
  }
}

 export const WorkoutsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(lostReducer, { 
    lostitems: [] // Set initial state to an empty array
  })

  // Fetch the data from the database when the component is first mounted
  useEffect(() => {
    const fetchLostItems = async () => {
      const response = await fetch('/api/lostitem') // Update to match your actual API endpoint
      const json = await response.json()

      if (response.ok) {
        dispatch({ type: 'SET_WORKOUTS', payload: json })
      }
    }

    fetchLostItems()
  }, []) // The empty array ensures this effect runs only once

  return (
    <WorkoutsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </WorkoutsContext.Provider>
  )
}
  