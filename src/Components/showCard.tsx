import { VideoIcon } from "../assets/SidebarIcons/videoIcon";
import { TweetIcon } from "../assets/SidebarIcons/TweetIcon";
import { ArticleIcon } from "../assets/SidebarIcons/ArticleIcons";
import { PhotoIcon } from "../assets/SidebarIcons/photoIcon";

import { Tweet } from "../Tweet";

interface Cardprops {
    key : string ;
    id: string ;
    userId : string;
    title : string;
    link : string ;
    type : "video" | "tweet" | "article" | "photo" ; 
}

const Icons = {
    video : <VideoIcon /> ,
    tweet : <TweetIcon size="sm" /> , 
    article : <ArticleIcon /> ,
    photo : <PhotoIcon />
};
export const ShowCard = (props: Cardprops) => {


    return (
        <div  className={`mt-10 ml-10 p-2 bg-gray-100 w-85 h-95 rounded-lg border border-slate-300`} >
            <div>
               <div className="p-2 flex justify-between items-center">
                    <div className={`flex gap-2`}>    
                    {Icons[props.type]} <h1> {props.title} </h1>
                    </div>
                 
                </div>
                
                <div className="mt-5"> 
                    {props.type == 'article' && (<a href={props.link} target="_blank" className="text-blue-500 underline">Read Article</a>)}

                    {props.type === "video" && (
                        <div className="p-2 border border-gray-300 rounded-2xl">
                            <iframe
                                className="w-full rounded"
                                src={props.link}
                                title={props.title}
                                allowFullScreen
                            />
                        </div>
                    )}

                    {props.type === "tweet" && (
                        <div className="p-1 border border-gray-300 rounded-2xl ">
                            <div className="max-h-[250px] overflow-y-auto">
                                <Tweet url={props.link} />
                            </div>
                            <a href={props.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                            Full tweet
                            </a>
                        </div>
                    )}

                    {props.type === "photo" && (
                        <img src={props.link} alt={props.title} className="rounded w-full" />
                    )}
                </div>

            </div>
        </div>
    );
}




