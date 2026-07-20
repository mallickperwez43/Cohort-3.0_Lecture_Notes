import { CloseIcon } from "../../icons/CloseIcon";
import { Input } from "./Input";
import { Button } from "./Button";
import { YouTubeIcon } from "../../icons/YouTubeIcon";
import { TwitterIcon } from "../../icons/TwitterIcon";
import { DocumentIcon } from "../../icons/DocumentIcon";
import { useState } from "react";

type ContentType = "Youtube" | "Twitter" | "Article" | null;

const typeIconMap: Record<Exclude<ContentType, null>, React.ReactElement> = {
    Youtube: <YouTubeIcon size="md" />,
    Twitter: <TwitterIcon size="md" />,
    Article: <DocumentIcon size="md" />,
};

const modalTypeToCardType: Record<Exclude<ContentType, null>, "video" | "tweet" | "article"> = {
    Youtube: "video",
    Twitter: "tweet",
    Article: "article",
};

interface ModalProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: {
        title: string;
        link?: string;
        type: "video" | "tweet" | "article" | "image";
        tags?: string[];
    }) => void;
}

export const Modal = ({ open, onClose, onSubmit }: ModalProps) => {
    const [selectedType, setSelectedType] = useState<ContentType>(null);
    const [title, setTitle] = useState("");
    const [link, setLink] = useState("");

    const [tagInput, setTagInput] = useState("");
    const [tags, setTags] = useState<string[]>([]);

    if (!open) return null;

    const addTag = () => {
        const cleanTag = tagInput.trim().toLowerCase();
        if (cleanTag && !tags.includes(cleanTag)) {
            setTags([...tags, cleanTag]);
            setTagInput("");
        }
    };

    const removeTag = (tagToRemove: string) => {
        setTags(tags.filter(t => t !== tagToRemove));
    };

    const handleClose = () => {
        setSelectedType(null);
        setTitle("");
        setLink("");
        setTags([]);
        setTagInput("");
        onClose();
    };

    const handleSubmit = () => {
        if (!title.trim() || !selectedType) return;
        onSubmit({
            title,
            type: modalTypeToCardType[selectedType],
            link: link || undefined,
            tags: tags
        });
        handleClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div
                className="absolute inset-0 bg-slate-500/60 backdrop-blur-sm"
                onClick={handleClose}
            />

            <div className="relative bg-white p-10 rounded-2xl shadow-2xl w-96 z-10">
                <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            {selectedType && typeIconMap[selectedType]}
                            <h2 className="text-xl font-bold text-btn-primary-bg">
                                {selectedType ? `Add ${selectedType}` : "Add Content"}
                            </h2>
                        </div>
                        <button
                            onClick={handleClose}
                            className="bg-red-500 hover:bg-red-600 text-white cursor-pointer p-0.5 rounded transition-all"
                        >
                            <CloseIcon size="md" />
                        </button>
                    </div>

                    <div className="flex flex-col gap-4">
                        <Input
                            placeholder="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />

                        {(selectedType === "Youtube" || selectedType === "Twitter") && (
                            <Input
                                placeholder={`${selectedType} link...`}
                                value={link}
                                onChange={(e) => setLink(e.target.value)}
                            />
                        )}

                        {selectedType === "Article" && (
                            <Input
                                placeholder={`${selectedType} link...`}
                                value={link}
                                onChange={(e) => setLink(e.target.value)}
                            />
                        )}

                        <div className="flex gap-1 items-center flex-wrap">
                            <span className="text-sm font-medium text-slate-500">Select Type:</span>
                            {(["Youtube", "Twitter", "Article"] as ContentType[]).map((type) => (
                                <Button
                                    key={type}
                                    variant={selectedType === type ? "primary" : "secondary"}
                                    size="sm"
                                    text={type!}
                                    onClick={() => setSelectedType(type)}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <div className="flex gap-2">
                            <Input
                                placeholder="Add a tag (e.g. productivity)"
                                value={tagInput}
                                onChange={(e) => setTagInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        addTag();
                                    }
                                }}
                            />
                            <Button variant="secondary" text="Add" onClick={addTag} size="sm" />
                        </div>

                        <div className="flex flex-wrap gap-2 min-h-6">
                            {tags.map(tag => (
                                <span key={tag} className="flex items-center gap-1 px-2 py-1 bg-slate-100 text-slate-600 rounded-full text-xs font-bold">
                                    #{tag}
                                    <button onClick={() => removeTag(tag)} className="hover:text-red-500 ml-1">×</button>
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-center pt-2">
                        <Button
                            size="md"
                            variant="primary"
                            text="Submit"
                            onClick={handleSubmit}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};