import { Button } from '../components/ui/Button'
import { PlusIcon } from '../icons/PlusIcon'
import { ShareIcon } from '../icons/ShareIcon'
import { Card } from '../components/ui/Card'
import { Modal } from '../components/ui/Modal'
import { ShareModal } from '../components/ui/ShareModal'
import { useState } from 'react'
import { Sidebar } from '../components/ui/Sidebar'
import { useNavigate } from 'react-router-dom'
import { API } from '../lib/api'
import { useContent } from '../hooks/useContent'

export const Dashboard = () => {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const [isShareOpen, setIsShareOpen] = useState(false);
    const [shareLink, setShareLink] = useState<string | null>(null);
    const [filter, setFilter] = useState("all");
    const { contents, loading, error, addContent, deleteContent } = useContent();

    const filteredContents = contents.filter(card =>
        filter === "all" ? true : card.type === filter
    );

    const handleAddCard = async (data: {
        title: string;
        link?: string;
        type: "video" | "tweet" | "article" | "image";
        tags?: string[];
    }) => {
        await addContent(data);
        setIsOpen(false);
    };

    const handleSignOut = async () => {
        await fetch(API.auth.logout, {
            method: "POST",
            credentials: "include",
        });
        navigate("/signin");
    };

    const handleShare = async () => {
        try {
            const response = await fetch(API.content.share, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ share: true }),
            });
            const data = await response.json();
            if (data.hash) {
                const link = `${window.location.origin}/share/${data.hash}`;
                setShareLink(link);
                setIsShareOpen(true);
            }
        } catch (err) {
            console.error("Error sharing brain:", err);
            alert("Failed to generate share link");
        }
    };

    return (
        <div className='flex min-h-screen bg-main-bg'>
            <Sidebar onLogout={handleSignOut} activeFilter={filter} setFilter={setFilter} />

            <div className='flex flex-col flex-1 ml-72'>
                <div className='flex justify-between items-center p-6'>
                    <div className='text-3xl font-semibold capitalize'>
                        {filter === "all" ? "All Notes" : `${filter}s`}
                    </div>
                    <div className='flex gap-2 pr-2'>
                        <Button variant='secondary' size='md' text='Share Brain' onClick={handleShare} startIcon={<ShareIcon size='md' />} />
                        <Button variant='primary' size='md' text='Add Content' onClick={() => setIsOpen(true)} startIcon={<PlusIcon size='md' />} />
                    </div>
                </div>

                {loading && (
                    <div className="flex-1 flex items-center justify-center">
                        <p className="text-slate-400 text-sm animate-pulse">Loading your notes...</p>
                    </div>
                )}

                {error && (
                    <div className="mx-5 bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-2 rounded-lg">
                        {error}
                    </div>
                )}

                {!loading && !error && contents.length === 0 && (
                    <div className="flex-1 flex flex-col items-center justify-center gap-3 text-center mt-20">
                        <p className="text-slate-400 text-sm">No notes yet. Add your first one!</p>
                        <Button variant='primary' size='md' text='Add Content' onClick={() => setIsOpen(true)} startIcon={<PlusIcon size='md' />} />
                    </div>
                )}

                <div className='flex gap-5 m-5 flex-wrap'>
                    {filteredContents.map(card => (
                        <Card
                            key={card._id}
                            title={card.title}
                            link={card.link}
                            type={card.type}
                            tags={card.tags}
                            onDelete={() => deleteContent(card._id)}
                        />
                    ))}

                    {filteredContents.length === 0 && !loading && (
                        <div className="w-full text-center py-10 text-slate-400">
                            No {filter} items found.
                        </div>
                    )}
                </div>

                <Modal open={isOpen} onClose={() => setIsOpen(false)} onSubmit={handleAddCard} />

                {shareLink && (
                    <ShareModal
                        open={isShareOpen}
                        onClose={() => setIsShareOpen(false)}
                        shareLink={shareLink}
                    />
                )}
            </div>
        </div>
    );
};