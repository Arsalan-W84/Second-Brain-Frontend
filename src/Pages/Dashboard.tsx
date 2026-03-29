import { PlusIcon } from '../assets/plusIcon'
import { ShareIcon } from '../assets/ShareIcon'
import { ArticleIcon } from '../assets/SidebarIcons/ArticleIcons'
import { PhotoIcon } from '../assets/SidebarIcons/photoIcon'
import { TweetIcon } from '../assets/SidebarIcons/TweetIcon'
import { VideoIcon } from '../assets/SidebarIcons/videoIcon'
import { AddContentModal } from '../Components/AddContentModal'
import { Button } from '../Components/Button'
import { Card } from '../Components/Card'
import { Sidebar } from '../Components/Sidebar'
import { useAddContentStore } from '../store'

export function DashBoard() {
  const ToggleModalShow = useAddContentStore((state) => state.ToggleModalShow);
  const ModalShow = useAddContentStore((state) => state.ModalShow);
  return (
    <div className='flex relative'>
      <div>
        <Sidebar />
      </div>
      
      {ModalShow && <AddContentModal /> }

      <div className='w-screen bg-red-200 relative'>
        <div className='bg-red-300 flex justify-between items-center'>
          <div className='ml-3 text-3xl'>
            <h1>ALL NOTES</h1>
          </div>

          <div className='flex'>
            <Button text='Share Brain' variant='secondary' onClick={()=>{}} size='lg' starticon={<ShareIcon size='md'/>} />
            <Button text='Add Content' variant='primary' onClick={ToggleModalShow} size='lg' starticon={< PlusIcon size='md' />} />
          </div>
        </div>


        <div className='grid grid-cols-3'>
          <Card title='Second Brain Todo' type='article' typeIcon={<ArticleIcon />}/>
          <Card title='Trump Tweet' type='tweet' typeIcon={<TweetIcon />}/>
          <Card title='Sleep ASMR'  type='video' typeIcon={<VideoIcon />}/>
          <Card title='Photo of Debasis' type='photo' typeIcon={<PhotoIcon />}/>
        </div>
      </div>
    </div>        
  )
}

