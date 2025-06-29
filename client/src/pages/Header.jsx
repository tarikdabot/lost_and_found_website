import { Avatar, Button, Dropdown, Navbar } from 'flowbite-react';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { toggleTheme } from '../redux/theme/themeSlice';
 import {signoutSuccess} from '../redux/user/userSlice'
 
export default function Header() {
  
  const path = useLocation().pathname;
    const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.theme);
  const handleSignout = async () => {
    try {
      const res = await fetch('/api/user/signout', {
        method: 'POST',
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

 
  return (
    <Navbar className='border-b-2 flex items-center '>
      <Link
        to='/'
        className='self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white'
      >
        <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
         LOF
        </span>
        S
      </Link>
      
          {/* Navbar Links - visible on larger screens */}
          <div className="hidden sm:flex 
          gap-5 
       ">
            <Link to= "/" className={`Navbar.Link ${path === '/' ? 'active' : ''}`}>
              Home
            </Link>
            <Link to="/about" className={`Navbar.Link ${path === '/about' ? 'active' : ''}`}>
              About
            </Link>
           
            <Link 
              to={currentUser && (currentUser.isAdmin || currentUser) ? "/lost" : "/signin"} 
              className={`Navbar.Link ${path === '/lost' ? 'active' : ''}`}
            >
              Lost
            </Link>
            <Link 
              to={currentUser && (currentUser.isAdmin || currentUser) ? "/found" : "/signin"} 
              className={`Navbar.Link ${path === '/found' ? 'active' : ''}`}
            >
              Found
            </Link>
            <Link 
              to={currentUser && (currentUser.isAdmin || currentUser) ? "/recent-post" : "/signin"} 
              className={`Navbar.Link ${path === '/recent-post' ? 'active' : ''}`}
            >
              RecentPost
            </Link>

            
          </div>

        <Button
          className='w-12 h-10  '
          color='gray'
          pill
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === 'light' ? <FaSun /> : <FaMoon />}
        </Button>
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar alt={currentUser.isAdmin ? "Admin" : "User"}  img={currentUser.profilePicture} rounded />
            }
          >
            <Dropdown.Header>
              <span className='block text-sm'>@{currentUser.username}</span>
              <span className='block text-sm font-medium truncate'>
                {currentUser.email}
              </span>
            </Dropdown.Header>
            <Link to={'/dashboard?tab=profile'}>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>
            <Dropdown.Divider />
           <Dropdown.Divider />
            <Dropdown.Item onClick={handleSignout}>Sign out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to='/signin'>
            <Button gradientDuoTone='purpleToBlue' outline>
              Sign In
            </Button>
          </Link>
        )}
        <Navbar.Toggle className='sm:hidden md:inline-block'/>
       
      


      <Navbar.Collapse className='sm:hidden'>
        <Navbar.Link active={path === '/'} as={'div'}>
          <Link to='/'>Home</Link>
        </Navbar.Link>
        <Navbar.Link active={path === '/about'} as={'div'}>
          <Link to='/about'>About</Link>
        </Navbar.Link>
        <Navbar.Link active={path === '/lost'} as={'div'}>
          <Link to='/lost'>Lost</Link>
        </Navbar.Link>
        <Navbar.Link active={path === '/found'} as={'div'}>
          <Link to='/found'>Found</Link>
        </Navbar.Link>
        <Navbar.Link active={path === '/recent-post'} as={'div'}>
          <Link to='/recent-post'>RecentPost</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}