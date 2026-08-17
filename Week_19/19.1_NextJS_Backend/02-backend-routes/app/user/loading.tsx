const Loading = () => {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-800 antialiased flex flex-col justify-center items-center p-4 relative">

            <div className="w-full max-w-sm mb-4">
                <div className="h-5 w-32 bg-slate-200 rounded animate-pulse" />
            </div>

            <div className="w-full max-w-sm bg-white border border-slate-100 rounded-2xl shadow-xl shadow-slate-100/50 p-8">

                <div className="flex flex-col items-center mb-6">
                    <div className="h-16 w-16 bg-slate-200 rounded-full animate-pulse mb-3" />
                    <div className="h-3 w-20 bg-slate-200 rounded animate-pulse" />
                </div>


                <div className="space-y-4">

                    <div className="border-b border-slate-50 pb-3">
                        <div className="h-3 w-10 bg-slate-200 rounded animate-pulse mb-2" />
                        <div className="h-5 w-3/4 bg-slate-200 rounded animate-pulse" />
                    </div>


                    <div>
                        <div className="h-3 w-20 bg-slate-200 rounded animate-pulse mb-2" />
                        <div className="h-4 w-5/6 bg-slate-200 rounded animate-pulse" />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Loading;