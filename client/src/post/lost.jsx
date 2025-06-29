import { useEffect, useState } from 'react';
 
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const PostLost = () => {
  const { lostitems, dispatch } = useState(0);
  const [showAll, setShowAll] = useState(false); // State to control view of all items

  // Fetch lost items on component mount
  useEffect(() => {
    const fetchLostItems = async () => {
      const response = await fetch('/api/lostitem'); // Assuming this is the correct route
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'SET_WORKOUTS', payload: json }); // Dispatching the action to update state
      }
    };

    fetchLostItems();
  }, [dispatch]);

  const handleClick = async (id) => {
    const response = await fetch(`/api/lostitem/${id}`, {
      method: 'DELETE',
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: 'DELETE_WORKOUT', payload: json });
    }
  };

  if (!lostitems || lostitems.length === 0) {
    return <div>No lost items to display.</div>;
  }

  return (
    <div className="container mx-auto px-2 py-3">
      {/* Grid layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {(showAll ? lostitems : lostitems.slice(0, 6)).map((lostitem) => ( // Conditional rendering based on showAll
          <div key={lostitem._id} className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center justify-between space-y-4">
            <img
              src={lostitem.Picture ? lostitem.Picture : 'default-image.jpg'}
              alt="Lost Item"
              className="h-40 w-40 object-cover rounded-md"
            />
            <div className="text-center">
              <p className="font-semibold text-gray-800">{lostitem.itemName}</p>
              <img src={lostitem.Picture} className="h-20 w-20 object-cover rounded-md" alt="Lost Item" />
              <p className="text-gray-600"><strong>Category: </strong>{lostitem.category}</p>
              <p className="text-gray-600"><strong>Country: </strong>{lostitem.country}</p>
              <p className="text-sm text-gray-500">
                {formatDistanceToNow(new Date(lostitem.createdAt), { addSuffix: true })}
              </p>
            </div>
            <button
              className="text-red-500 hover:text-red-700"
              onClick={() => handleClick(lostitem._id)}
            >
              <span className="material-symbols-outlined">delete</span>
            </button>
          </div>
        ))}
      </div>

      {/* View All button */}
      <div className="mt-4">
        <button 
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          onClick={() => setShowAll(!showAll)} // Toggle showAll state
        >
          {showAll ? 'View Less' : 'View All'}
        </button>
      </div>

      {/* Number of lost items */}
      <div className="mt-2 text-gray-700">
        Total lost items: {lostitems.length}
      </div>
    </div>
  );
};

export default PostLost;
