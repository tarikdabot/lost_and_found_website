import { useEffect, useState } from 'react';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const PostFound = () => {
  const [foundItems, setFoundItems] = useState([]); // Initial state
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch found items on component mount
  useEffect(() => {
    const fetchFoundItems = async () => {
      try {
        const response = await fetch('/api/founds/');
        if (!response.ok) throw new Error('Network response was not ok');
        const json = await response.json();
        setFoundItems(json);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchFoundItems();
  }, []);

  // Handle delete button click
  const handleClick = async (id) => {
    try {
      const response = await fetch(`/api/founditem/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setFoundItems((prevItems) => prevItems.filter((item) => item._id !== id));
      } else {
        throw new Error('Failed to delete item');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Loading state
  }

  if (error) {
    return <div>Error: {error}</div>; // Display error if any
  }

  if (!foundItems.length) {
    return <div>No found items.</div>;
  }

  return (
    <div className="container mx-auto px-2 py-3">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {foundItems.slice(0, 9).map((item) => (
          <div key={item._id} className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center justify-between space-y-4">
            <div className="text-center">
              <p className="font-semibold text-gray-800">{item.itemName}</p>
              <p className="text-gray-600"><strong>Category: </strong>{item.category}</p>
              <p className="text-gray-600"><strong>Country: </strong>{item.country}</p>
              <p className="text-sm text-gray-500">
                {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}
              </p>
            </div>
            <button
              className="text-red-500 hover:text-red-700"
              onClick={() => handleClick(item._id)}
            >
              <span className="material-symbols-outlined">delete</span>
            </button>
          </div>
        ))}
      </div>
      <div className="mt-4">
        <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          All Found Post
        </button>
      </div>
    </div>
  );
};

export default PostFound;
