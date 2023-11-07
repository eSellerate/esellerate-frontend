import React from "react"
// Components
import SignUpCard from "../components/SignUp/SignUpCard"

export default function SignUp() {
    return (
       <section className="h-screen bg-[url('src/assets/images/background-products2.jpg')] bg-cover bg-center p-20 flex justify-center">
            <SignUpCard />
       </section> 
    )
}