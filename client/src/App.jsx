import { BrowserRouter,Routes,Route } from "react-router-dom"
import Header from "./pages/Header"
import Home from "./pages/Home"
import About from "./pages/About"
import Signins from "./pages/Signin"
import Signup from "./pages/Signup"
import Dashboard from "./pages/Dashboard"
// import Project from "./pages/Project"
import Lost from "./pages/Lost"
import Found from "./pages/Foude"
import Footter from "./components/Footers" 
 import PrivateRoute from "./components/PrivateRoute"
// import OnlyAdminPrivateRoute from "./components/OnlyAdminPrivateRoute"
import ScrollToTop from "./components/ScrollTop"
import Recentpost from "./pages/recentpost"

 
const App = () => {
   return (
    <BrowserRouter>
      <ScrollToTop/>
      <Header/>
      <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/lost" element={<Lost/>}/>
      <Route path="/found" element={<Found/>}/>
      <Route path="/signin" element={<Signins/>}/>
      <Route path="/signup" element={<Signup/>}/>
        <Route element={<PrivateRoute/>}>
          <Route path='/dashboard' element={<Dashboard />} />
        </Route>
        {/* <Route element={<OnlyAdminPrivateRoute />}>
          <Route path='/Recentpost' element={<Recentpost/>
          } />
        </Route> */}
        <Route path="/recent-post" element={<Recentpost/>}/>
      </Routes>
      <Footter />
    </BrowserRouter>
  );
}
export default App;
