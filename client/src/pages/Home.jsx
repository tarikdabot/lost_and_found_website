import { Link } from 'react-router-dom'; 
import back from '../assets/back.png';
import Service from '../components/Service';
import PostFound from '../post/found/Found'
import { useSelector } from 'react-redux';
 
export default function Home() {
 
 const {currentUser } = useSelector(state => state.user);
  
  return (
    <div>
      <div className="font-bold gap-5 border-b-2 px-8 text-center">
      <h1>Welcome to my LoFs</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Image Section */}
        <div className=" mt-4">
          <div className="max-w-lg">
            <img
              className="h-auto max-w-full rounded-lg sm:"
              src={back}
              alt="image description"
            />
          </div>
        </div>
        {/* Text Section */}
        <div className="grid grid-cols-1 gap-4 mt-4">
          <h1 className="text-2">Recovering your items is as simple as childs play!</h1>
          <p className="text-sm">Recovering your items is as simple as childs play!</p>
        <div className="flex flex-cols gap-4">
        <Link to ={currentUser && (currentUser.isAdmin || currentUser) ? "/lost" : "/signin"} 
        className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">I HAVE LOST</Link>
        <Link to ={currentUser && (currentUser.isAdmin || currentUser) ? "/found" : "/signin"} 
        className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">I HAVE FOUND</Link>
        </div>
        </div>
      </div>
    </div> 
    <Service/>
    <PostFound/>
       
    </div>
  );
}