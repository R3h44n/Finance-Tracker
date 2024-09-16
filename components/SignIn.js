'use client'

import {React, useContext} from "react";
import { authContext } from "@/lib/store/auth-context";
import { FcGoogle } from "react-icons/fc";

function SignIn(){
    const {googleLoginHandler} = useContext(authContext)

    return (
        <main className='container max-w-2xl px-6 mx-auto'>
            <h1 className="mb-6 text-6xl font-bold text-center mt-20 py-6">Finance Management</h1>
            <h1 className="mb-6 text-xl font-bold text-center">A way to manage your spending</h1>
            <div className="flex flex-col overflow-hidden shadow-md shadow-slate-500 bg-slate-800 rounded-2xl">
                    <div className="h-52">
                        <img 
                            className="object-cover w-full h-full"
                            src="https://plus.unsplash.com/premium_photo-1681487769650-a0c3fbaed85a?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZmluYW5jZXxlbnwwfHwwfHx8MA%3D%3D"
                        />
                    </div>
                    <div className="px-4 py-4">
                        <h3 className="text-2xl text-center">Please Login to continue</h3>

                        <button onClick={googleLoginHandler} className="flex self-start gap-2 p-4 mx-auto mt-6 font-medium text-white align-middle bg-gray-700 rounded-lg">
                            <FcGoogle className="text-2xl"/> Google
                        </button>
                    </div>
                </div>
            </main>
    )
}

export default SignIn;