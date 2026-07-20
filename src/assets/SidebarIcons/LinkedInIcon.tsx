import { sizes, type IconProps } from "../IconProps";

export const LinkedInIcon = (props: IconProps) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={sizes[props.size]} fill="currentColor">
            <path d="M6.94 8.5H3.56V20h3.38V8.5ZM5.25 3A1.97 1.97 0 1 0 5.3 6.94 1.97 1.97 0 0 0 5.25 3ZM20.43 13.4c0-3.46-1.85-5.07-4.32-5.07-1.99 0-2.88 1.1-3.38 1.87V8.5H9.37V20h3.36v-5.7c0-1.5.29-2.95 2.14-2.95 1.82 0 1.85 1.7 1.85 3.05V20h3.38l.33-6.6Z" />
        </svg>
    );
};
