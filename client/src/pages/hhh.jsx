import { Button, Navbar } from 'flowbite-react';
import { Link, useLocation} from 'react-router-dom';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '../redux/theme/themeSlice';
export default function Header() {
  const path = useLocation().pathname;
   
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.theme);
  return (
    <Navbar className="border-b-2" fluid>
      <div className="flex justify-between items-center w-full">
        
        {/* Left-aligned link */}
        <Link
          to="/"
          className="mr-auto self-center whitespace-nowrap text-sm sm:text-xl font-semibold dark:text-white"
        >
          <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
            TARIK
          </span>
          Blog
        </Link>

        {/* Right-aligned content */}
        <div className="flex items-center gap-2 sm:order-last">
          {/* Navbar Links - visible on larger screens */}
          <div className="hidden sm:flex gap-4">
            <Link to="/" className={`Navbar.Link ${path === '/' ? 'active' : ''}`}>
              Home
            </Link>
            <Link to="/about" className={`Navbar.Link ${path === '/about' ? 'active' : ''}`}>
              About
            </Link>
            <Link to="/lost" className={`Navbar.Link ${path === '/lost' ? 'active' : ''}`}>
              Lost
            </Link>
            <Link to="/found" className={`Navbar.Link ${path === '/found' ? 'active' : ''}`}>
              Found
            </Link>
            <Link to="/projects" className={`Navbar.Link ${path === '/projects' ? 'active' : ''}`}>
              Projects
            </Link>
            <Link to="/dashboard" className={`Navbar.Link ${path === '/Dashboard' ? 'active' : ''}`}>
              Dashboard
            </Link>
          </div>

          {/* Theme Toggle Button - hidden on desktop */}
          <Button
            className="w-12 h-10 hidden sm:inline"
            color="gray"
            pill
            onClick={() => dispatch(toggleTheme())}
          >
            {theme === 'light' ? <FaSun /> : <FaMoon />}
          </Button>

          {/* Sign In Button */}
          <a href="/signin">
            <Button gradientDuoTone="purpleToBlue" outline>
              Sign In
            </Button>
          </a>

          {/* Navbar Toggle Button for small screens */}
          <Navbar.Toggle className="sm:hidden" />
        </div>

        {/* Mobile view Navbar Links */}
        <Navbar.Collapse>
          <Navbar.Link active={path === '/'} as={'div'}>
            <Link to="/">Home</Link>
          </Navbar.Link>
          
          <Navbar.Link active={path === '/about'} as={'div'}>
            <Link to="/about">About</Link>
          </Navbar.Link>

          <Navbar.Link active={path === '/lost'} as={'div'}>
            <Link to="/lost">Lost</Link>
          </Navbar.Link>
          

          <Navbar.Link active={path === '/found'} as={'div'}>
            <Link to="/found">Found</Link>
          </Navbar.Link>
          
          <Navbar.Link active={path === '/projects'} as={'div'}>
            <Link to="/projects">Projects</Link>
          </Navbar.Link>
          <Navbar.Link active={path === '/Dashboard'} as={'div'}>
            <Link to="/projects">Dashboard</Link>
          </Navbar.Link>
       
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}  