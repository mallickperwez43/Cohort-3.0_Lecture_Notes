import { useState } from "react";
import { CloseIcon } from "../../icons/CloseIcon";
import { CopyIcon } from "../../icons/CopyIcon";
import { CheckIcon } from "../../icons/CheckIcon";

interface ShareModalProps {
    open: boolean;
    onClose: () => void;
    shareLink: string;
}

export const ShareModal = ({ open, onClose, shareLink }: ShareModalProps) => {
    const [copied, setCopied] = useState(false);

    if (!open) return null;

    const handleCopy = async () => {
        await navigator.clipboard.writeText(shareLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-slate-500/60 backdrop-blur-sm" onClick={onClose} />

            <div className="relative bg-white p-8 rounded-2xl shadow-2xl w-105 z-10 flex flex-col gap-5">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-xl font-bold text-btn-primary-bg">Share your Brain</h2>
                        <p className="text-sm text-slate-400 mt-0.5">Anyone with this link can view your notes</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="bg-red-500 hover:bg-red-600 text-white cursor-pointer p-0.5 rounded transition-all"
                    >
                        <CloseIcon size="md" />
                    </button>
                </div>

                {/* Link Box */}
                <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5">
                    <span className="text-xs text-slate-600 truncate flex-1 font-mono">{shareLink}</span>
                    <button
                        onClick={handleCopy}
                        title={copied ? "Copied!" : "Copy link"}
                        className={`p-1.5 rounded-lg transition-all shrink-0 ${copied
                            ? "text-green-500"
                            : "text-slate-400 hover:text-btn-primary-bg hover:bg-slate-100"
                            }`}
                    >
                        {copied ? <CheckIcon size="md" /> : <CopyIcon size="md" />}
                    </button>
                </div>
            </div>
        </div>
    );
};