import { DeleteIcon } from "../assets/Deleteicon";
import { ShareIcon } from "../assets/ShareIcon";
import { VideoIcon } from "../assets/SidebarIcons/videoIcon";
import { TweetIcon } from "../assets/SidebarIcons/TweetIcon";
import { ArticleIcon } from "../assets/SidebarIcons/ArticleIcons";
import { PhotoIcon } from "../assets/SidebarIcons/photoIcon";
import axios from "axios";
import { BACKEND_URL } from "../config";

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
    tweet : <TweetIcon /> , 
    article : <ArticleIcon /> ,
    photo : <PhotoIcon />
};
export const Card = (props: Cardprops) => {

    async function DeleteContent () {
        await axios.delete(`${BACKEND_URL}` + '/api/v1/content', {
        headers: {
          token: localStorage.getItem("token"),
        },
        data : {
            contentId : props.id
        }
      });
      alert("Content deleted!");

    }   

    return (
        <div  className={`mt-10 ml-10 p-2 bg-gray-200 w-90 h-100 rounded-lg border border-slate-100`} >
            <div>
               <div className="p-2 flex justify-between items-center">
                    <div className={`flex gap-2`}>    
                    {Icons[props.type]} <h1> {props.title} </h1>
                    </div>
                    <div className="flex gap-2"> 
                        <button className="p-2 hover:bg-gray-300 rounded-full" > { <ShareIcon size="sm"/>} </button>
                        <button className="p-2 hover:bg-gray-300 rounded-full" onClick={DeleteContent}> {<DeleteIcon size="sm"/>} </button>
                    </div> 
                 
                </div>
                
                <div> 
                    {props.type == 'article' && (<a href={props.link} target="_blank" className="text-blue-500 underline">Read Article</a>)}

                    {props.type === "video" && (
                        <iframe
                            className="w-full rounded"
                            src={props.link}
                            title={props.title}
                            allowFullScreen
                        />
                    )}

                    {props.type === "tweet" && (
                        <a href={props.link} target="_blank" rel="noopener noreferrer">
                        View Tweet
                        </a>
                    )}

                    {props.type === "photo" && (
                        <img src={props.link} alt={props.title} className="rounded w-full" />
                    )}
                </div>

            </div>
        </div>
    );
}




// const Contents = useUserContents((state) => state.Contents);