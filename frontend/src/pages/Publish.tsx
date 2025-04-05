import axios from "axios"
import { Appbar } from "../components/AppBar"
import { BACKEND_URL } from "../config"
import { useState } from "react"
import { useNavigate } from "react-router-dom"


export const Publish = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();
    return <div className="">
        <Appbar></Appbar>
         <div className="font-bold flex justify-center text-2xl">Publish Blog</div>
        <div className="">
            <div className="flex justify-center text-xl">
                <input onChange={(e) => {
                    setTitle(e.target.value);
                }} placeholder="    Write Title..." className="bg-slate-100 h-20 min-w-80 max-w-screen-sm shadow mt-10 rounded-3xl mr-10 ml-10 px-3 py-2"></input>
                <input onChange={(e) => {
                    setDescription(e.target.value);
                }} placeholder="    Write Description of Publisher..." className="bg-slate-100 h-20 min-w-80 max-w-screen-sm shadow mt-10 rounded-3xl mr-10 ml-10 border px-3 py-2"></input>
            </div>
            <div className="flex justify-center text-xl">
                <textarea onChange={(e) => {
                    setContent(e.target.value);
                }} rows={10} placeholder="            Continue with content...."  className="focus:outline-none bg-slate-100 h-80 w-screen max-w-screen-2xl shadow mt-10 rounded-3xl mr-10 ml-10 border px-3 py-2"></textarea>
            </div>
        </div>
        <div className="flex flex-row justify-center">
            <div className="pt-5">
                <button onClick={ async () => {
                    const res = await axios.post(`${BACKEND_URL}/api/v1/blog`,{
                        title : title,
                        description : description,
                        content : content,},
                        {
                           headers: {
                                Authorization: "Bearer " + localStorage.getItem("token")
                            } 
                        });

                    navigate(`/blog/${res.data.id}`)
                }} className="font-semibold text-3xl bg-blue-500 h-20 w-80 px-5 py-5 flex flex-row justify-center rounded-3xl">Publish Post</button>
            </div>
        </div>
        
    </div>
}
