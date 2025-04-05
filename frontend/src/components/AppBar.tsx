import { Link } from "react-router-dom"
import { Avatar } from "./BlogCard"


export const Appbar = ({name} : {name?: string}) => {


    return <div className="border-b flex justify-between py-4 px-8 text-center">
            <Link to={"/blogs"} className="flex flex-col justify-center cursor-pointer">
                Medium
            </Link>
            <div className="flex flex-row justify-center grid grid-cols-1">
                
                <Link to={"/publish"}>
                        <div className="flex flex-row justify-center text-xl bg-green-500 rounded-3xl font-semibold w-40 h-10 mr-20 hover:bg-green-600">
                            <button className="w-40">New</button>
                        </div>
                </Link>
                <div className="col-start-5">
                    <Avatar name={name || "Anonymous"} size={10} fontsize="xl"></Avatar>
                </div>
            </div>
    </div>
}