import { Blog } from "../hooks"
import { Appbar } from "./AppBar"


export const FullBlog = ({blog}: {blog : Blog}) => {
    return (
        <div>
            <Appbar></Appbar>
            <div className="flex justify-center">
                <div className="grid grid-cols-12 px-10 pt-12 max-w-screen-2xl w-full">
                    <div className="col-span-9 mr-5">
                        <div className="font-black text-5xl ">
                            {blog.title}
                        </div>
                        <div className="text-sm text-slate-500 mt-2.5">
                            Posted on August 24, 2023
                        </div>
                        <div className="font-medium text-md mt-4">
                            {blog.content}
                        </div>
                    </div>
                    <div className="col-start-10 col-span-3">
                        <div className="font-semibold text-lg">
                            Author
                        </div>
                        <div className="flex max-w-lg pt-10">
                            <div className="pr-5 pt-2">
                                <div className="rounded-full h-10 w-10 bg-slate-300 text-center text-2xl font-bold">{blog.author.name ? blog.author.name[0] :"A" }</div>
                            </div>
                            <div>
                                <div className="font-bold text-xl">
                                    {blog.author.name ? blog.author.name : "Anonymous"}
                                </div>
                                <div className="text-start mt-1.5 text-slate-500 font-semibold max-w-72 h-max">
                                    <div className="break-before-page"> 
                                        {blog.description}
                                    </div> 
                                </div>
                            </div> 
                        </div>
                                
                    </div>
                </div>
            </div>
        </div>
    )
}