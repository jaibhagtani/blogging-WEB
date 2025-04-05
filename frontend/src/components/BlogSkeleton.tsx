

export const BlogSkeleton = () => {
    
    return ( <div role="status" className="max-w-5xl animate-pulse">
                
                    <div className="p-4 border-b cursor-pointer w-full h-max">

                            <div className="flex">
                                <div>
                                    <div className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-300 rounded-full w-6 h-6 mb-3`}>
                                </div>
                                </div>
                                <div className="ml-2 h-2 bg-gray-300 rounded-full w-20 mb-2.5 mt-1.5">
                                    
                                </div>
                                <div className="pl-2 pr-2 h-2 bg-gray-300 rounded-full max-w-[330px] mb-2.5 mt-1.5 ml-2 w-20">
                                    
                                </div>
                            </div>
                            
                            <div className="font-semibold text-xl pt-1 h-4 bg-gray-300 rounded-full max-w-screen mb-2.5"></div>
                            <div className="font-semibold text-xl pt-1 h-2.5 bg-gray-300 rounded-full max-w-screen mb-2"></div>
                            <div className="font-semibold text-xl pt-1 h-2 bg-gray-300 rounded-full max-w-screen mb-2"></div>
                            <div className="font-semibold text-xl pt-2 h-1 bg-gray-300 rounded-full max-w-40 mb-1"></div>

                        </div>
                    </div>
    )
}