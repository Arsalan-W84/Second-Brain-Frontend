
import { useEffect } from 'react'
import { PlusIcon } from '../assets/plusIcon'
import { ShareIcon } from '../assets/ShareIcon'
import { AddContentModal } from '../Components/AddContentModal'
import { Button } from '../Components/Button'
import { Card } from '../Components/Card'
import { Sidebar } from '../Components/Sidebar'
import { useAddContentStore, useFilterType, useShareContentStore, useUserContents, type Content } from '../store'
import { ShareContentModal } from '../Components/ShareContentModal'

export function DashBoard() {

  const Contents = useUserContents((state) => state.Contents)
  const SetContents = useUserContents((state) => state.SetContents)


  useEffect(()=> {
     SetContents();
     
  } , []);
  //apply filter to Contents before mapping it to cards
  const Filter = useFilterType((state) => state.Filter);
  const filteredContents = Contents.filter((item) => {
      if(Filter == 'all') {return true;}

      else{
        return item.type === Filter;
      }
  });

  const ToggleModalShow = useAddContentStore((state) => state.ToggleModalShow);
  const ToggleShareModalShow = useShareContentStore((state) => state.ToggleShareModalShow);
  const ModalShow = useAddContentStore((state) => state.ModalShow);
  const ShareModalShow = useShareContentStore((state)=> state.ShareModalShow);
  return (
    <div className='flex relative'>
      <div>
        <Sidebar />
      </div>
      
      {ModalShow && <AddContentModal /> }
      {ShareModalShow && <ShareContentModal />}

      <div className='w-screen bg-red-200 relative'>
        <div className='bg-red-300 flex justify-between items-center'>
          <div className='ml-3 text-3xl'>
            <h1>ALL NOTES</h1>
          </div>

          <div className='flex'>
            <Button text='Share Brain' variant='secondary' onClick={ToggleShareModalShow} size='lg' starticon={<ShareIcon size='md'/>} />
            <Button text='Add Content' variant='primary' onClick={ToggleModalShow} size='lg' starticon={< PlusIcon size='md' />} />
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

