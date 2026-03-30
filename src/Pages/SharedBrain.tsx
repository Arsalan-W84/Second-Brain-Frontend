
import { useEffect } from 'react';
import { Sidebar } from '../Components/Sidebar'
import {  useFilterType , useSharedUserContents, type Content } from '../store'
import { ShowCard } from '../Components/showCard';

export function SharedBrain() {

    const path = window.location.pathname;
    const shareId = path.split("/").pop();

    const Contents = useSharedUserContents((state) => state.Contents);
    const SetContents = useSharedUserContents((state) => state.SetContents);
    if(shareId){
        useEffect(() => {
            SetContents(shareId);
        } , [])
    }
     //apply filter to Contents before mapping it to cards
    const Filter = useFilterType((state) => state.Filter);

    const filteredContents = Contents.filter((item) => {

        if(Filter == 'all') {return true;}

        else{
            return item.type === Filter;
        }
    });

  return (
    <div className='flex relative'>
      <div>
        <Sidebar />
      </div>


      <div className='w-screen bg-gray-200 relative'>
        <div className='bg-gray-200 flex justify-between items-center'>
          <div className='m-3 p-2 text-3xl'>
            <h1>ALL NOTES</h1>
          </div>

        </div>

        <div className='grid grid-cols-3'>
          {
            filteredContents.map((content : Content) => <ShowCard 
              key= {content._id}
              id={content._id}
              userId = {content.userId}
              title={content.title} 
              link={content.link} 
              type={content.type} 
            /> )
          }
        </div>
      </div>
    </div>        
  )
}

