import { Link } from "react-router-dom";

interface blogCardinput {
    id : number,
    authorname: string;
    title: string,
    content: string,
    description: string,
    publishedDate: string
}
export const BlogCard = ( {id, authorname, title, content, description, publishedDate } : blogCardinput ) => {

    return <Link to={`/blog/${id}`}>
            <div>
                <div className="p-5 border-b cursor-pointer">
                    <div className="flex text-sm">
                        <div>
                            <Avatar name={authorname} size = {6} fontsize={"sm"}></Avatar>
                        </div>
                        <div className="content-center pl-2 font-light">
                            {authorname}
                        </div>
                        <div className="rounded-full bg-slate-600 h-0.5 w-0.5 mt-3 ml-1">
                            
                        </div>
                        <div className="pl-2 pr-2 text-slate-500 font-thin mt-0.5">
                            {publishedDate}
                        </div>
                    </div>
                    
                    <div className="text-left font-semibold text-xl pt-1">
                        {title}
                    </div>
                    
                    <div className="text-md text-slate-600 font-light">
                        {content.length > 120 ? `${content.slice(0, 120)}...` : content}
                    </div>

                    <div className="text-sm text-slate-400 font-light">
                        {description.length > 150 ? `${content.slice(0, 150)}...` : description}
                    </div>

                    <div className="text-slate-500 text-xs col-start-2 text-start mt-3">
                        {`${Math.ceil(content.length/100)} minute(s) read`}
                    </div>
                    
                </div>
            </div>
        </Link>
}

export function Avatar( {name, size = 4, fontsize ="md"} : {
    name: string,
    size?: number,
    fontsize ?: string
})
{
    
    // ideally here use for dynamic effect CLSX
    return <div className={`relative inline-flex items-center justify-center overflow-hidden bg-slate-700 rounded-full w-${size} h-${size}`}>
            <span className={`text-${fontsize} font-semibold text-gray-300`}>{name[0]}</span>
        </div>
}