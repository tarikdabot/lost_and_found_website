import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DashSidebar from '../components/DashSidbar';
import DashProfile from '../components/DashProfile';
import DashUsers from '../components/DashUsers';
import DashboardComp from '../components/DashbarComp';
import PostLost from '../post/lost';
import PostFound from '../post/found/Found';

export default function Dashboard() {
  const location = useLocation();
  const [tab, setTab] = useState('');
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  return (
    <div className='min-h-screen flex flex-col sm:flex-row'>
      <div className='sm:w-2/4'>
        {/* Sidebar */}
        <DashSidebar />
      </div>
      {/* profile... */}
      {tab === 'profile' && <DashProfile />}
      {/* losts... */}
      {tab === 'founds' && <PostFound />}
      {tab === 'losts' && <PostLost />}
      {/* users */}
      {tab === 'users' && <DashUsers />}
      
      {/* dashboard comp */}
      {tab === 'dash' && <DashboardComp />}
    </div>
  );
}