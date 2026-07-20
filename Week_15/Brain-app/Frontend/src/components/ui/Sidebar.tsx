import { SidebarItem } from "./SidebarItem";
import { TwitterIcon } from "../../icons/TwitterIcon";
import { YouTubeIcon } from "../../icons/YouTubeIcon";
import { DocumentIcon } from "../../icons/DocumentIcon";
import { BrainIcon } from "../../icons/BrainIcon";

interface SidebarProps {
    onLogout: () => void;
    activeFilter: string;
    setFilter: (filter: string) => void
}

export const Sidebar = ({ onLogout, activeFilter, setFilter }: SidebarProps) => {
    return (
        <div className="h-screen bg-white border-r w-72 fixed left-0 top-0 pl-6 z-50 flex flex-col">

            <div
                className="flex items-center gap-3 pl-4 pt-8 pb-10 cursor-pointer"
                onClick={() => setFilter("all")}
            >
                <div className="text-blue-600"><BrainIcon size="lg" /></div>
                <span className="text-2xl font-bold tracking-tight text-slate-800">Second Brain</span>
            </div>

            <div className="flex-1 space-y-2 pr-4">
                <SidebarItem
                    text="Tweets"
                    icon={<TwitterIcon size="md" />}
                    onClick={() => setFilter("tweet")}
                    active={activeFilter === "tweet"}
                />
                <SidebarItem
                    text="Videos"
                    icon={<YouTubeIcon size="md" />}
                    onClick={() => setFilter("video")}
                    active={activeFilter === "video"}
                />
                <SidebarItem
                    text="Documents"
                    icon={<DocumentIcon size="md" />}
                    onClick={() => setFilter("article")}
                    active={activeFilter === "article"}
                />
            </div>

            <div className="pb-8 pl-4 flex flex-col gap-4">
                <div>
                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                        Collections
                    </div>
                    <div className="space-y-1">
                        <button className="text-slate-600 hover:text-blue-600 text-sm block py-1 transition-colors">#work</button>
                        <button className="text-slate-600 hover:text-blue-600 text-sm block py-1 transition-colors">#learning</button>
                    </div>
                </div>

                {/* Logout */}
                <button
                    onClick={onLogout}
                    className="flex items-center gap-2 text-sm font-medium text-red-400 hover:text-red-600 hover:bg-red-50 px-3 py-2 rounded-lg transition-all w-full"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h6a2 2 0 012 2v1" />
                    </svg>
                    Sign Out
                </button>
            </div>
        </div>
    );
};