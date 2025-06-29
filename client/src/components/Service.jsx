import { FaUsers, FaIdCard, FaCcVisa, FaMoneyBillWave, FaFile, FaCar, FaShoppingCart, FaUserTag, FaHandshake } from 'react-icons/fa'; // Import the specific icons

const Service = () => {
  return (
    <>
      <div className="container border-b-2">
        <h1 className="text-center my-5 text-2xl font-bold">Our Services</h1>
        <div className="grid grid-cols-2 mb-4 sm:grid-cols-3 gap-1 w-full mr-auto ml-auto">
          <div className="bg-orange-400 rounded-lg p-5 hover:shadow transition flex flex-col items-center">
            <FaUsers size={40} className="mb-3 icon" /> {/* Use the imported icon */}
            <h2 className="text-center">Human</h2>
          </div>
          <div className="bg-orange-400 rounded-lg p-5 hover:shadow transition flex flex-col items-center">
            <FaIdCard size={40} className="mb-3 icon" /> {/* Use the imported icon */}
            <h2 className="text-center">ID Card</h2>
          </div>
          <div className="bg-orange-400 rounded-lg p-5 hover:shadow transition flex flex-col items-center">
            <FaCcVisa size={40} className="mb-3 ico  hover:text-green-500" /> {/* Use the imported icon */}
            <h2 className="text-center">VISA Card</h2>
          </div>
          <div className="bg-orange-400 rounded-lg p-5 hover:shadow transition flex flex-col items-center">
            <FaMoneyBillWave size={40} className="mb-3 icon" /> {/* Use the imported icon */}
            <h2 className="text-center">ATM</h2>
          </div>
          <div className="bg-orange-400 rounded-lg p-5 hover:shadow transition flex flex-col items-center">
            <FaFile size={40} className="mb-3 icon" /> {/* Use the imported icon */}
            <h2 className="text-center">Document</h2>
          </div>
          <div className="bg-orange-400 rounded-lg p-5 hover:shadow transition flex flex-col items-center">
            <FaCar size={40} className="mb-3 icon" /> {/* Use the imported icon */}
            <h2 className="text-center">Car</h2>
          </div>
        </div>
        <h1 className="text-center my-5 text-2xl font-bold">How TROOV help you
        How it works</h1>
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-1 w-full mr-auto ml-auto'>
          <div className="bg-orange-400 rounded-lg p-5 flex flex-col items-center">
            <div className='w-full flex flex-col items-center hover:shadow transition'>
              <FaShoppingCart size={60} className="mb-3 icon" /> {/* Use the imported icon */}
            </div>
            <h2 className="text-center text-2xl font-semi-bold">Report a lost or found item</h2>
            <hr className="my-6 border-t-2 border-gray-300 w-10" />
            <p className='text-center text-sm'>Fill the declaration and give as much detail as possible (the location of loss, the type of item, the description) to help the algorithm to</p>
          </div>
          <div className="bg-orange-400 rounded-lg p-5 flex flex-col items-center">
            <div className='w-full flex flex-col items-center hover:shadow transition'>
              <FaUserTag size={60} className="mb-3 icon" /> {/* Use the imported icon */}
            </div>
            <h2 className="text-center text-2xl font-semi-bold">Prove ownership of the item</h2>
            <hr className="my-6 border-t-2 border-gray-300 w-10" />
            <p className='text-center text-sm'>Once the lost item "matched", prove who you are thanks to a security question (ex: describe the shell of your phone, ...). Then, our partner who found this item will be able to validate that this is yours</p>
          </div>
          <div className="bg-orange-400 rounded-lg p-5 flex flex-col items-center">
            <div className='w-full flex flex-col items-center hover:shadow transition'>
              <FaHandshake size={60} className="mb-3 icon" /> {/* Use the imported icon */}
            </div>
            <h2 className="text-center text-2xl font-semi-bold">Get it back!</h2>
            <hr className="my-6 border-t-2 border-gray-300 w-10" />
            <p className='text-center text-sm'>As soon as you are authenticated, you receive the information to pick it up or have it delivered. Remember to communicate the reference number to the person who found the item, so they can contact you if they need more information or if there is any problem with the items number found</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Service;
