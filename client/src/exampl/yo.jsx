import { useState } from "react";
import axios from "axios";  // Import Axios

function Main() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      name: name,
      age: parseInt(age)
    };

    axios.post('http://localhost:4000/api/data', userData)
      .then(res => {
        setResponse(res.data.message + ' - Data: ' + JSON.stringify(res.data.data));
      })
      .catch(err => {
        console.error('Error sending data:', err);
      });
  };

  return (
    <div>
      <h1>Send Data to Node.js Backend</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Age:</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </div>

        <button type="submit">Send</button>
      </form>

      <p>Response from backend: {response}</p>
    </div>
  );
}

export default Main;
