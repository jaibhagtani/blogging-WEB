import { Appbar } from "../components/AppBar"
import { BlogCard } from "../components/BlogCard"
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks"


export const Blogs = () => {
    // store it in state 
    // store it in context 
    // store it directly here 
    // ************ WE WILL BE USING THIS ************
    // create our own custom hook useBlog

    const {loading, blogs} = useBlogs(); 
    if(loading)
    {
        return <div>
                <div className="bg-slate-50 h-screen">
                    <Appbar></Appbar>
                        <div className="flex justify-center grid grid-cols-1 px-5 lg:grid-cols-10 h-80">
                            <div className="col-start-1 lg:col-start-3 col-end-9">
                                <BlogSkeleton/> <br></br>
                                <BlogSkeleton/> <br></br>
                                <BlogSkeleton/> <br></br>
                                <BlogSkeleton/> <br></br>
                            </div>
                        </div>
                </div>
            </div>
            
            
    }
    
    return <div className="bg-slate-50">
        <Appbar name="Jai"></Appbar>
        <div className="flex justify-center grid grid-cols-1 px-5 lg:grid-cols-10">
                   {blogs ? blogs.map(blog => <div className="col-start-1 lg:col-start-3 col-end-9"><BlogCard
                        id={blog.id}
                        authorname={blog.author.name || "Anonymous"}
                        title={blog.title}
                        description={blog.description}
                        content={blog.content}
                        publishedDate={"Dec 3, 2023"}
                        ></BlogCard> </div>
                    ) : null}
                </div>
                
            
    </div>
}