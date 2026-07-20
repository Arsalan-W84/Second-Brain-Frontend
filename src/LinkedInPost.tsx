import { getLinkedInEmbedUrl } from "./utils/embedLinks";

interface LinkedInPostProps {
  url: string;
  title: string;
}

export const LinkedInPost = ({ url, title }: LinkedInPostProps) => {
  const embedUrl = getLinkedInEmbedUrl(url);
  //console.log(embedUrl);

  if (!embedUrl) {
    return (
      <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
        View LinkedIn post
      </a>
    );
  }

  return (
    <div className="p-1 border border-gray-300 rounded-2xl">
      <iframe 
          className="w-full min-h-[500px]"
          src={embedUrl}
          title={title} 
          allowFullScreen>
      </iframe>
    </div>
  );
};
