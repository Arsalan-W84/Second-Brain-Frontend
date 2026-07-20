export const getYoutubeEmbedUrl = (url: string) => {
    const trimmedUrl = url.trim();

    if (trimmedUrl.includes("youtube.com/embed/")) {
        return trimmedUrl;
    }

    const shortUrlMatch = trimmedUrl.match(/youtu\.be\/([^?&/]+)/);
    if (shortUrlMatch) {
        return `https://www.youtube.com/embed/${shortUrlMatch[1]}`;
    }

    const watchUrlMatch = trimmedUrl.match(/[?&]v=([^&]+)/);
    if (watchUrlMatch) {
        return `https://www.youtube.com/embed/${watchUrlMatch[1]}`;
    }

    return trimmedUrl;
};

export const getLinkedInEmbedUrl = (url: string): string | null => {
    const parsedUrl = new URL(url.trim());
    parsedUrl.search = ""; 
    const trimmedUrl = parsedUrl.toString();

    if (trimmedUrl.includes("linkedin.com/embed/feed/update/urn:li:")) {
        return trimmedUrl;
    }

    const postMatch = trimmedUrl.match(/-(activity|share|ugcPost)-(\d+)/);
    if (postMatch) {
        const type = postMatch[1];
        const id=postMatch[2];
        return `https://www.linkedin.com/embed/feed/update/urn:li:${type}:${id}`;
    }

    // const urnMatch = trimmedUrl.match(/urn:li:(activity|share|ugcPost):(\d+)/);
    // if (urnMatch) {
    //     const urnType = urnMatch[1];
    //     const urnId = urnMatch[2];
    //     return `https://www.linkedin.com/embed/feed/update/urn:li:${urnType}:${urnId}`;
    // }

    if (trimmedUrl.includes("linkedin.com/feed/update/urn:li:")) {
        return trimmedUrl.replace("linkedin.com/feed/update/", "linkedin.com/embed/feed/update/");
    }

    return null;
};
