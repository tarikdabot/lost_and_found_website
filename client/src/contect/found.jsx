import { createContext, useReducer, useEffect } from 'react';

export const WorkoutsContext = createContext();

const foundtitems = (state, action) => {
  switch (action.type) {
    case 'SET_WORKOUTS':
      return { 
        ...state,
        FoundItems: action.payload 
      };
    case 'CREATE_WORKOUT':
      return { 
        FoundItems: [action.payload, ...state.FoundItems] 
      };
    case 'DELETE_WORKOUT':
      return { 
        FoundItems: state.FoundItems.filter(w => w._id !== action.payload._id) 
      };
    default:
      return state;
  }
};

export const WorkoutsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(foundtitems, { 
    FoundItems: [] // Set initial state to an empty array
  });

  // Fetch the data from the database when the component is first mounted
  useEffect(() => {
    const fetchFoundItems = async () => {
      const response = await fetch('/api/lostitem'); // Update to match your actual API endpoint
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'SET_WORKOUTS', payload: json });
      }
    };

    fetchFoundItems();
  }, []); // The empty array ensures this effect runs only once

  return (
    <WorkoutsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </WorkoutsContext.Provider>
  );
};
