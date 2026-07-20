import type { ReactElement } from "react";

interface SidebarItemProps {
    text: string;
    icon: ReactElement;
    onClick: () => void;
    active: boolean;
}

export const SidebarItem = ({ text, icon, onClick, active }: SidebarItemProps) => {
    return (
        <div
            onClick={onClick}
            className={`flex items-center gap-4 px-4 py-3 cursor-pointer rounded-xl transition-all ${active ? "bg-blue-50 text-blue-600 font-bold" : "text-slate-600 hover:bg-slate-50"
                }`}
        >
            {icon}
            <span className="text-sm">{text}</span>
        </div>
    );
};