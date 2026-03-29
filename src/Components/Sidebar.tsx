
import { BarsIcon } from "../assets/SidebarIcons/barsIcon";
import { SidebarItem } from "./SidebarItem";
import { PhotoIcon } from "../assets/SidebarIcons/photoIcon";
import { VideoIcon } from "../assets/SidebarIcons/videoIcon";
import { ArticleIcon } from "../assets/SidebarIcons/ArticleIcons";
import { TweetIcon } from "../assets/SidebarIcons/TweetIcon";
import { ReelIcon } from "../assets/SidebarIcons/ReelIcon";
import { useSidebarstore } from "../store";

export const Sidebar = () => {
    // const [show , setShow] = useState(true);
    const show = useSidebarstore((state) => state.show);
    const toggleshow = useSidebarstore((state) => state.toggleshow);
    return (
        <div className={`h-screen ${ (show)?'w-60':'w-16'} transition-all duration-300 overflow-hidden bg-gray-200 sticky top-0 `}>
            <button className={`m-3 p-1 hover:bg-gray-300 transition-all duration-300 rounded-full`} onClick={toggleshow}>{<BarsIcon />}</button>
            <SidebarItem  text="Images"  endIcon={<PhotoIcon />}/>
            <SidebarItem  text="Videos"  endIcon={<VideoIcon /> }/>
            <SidebarItem  text="Articles" endIcon={<ArticleIcon />} />
            <SidebarItem  text="Tweets" endIcon={<TweetIcon />} />
            <SidebarItem  text="Reels" endIcon={<ReelIcon />} />
        </div>
    );
}