
import './App.css'
import { PlusIcon } from './assets/plusIcon'
import { ShareIcon } from './assets/ShareIcon'
import { ArticleIcon } from './assets/SidebarIcons/ArticleIcons'
import { PhotoIcon } from './assets/SidebarIcons/photoIcon'
import { TweetIcon } from './assets/SidebarIcons/TweetIcon'
import { VideoIcon } from './assets/SidebarIcons/videoIcon'
import { Button } from './Components/Button'
import { Card } from './Components/Card'
import { Sidebar } from './Components/Sidebar'

function App() {

  return (
    <div className='flex'>
      <div>
        <Sidebar />
      </div>
      
      <div className='w-screen bg-red-200'>
        <div className='bg-red-300 flex justify-between items-center'>
          <div className='ml-3 text-3xl'>
            <h1>ALL NOTES</h1>
          </div>

          <div className='flex'>
            <Button text='Share Brain' variant='secondary' onClick={()=>{}} size='lg' starticon={<ShareIcon size='md'/>} />
            <Button text='Add Content' variant='primary' onClick={()=>{}} size='lg' starticon={< PlusIcon size='md' />} />
          </div>
        </div>

        <div className='grid grid-cols-3'>
          {/* CARD COMPONETS ENTRY HERE */}
          <Card title='Second Brain Todo' type='article' typeIcon={<ArticleIcon />}/>
          <Card title='Trump Tweet' type='tweet' typeIcon={<TweetIcon />}/>
          <Card title='Sleep ASMR'  type='video' typeIcon={<VideoIcon />}/>
          <Card title='Photo of Debasis' type='photo' typeIcon={<PhotoIcon />}/>
        </div>
      </div>
    </div>        
  )
}

export default App

