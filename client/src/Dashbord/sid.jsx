import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {
   
  HiArrowNarrowUp,
  HiDocumentText,
  
} from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { Button, Table } from 'flowbite-react';
export default function DashboardComp() {
  const [Lost, setLost] = useState([]); 
  const [totalPostLost, setTotalPostLost] = useState(0);
   
  const [lastMonthLost, setLastMonthLost] = useState(0);
   
  const { currentLostItem } = useSelector((state) => state.LostItem);
  useEffect(() => {
    const fetchLost = async () => {
      try {
        const res = await fetch('/api/lostitem/');
        const data = await res.json();
        if (res.ok) {
            setLost(data.Lost);
          setTotalPostLost(data.totalPostLost);
          setLastMonthLost(data.lastMonthLost);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    
    if (currentLostItem) {
      // fetchUsers();
      fetchLost();
      // fetchComments();
    }
  }, [currentLostItem]);
  return (
    <div className='p-3 md:mx-auto'>
      <div className='flex-wrap flex gap-4 justify-center'>
        <div className='flex flex-col p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md'>
          <div className='flex justify-between'>
            <div className=''>
              <h3 className='text-gray-500 text-md uppercase'>Total Lost Items</h3>
              <p className='text-2xl'>{totalPostLost}</p>
            </div>
            <HiDocumentText className='bg-lime-600  text-white rounded-full text-5xl p-3 shadow-lg' />
          </div>
          <div className='flex  gap-2 text-sm'>
            <span className='text-green-500 flex items-center'>
              <HiArrowNarrowUp />
              {lastMonthLost}
            </span>
            <div className='text-gray-500'>Last month</div>
          </div>
        </div>
        <div className='flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-800'>
          <div className='flex justify-between  p-3 text-sm font-semibold'>
            <h1 className='text-center p-2'>Recent Lost</h1>
            <Button outline gradientDuoTone='purpleToPink'>
              <Link to={'/dashboard?tab=Lost'}>See all</Link>
            </Button>
          </div>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Post image</Table.HeadCell>
              <Table.HeadCell>Post Title</Table.HeadCell>
              <Table.HeadCell>Category</Table.HeadCell>
            </Table.Head>
            {Lost &&
              Lost.map((post) => (
                <Table.Body key={post._id} className='divide-y'>
                  <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                    <Table.Cell>
                      <img
                        src={post.image}
                        alt='user'
                        className='w-14 h-10 rounded-md bg-gray-500'
                      />
                    </Table.Cell>
                    <Table.Cell className='w-96'>{post.title}</Table.Cell>
                    <Table.Cell className='w-5'>{post.category}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
          </Table>
        </div>
      </div>
    </div>
  );
}