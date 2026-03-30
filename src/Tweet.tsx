import { useEffect, useRef } from "react";

declare global {
  interface Window {
    twttr: any;
  }
}

export const Tweet = ({ url }: { url: string }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tweetId = url.split("/status/")[1]?.split("?")[0];

    const renderTweet = () => {
      if (window.twttr && ref.current) {
        ref.current.innerHTML = ""; // 🧹 clear old embeds
        window.twttr.widgets.createTweet(tweetId, ref.current);
      }
    };

    if (!window.twttr) {
      const script = document.createElement("script");
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      script.onload = renderTweet;

      document.body.appendChild(script);
    } else {
      renderTweet();
    }
  }, [url]);

  return <div ref={ref}></div>;
};