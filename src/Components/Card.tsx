import { DeleteIcon } from "../assets/Deleteicon";
import { VideoIcon } from "../assets/SidebarIcons/videoIcon";
import { TweetIcon } from "../assets/SidebarIcons/TweetIcon";
import { ArticleIcon } from "../assets/SidebarIcons/ArticleIcons";
import { PhotoIcon } from "../assets/SidebarIcons/photoIcon";
import { LinkedInIcon } from "../assets/SidebarIcons/LinkedInIcon";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Tweet } from "../Tweet";
import { LinkedInPost } from "../LinkedInPost";


interface Cardprops {
    key : string ;
    id: string ;
    userId : string;
    title : string;
    link : string ;
    body : string,
    type : "video" | "tweet" | "article" | "photo" | "linkedin" ; 
}

const Icons = {
    video : <VideoIcon /> ,
    tweet : <TweetIcon size="sm" /> , 
    article : <ArticleIcon /> ,
    photo : <PhotoIcon />,
    linkedin : <LinkedInIcon size="sm" />
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
        <div  className={`mt-10 ml-10 p-2 bg-gray-100 w-85 h-95 rounded-lg border border-slate-300`} >
            <div>
               <div className="p-2 flex justify-between items-center">
                    <div className={`flex gap-2`}>    
                    {Icons[props.type]} <h1> {props.title} </h1>
                    </div>
                    <div className="flex gap-2"> 
                        <button className="p-2 hover:bg-gray-300 rounded-full" onClick={DeleteContent}> {<DeleteIcon size="sm"/>} </button>
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

                    {props.type === "linkedin" && (
                        <div className="p-2 border border-gray-300 rounded-2xl max-h-[250px] overflow-y-auto"> 
                            <LinkedInPost url={props.link} title={props.title} />
                            <div><a href={props.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                            Full Post
                            </a></div>
                        </div>
                        
                    )}
                </div>

                <div className="mt-2 p-1 text-black text-md">{props.body}</div>

            </div>
        </div>
    );
}



