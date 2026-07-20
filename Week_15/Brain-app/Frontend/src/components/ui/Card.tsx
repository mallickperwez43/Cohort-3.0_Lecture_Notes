import { type ReactElement } from "react";
import { DeleteIcon } from "../../icons/DeleteIcon";
import { ShareIcon } from "../../icons/ShareIcon";
import { YouTubeIcon } from "../../icons/YouTubeIcon";
import { TwitterIcon } from "../../icons/TwitterIcon";
import { DocumentIcon } from "../../icons/DocumentIcon";

interface CardProps {
    title: string;
    link?: string;
    type: "video" | "tweet" | "article" | "image";
    tags?: { title: string }[];
    onDelete: () => void;
};

const typeIconMap: Record<CardProps["type"], ReactElement> = {
    video: <YouTubeIcon size="md" />,
    tweet: <TwitterIcon size="md" />,
    article: <DocumentIcon size="md" />,
    image: <ShareIcon size="md" />,
};

const defaultStylesHeader = "flex gap-2";
const defaulStylesIcon = "text-date-text";

const formattedDate = new Date().toLocaleDateString('en-US', {
    year: "numeric",
    month: "short",
    day: "numeric"
});

export const Card = ({ title, link, type, tags, onDelete }: CardProps) => {
    return (
        <div className="p-8 gap-2 bg-white rounded-xl shadow-md border border-gray-200 w-80 flex flex-col min-h-72">
            {/* Header */}
            <div className="flex justify-between items-center gap-10">
                <div className={`${defaultStylesHeader}`}>
                    <span className={`${defaulStylesIcon}`}>{typeIconMap[type]}</span>
                    <h3 className="text-md font-semibold truncate">{title}</h3>
                </div>
                <div className={`${defaultStylesHeader} ${defaulStylesIcon}`}>
                    <a href={link} target="_blank" className="hover:text-btn-primary-bg transition-colors cursor-pointer">
                        <ShareIcon size="sm" />
                    </a>
                    <button onClick={onDelete} className="hover:text-red-500 transition-colors cursor-pointer">
                        <DeleteIcon size="sm" />
                    </button>
                </div>
            </div>

            {/* Content Body */}
            <div className="w-full pt-4">
                {type === "video" && link && (
                    <div className="relative w-full max-h-40 aspect-video rounded-lg overflow-hidden border border-gray-100">
                        <iframe
                            className="w-full h-full"
                            src={link.replace("watch?v=", "embed/").replace("youtu.be/", "youtube.com/embed/").split("&")[0]}
                            title={title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        />
                    </div>
                )}

                {type === "tweet" && link && (
                    <div className="max-h-40 overflow-auto no-scrollbar border border-slate-50 rounded-lg">
                        <blockquote className="twitter-tweet">
                            <a href={link.replace("x.com", "twitter.com")}></a>
                        </blockquote>
                    </div>
                )}

                {type === "article" && (
                    <div className="flex flex-col gap-2">
                        <div className="py-8 flex flex-col items-center justify-center bg-slate-50 rounded-lg border border-dashed border-slate-200">
                            <span className="text-xs text-slate-400 font-medium">No preview available</span>
                            {link && <span className="text-[10px] text-blue-500 truncate px-4">{link}</span>}
                        </div>
                    </div>
                )}

                {type === "image" && link && (
                    <img
                        src={link}
                        alt={title}
                        className="w-full aspect-square object-cover rounded-lg border border-gray-100"
                    />
                )}
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mt-auto pt-6">
                <span className="px-2 py-0.5 rounded text-sm font-bold tracking-tight bg-btn-secondary-bg text-btn-secondary-text">
                    #{type}
                </span>
                {tags && tags.map(tag => (
                    <span key={tag.title} className="px-2 py-0.5 rounded text-sm font-bold tracking-tight bg-slate-100 text-slate-500">
                        #{tag.title}
                    </span>
                ))}
            </div>

            <div className="pt-4 border-t border-gray-50 mt-4">
                <p className="text-xs text-slate-400 font-medium italic">
                    Added on {formattedDate}
                </p>
            </div>
        </div>
    );
};