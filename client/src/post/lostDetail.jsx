import { useEffect } from 'react';
import { useWorkoutsContext } from '../Hooks/useWorkoutsContext';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const PostLost = () => {
  const { lostitems, dispatch } = useWorkoutsContext();
  
  // You may get isAdmin from user context or state management if applicable
  const isAdmin = true; // Replace this with actual admin check logic

  // Fetch lost items on component mount
  useEffect(() => {
    const fetchLostItems = async () => {
      const response = await fetch('/api/lostitem');
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'SET_WORKOUTS', payload: json });
      }
    };

    fetchLostItems();
  }, [dispatch]);

  const handleClick = async (id) => {
    const response = await fetch(`/api/lostitem/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ isAdmin }), // Include isAdmin in the body
    });
    
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: 'DELETE_WORKOUT', payload: json });
    } else {
      console.error(json.error); // Log error if not successful
    }
  };

  if (!lostitems || lostitems.length === 0) {
    return <div>No lost items to display.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Grid layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {lostitems.map((lostitem) => (
          <div key={lostitem._id} className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center justify-between space-y-4">
            <div className="text-center">
              <p className="font-semibold text-gray-800">{lostitem.itemName}</p>
              <p className="text-gray-600"><strong>Category: </strong>{lostitem.category}</p>
              <p className="text-gray-600"><strong>Country: </strong>{lostitem.country}</p>
              <p className="text-gray-600"><strong>city: </strong>{lostitem.city}</p>
              <p className="text-gray-600"><strong>brand: </strong>{lostitem.brand}</p>
              <p className="text-gray-600"><strong>whereLost: </strong>{lostitem.whereLost}</p>
              <p className="text-gray-600"><strong>whenLost: </strong>{lostitem.whenLost}</p>
              <p className="text-gray-600"><strong>ZipCode: </strong>{lostitem.ZipCode}</p>
              <p className="text-gray-600"><strong>first name: </strong>{lostitem.fname}</p>
              <p className="text-gray-600"><strong>last name: </strong>{lostitem.lname}</p>
              <p className="text-gray-600"><strong>phone: </strong>{lostitem.phone}</p>
              <p className="text-gray-600"><strong>Email: </strong>{lostitem.email}</p>


              <p className="text-sm text-gray-500">
                {formatDistanceToNow(new Date(lostitem.createdAt), { addSuffix: true })}
              </p>
            </div>
            {isAdmin && ( // Only show delete button if user is admin
              <button
                className="text-red-500 hover:text-red-700"
                onClick={() => handleClick(lostitem._id)}
              >
                <span className="material-symbols-outlined">delete</span>
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostLost;
