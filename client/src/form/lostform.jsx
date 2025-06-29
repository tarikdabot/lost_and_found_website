import { Button } from "flowbite-react";

const Found = () => {
  const { dispatch } = useWorkoutsContext()

  const [Picture, setPicture] = useState('')
  const [itemName, setitemName] = useState('')
  const [category, setcategory] = useState('')
  const [whenLost, setwhenLost] = useState('')
  const [whereLost, setwhereLost] = useState('')
  const [country, setcountry] = useState('')
  const [city, setcity] = useState('')
  const [brand, setbrand] = useState('')
  const [ZipCode, setZipCode] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const lostitems = {Picture,itemName,  category,  whenLost,whereLost,country,city,brand,ZipCode}

    const response = await fetch('/api/lostitem', {
      method: 'POST',
      body: JSON.stringify(lostitems),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setEmptyFields([])
      setError(null)
      setPicture('')
      setitemName('')
      setcategory('')
      setPicture('')
      setwhenLost('')
      setwhereLost('')
      setcountry('')
      setcity('')
      setbrand('')
      setZipCode('') 
      dispatch({type: 'CREATE_WORKOUT', payload: json})
    }
  return <>
      <form className="" onSubmit={handleSubmit}>
        <div className="mr-3 ml-3 ">
          <h3 className="m-5">
            Please be descriptive when submitting your lost property report, the more information you give us, the better chance you have of retrieving your items.
          </h3>
          <div className="grid gap-6 mb-6 sm:grid-cols-2 ml-3 mr-3">
            <div>
              <label
                htmlFor="What was Lost"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                What was Lost
              </label>
              <input
                type="text"
                id="first_name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Item name"
                required
                onChange={(e) => setwhereLost(e.target.value)} 
        value={whereLost}
        className={emptyFields.includes('title') ? 'error' : ''}
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
                id="category"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="category"
                required
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
                id="location_lost"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="e.g., Taxi, Park"
                required
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
                id="date_lost"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
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
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
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
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
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
                id="zip_code"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Zip Code"
                required
              />
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
          <Button
              gradientDuoTone="purpleToPink"
              type="submit"
              className="hover:text-green-400 w-10/12 sm:w-8/12"
            >
              NEXT
            </Button>
        </div>      
      </form>
    </>
  }
export default Found
