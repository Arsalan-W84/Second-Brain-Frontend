
import { BarsIcon } from "../assets/SidebarIcons/barsIcon";
import { SidebarItem } from "./SidebarItem";
import { PhotoIcon } from "../assets/SidebarIcons/photoIcon";
import { VideoIcon } from "../assets/SidebarIcons/videoIcon";
import { ArticleIcon } from "../assets/SidebarIcons/ArticleIcons";
import { TweetIcon } from "../assets/SidebarIcons/TweetIcon";
import { useFilterType, useSidebarstore } from "../store";
import { HomeIcon } from "../assets/SidebarIcons/HomeIcon";

export const Sidebar = () => {
    // const [show , setShow] = useState(true);
    const show = useSidebarstore((state) => state.show);
    const toggleshow = useSidebarstore((state) => state.toggleshow);

    const setFilter = useFilterType((state) => state.setFilter);
    const Filter = useFilterType((state) => state.Filter);

    return (
        <div className={`h-screen ${ (show)?'w-60':'w-16'} transition-all duration-300 overflow-hidden bg-gray-200 sticky top-0 `}>
            <button className={`m-3 p-1 hover:bg-gray-300 transition-all duration-300 rounded-full`} onClick={toggleshow}>{<BarsIcon />}</button>
            <SidebarItem text='Home' endIcon={ <HomeIcon size="md" />} onclick={()=> {setFilter("all")}} isActive={Filter === 'all'} />
            <SidebarItem  text="Images"  endIcon={<PhotoIcon />} onclick={()=> setFilter("photo")}  isActive={Filter === 'photo'}/>
            <SidebarItem  text="Videos"  endIcon={<VideoIcon /> } onclick={()=> setFilter("video")} isActive={Filter === 'video'} />
            <SidebarItem  text="Articles" endIcon={<ArticleIcon />} onclick={()=> setFilter("article")} isActive={Filter === 'article'}/>
            <SidebarItem  text="Tweets" endIcon={<TweetIcon />}  onclick={()=> setFilter("tweet")}  isActive={Filter === 'tweet'} />
            {/* <SidebarItem  text="Reels" endIcon={<ReelIcon />}  onclick={()=> setFilter("reel")}  isActive={Filter === 'reel'} /> */}
        </div>
    );
}