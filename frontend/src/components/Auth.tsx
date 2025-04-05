import axios from "axios";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { BACKEND_URL } from "../config";
import { SignupInput } from "@jaibhagtani/medium-common";


export const  Auth = ({type}: {type: "signup" | "signin"}) => {

    // **************** V.V.V.V.imp ****************
    // Benefits of getting types form B.E. to F.E.
    // Here it is very difficult to change generics based on type 
    const [postInputs, setPostInputs] = useState<SignupInput>({
        name: "",
        username: "",
        password: ""
    })
    const navigate = useNavigate();
    async function sendRequest()
    {
        try{
            // we are sending name also in signin, but it is not problem,
            // zod take it as optional
            const user = await axios.post(`${BACKEND_URL}/api/v1/user/${type === 'signup' ? "signup" : "signin"}`, {
                email : postInputs.username,
                name : postInputs.name,
                password: postInputs.password
            });
            const jwt = user.data.jwt;
            localStorage.setItem("token", jwt);
            navigate("/blogs");
        }
        catch(e)
        {
            alert("Error Occured during signup");
        }
    }
    
    return <div className="h-screen flex flex-col justify-center">
        {/* {JSON.stringify(postInputs)} */}
        <div className="flex flex-row justify-center">
            <div className="font-bold text-4xl">
                Create an account
            </div>
        </div>
        <div className="flex justify-center mt-1 text-center">
            <div className="text-slate-600">
                {type === 'signup' ? "Already have an account?": "Don't have an account?" }
                <Link className="underline pl-2" to={type === 'signup' ? '/signin' : '/signup'} >{type === 'signup' ? "Sign in" : "Sign up"}</Link>
            </div>
        </div>
        <div className="mt-6"></div>
        {type === 'signup' ?
        <div>
            <div className="grid grid-cols-5 gap-3">
            <div className="col-span-1"></div>
            <div className="col-span-3">
                <LabelledInput label = "Username" placeholder="Enter your username" onChange={(e) => {
                    setPostInputs(c => ({
                        // give me all the existing things here and override the name
                        // this ... means it gives all the existing things 
                        // SPREAD OPERATOR
                        ...c,
                        name: e.target.value
                    }))
                }}/>
            </div>
            <div className="col-span-1"></div>
        </div>
        </div>  : null}
        
        <div className="mt-6"></div>
        <div className="grid grid-cols-5 gap-3">
            <div className="col-span-1"></div>
            <div className="col-span-3">
                <LabelledInput label = "Email" placeholder="m@example.com" onChange={(e) => {
                    setPostInputs(c => ({
                        ...c,
                        username: e.target.value
                    }))
                }}/>
            </div>
            <div className="col-span-1"></div>
        </div>
        <div className="mt-6"></div>
        <div className="grid grid-cols-5 gap-3">
            <div className="col-span-1"></div>
            <div className="col-span-3">
                <LabelledInput label = "Password" type="password" placeholder="6 Characters Min" onChange={(e) => {
                    setPostInputs(c => ({
                        ...c,
                        password: e.target.value
                    }))
                }}/>
            </div>
            <div className="col-span-1"></div>

        </div>
        <div className="pt-10"></div>
        <div className="grid grid-cols-5 gap-3">
            <div className="col-span-1"></div>
                <div className="col-span-3">    
                    <button onClick={sendRequest} className="text-center bg-black text-white w-full h-11 shadow rounded-lg hover:bg-slate-800">{type === "signup" ? "Sign Up": "Sign In"}</button>
                </div>
            <div className="col-span-1"></div>

        </div>

    </div>
    
}

// MOST IMP THING is hiding Password, therefore passing types 
interface inputbuttonType {
    label : string;
    placeholder: string;
    // this is the right type of this 
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    type ?: string;
}
function LabelledInput({label, placeholder, onChange, type} : inputbuttonType)
{
    return <div>
        <div className="text-start font-semibold ml-1 text-sm pt-2">{label}</div>
        <input onChange={onChange}  type={type || "text"} id="first_name" placeholder = {placeholder} className=" pl-2.5 pr-2.5 h-10 border-2 rounded  bg-gray-50 w-full focus: border-black-500"></input>
    </div>
}

