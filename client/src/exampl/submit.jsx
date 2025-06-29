import   { useState } from 'react';  

const MyForm = () => {  
  const [formData, setFormData] = useState({ username: '', password: '' });  
  

  const handleChange = (e) => {  
    setFormData({ ...formData, [e.target.name]: e.target.value });  
  };  

  const handleSubmit = (e) => {  
    e.preventDefault();  
    // Handle form submission logic  
    console.log(formData);  
  };  

  return (  
    <form onSubmit={handleSubmit} className="space-y-4">  
      <div>  
        <label className="block">Username:</label>  
        <input  
          type="text"  
          name="username"  
          value={formData.username}  
          onChange={handleChange}  
          className="border p-2 rounded"  
        />  
      </div>  
      <div>  
        <label className="block">Password:</label>  
        <input  
          type="password"  
          name="password"  
          value={formData.password}  
          onChange={handleChange}  
          className="border p-2 rounded"  
        />  
      </div>  
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">  
        Submit  
      </button>  
    </form>  
  );  
};  

export default MyForm;