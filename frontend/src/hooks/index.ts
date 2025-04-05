import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

export interface Blog{
    id : number,
    title: string,
    description: string,
    content: string,
    author: {
        name:string | "Anoynomous"
    },
    publishedDate: string;
}

export const useBlog = ({id} : { id: string }) => {

    const [blog, setBlog] = useState<Blog>();
    const [loading2, setLoading2] = useState(true);
    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`,{
            headers :{
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then(res => {
            setBlog(res.data.getBlogs);
            setLoading2(false);
        })
        console.log(blog);
        
    }, [id]);

    return {
        blog, 
        loading2
    }
}


export const useBlogs = () => {
    const [loading, setLoading] = useState(true); 
    const [blogs, setBlogs] = useState<Blog[]>();
    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
            headers :{
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
            .then((res) => {
                setLoading(false);
                setBlogs(res.data.getAllBlogs);
            })

    }, [])

    return {
        loading, 
        blogs
    }
}