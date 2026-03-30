
import { useEffect } from 'react';
import { Card } from '../Components/Card'
import { Sidebar } from '../Components/Sidebar'
import {  useFilterType , useSharedUserContents, type Content } from '../store'

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


      <div className='w-screen bg-red-200 relative'>
        <div className='bg-red-300 flex justify-between items-center'>
          <div className='ml-3 text-3xl'>
            <h1>ALL NOTES</h1>
          </div>

        </div>

        <div className='grid grid-cols-3'>
          {
            filteredContents.map((content : Content) => <Card 
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

