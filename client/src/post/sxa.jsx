import { useEffect, useState } from "react"; 
import { useDispatch, useSelector } from "react-redux";
import { lostStart, lostSuccess, lostFailure, clearError } from "../redux/lost/Lost";
import { useNavigate } from "react-router-dom";
import { Button, Alert } from "flowbite-react";

const Lost = () => {
  const initialFormData = {
    Picture: null,  // Assuming this will be a file input
    itemName: '',
    category: '',
    whenLost: '',
    whereLost: '',
    country: '',
    city: '',
    brand: '',
    ZipCode: '',
    fname: '',
    lname: '',
    phone: '',
  };

  const [formData, setFormData] = useState(initialFormData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { error: errorMessage } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const changeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    dispatch(clearError());

    if (!formData.Picture || !formData.itemName || !formData.category || !formData.whenLost || !formData.whereLost || !formData.country || !formData.city || !formData.brand || !formData.ZipCode || !formData.fname || !formData.lname || !formData.phone) {
      return dispatch(lostFailure("Please fill out all fields"));
    }

    try {
      dispatch(lostStart());

      const res = await fetch("http://localhost:4000/api/lostitem", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (data.success === false) {
        return dispatch(lostFailure(data.message));
      }

      if (res.ok) {
        dispatch(lostSuccess(data));
        // Reset form data after successful submission
        setFormData(initialFormData);
        navigate("/contact");
      }
    } catch (error) {
      dispatch(lostFailure(error.message));
    }
  };
  return (
    <>
      <form  onSubmit={submitHandler}  >
        <div className="mr-3 ml-3 justify-center">
          <h3 className="m-5">
            Please be descriptive when submitting your lost property report, the more information you give us, the better chance you have of retrieving your items.
          </h3>
          <div className="grid gap-6 mb-6 sm:grid-cols-2 ml-3 mr-3">
            <div>
              <label
                htmlFor="WhatwasLost"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                What was Lost
              </label>
              <input
                type="text"
                id="itemName"
                name="itemName"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Itemname"
                onChange={changeHandler}
                required
              />
            </div>
            <div>
              <label
                htmlFor="category"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Category
              </label>
              <select
                
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                id="category"
                name="category"
                onChange={changeHandler}
              >
                <option value="">Select Category</option>
                <option value="electronics">Electronics</option>
                <option value="clothing">Clothing</option>
                <option value="jewelry">Jewelry</option>
                <option value="documents">Documents</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="brand"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Brand
              </label>
              <input
                type="text"
                id="brand"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Brand (optional)"
                name="brand"
                onChange={changeHandler}
              />
            </div>

            <div>
              <label
                htmlFor="location_lost"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Where Lost
              </label>
              <input
                type="text"
                id="whereLost"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="e.g., Taxi, Park"
                name="whereLost"
                required
                onChange={changeHandler}
              />
            </div>

            <div>
              <label
                htmlFor="date_lost"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Date Lost
              </label>
              <input
                type="date"
                id="whenLost"
                name="whenLost"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                onChange={changeHandler}
              />
            </div>
            {/* Country Select */}
            <div>
              <label
                htmlFor="country"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Country
              </label>
              <select
                id="country"
                 name="country"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                onChange={changeHandler}
                
              >
                <option value="">Select Country</option>
                <option value="us">United States</option>
                <option value="ca">Canada</option>
                <option value="uk">United Kingdom</option>
                <option value="et">Ethiopia</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* City Select */}
            <div>
              <label
                htmlFor="city"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                City
              </label>
              <select
                id="city"
                name="city"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
                onChange={changeHandler}
              >
                <option value="">Select City</option>
                <option value="new_york">New York</option>
                <option value="toronto">Toronto</option>
                <option value="london">London</option>
                <option value="addis_ababa">Addis Ababa</option>
                </select>
          </div>
          {/* Zip Code Input */}
          <div>
          <label
                htmlFor="zip_code"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Zip Code
              </label>
              <input
                type="text"
                id="ZipCode"
                name="ZipCode"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Zip Code"
                required
                onChange={changeHandler}
              />
          </div>
          {/* Image File Upload */}
          <div>
              <label
                htmlFor="image_upload"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Attach an Image
              </label>
              <input
              onChange={changeHandler}
                type="file"
                id="Picture"
                name="Picture"
                accept="image/*"  // Allows only image files
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400"
              />
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
                PNG, JPG, or JPEG (Max file size: 10MB)
              </p>
            </div>
          </div>
            {/* Google Maps Embed */}
            <div className="mt-6">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Location on Google Maps (optional)
            </label>
            <iframe
              src="https://www.google.com/maps/@7.9889412,39.4333527,298356m/data=!3m1!1e3?entry=ttu&g_ep=EgoyMDI0MTAxNC4wIKXMDSoASAFQAw%3D%3D"
              width="100%"
              height="250"
              allowFullScreen=""
              loading="lazy"
              title="Google Maps"
            ></iframe>
          </div>
          
  <div className="m-6">
          <h1 className="text-center">Contact Information</h1>
            </div>
          <div className="grid gap-6 mb-6 sm:grid-cols-2 ml-3 mr-3">
            <div>
              <label
                htmlFor="fname"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                First Name
              </label>
              <input
                type="text"
                id="fname"
                name="fname"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="John"
                required
                onChange={changeHandler}
              />
            </div>
            <div>
              <label
                htmlFor="lname"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lname"
                name="lname"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Doe"
                required
                onChange={changeHandler}
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Phone number
              </label>
              <input
                type="Number"
                id="phone"
                name="phone"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="123-45-678"
                pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                required
                onChange={changeHandler}
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="you@example.com"
                required
                onChange={changeHandler}
              />
            </div>
          </div>
        <div className="flex justify-center">
          <Button 
            gradientDuoTone="purpleToPink"
            type="submit"
            className="hover:text-green-400 w-10/12 sm:w-8/12 mb-8 mt-8"
          >
            {/* Rout to contact form */}
            Publish
          </Button>
        </div>
        {errorMessage && (
          <Alert className="mt-4" color="failure">
            {errorMessage}
          </Alert>
        )}
        </div>      
      </form>
    </>
  );
};

export default Lost;
