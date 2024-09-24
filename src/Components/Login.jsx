import React, { useState } from 'react'
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword,updateProfile} from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
const Login = () => {
    const auth = getAuth();
    const db =getDatabase()
    const [name,setName] = useState('')
    const [nameError,setNameError] = useState('')
    const [email,setEmail] = useState('')
    const [emailError,setEmailError] = useState('')
    const [password,setPassword] = useState('')
    const [passwordError,setPasswordError] = useState('')
    const [isLogin,setIsLogin] = useState(false)
  const handleLogin = ()=>{
    setIsLogin(!isLogin)
  }
  const handleName = (e)=>{
    setName(e.target.value)
    setNameError("")
  }
  const handleEmail = (e)=>{
    setEmail(e.target.value)
    setEmailError("")
  }
  const handlePassword = (e)=>{
    setPassword(e.target.value)
    setPasswordError("")
  }
  const handleSubmit = async ()=>{
   if(!name){
    setNameError("Please Enter Your Name")
   }
   if(!email){
    setEmailError("Please Enter Your Email")
   }
   if(!password){
    setPasswordError("Please Enter Your Password")
   }
   if(name && email && password){
   try{
    if(isLogin){
        await signInWithEmailAndPassword (auth,email,password).then(()=>{
            console.log("Login Done");
        })
    }else{
       await createUserWithEmailAndPassword(auth, email, password).then((user)=>{
        updateProfile(auth.currentUser, {
            displayName: name, 
            photoURL: "https://example.com/jane-q-user/profile.jpg"
          }).then(()=>{
            set(ref(db, 'users/'+ user.user.uid), {
                id: user.user.uid,
                username: user.user.displayName,
                email: user.user.email,
                status: "active",
              });
          }).catch((error) => {
            // An error occurred
            // ...
          });
        })
    }
   }catch(err){
    console.log(err.message);
    
   }
   }
  }
  return (
    <div className="min-h-screen flex justify-center items-center">
    <div className="bg-teal-700 p-6 rounded-lg shadow-lg max-w-sm w-full">
      <h2 className="font-poppins text-center font-medium text-white text-3xl">{isLogin ? "Login" : "Sign Up"}</h2>
      <input onChange={handleName} type="email" placeholder="Enter Your Name" className="font-poppins font-normal p-2 w-full border border-[#333] outline-none mt-4 rounded-md text-[#333]"/>
      <p className='text-red-500 font-mono text-xl font-normal'>{nameError}</p>
      <input onChange={handleEmail} type="email" placeholder="Enter Your Email" className="font-poppins font-normal p-2 w-full border border-[#333] outline-none mt-4 rounded-md text-[#333]"/>
      <p className='text-red-500 font-mono text-xl font-normal'>{emailError}</p>
      <input onChange={handlePassword} type="password" placeholder="Enter Your Password" className="font-poppins font-normal p-2 w-full border border-[#333] outline-none mt-4 rounded-md text-[#333]"/>
      <p className='text-red-500 font-mono text-xl font-normal'>{passwordError}</p>
      <button onClick={handleSubmit} className="w-full bg-blue-500 py-2 px-4 text-white text-xl rounded-lg mt-6">{isLogin ? "Login" : "Sign Up"}</button>
      <p onClick={handleLogin} className="cursor-pointer text-center font-poppins font-normal text-xl text-white mt-4 ">{isLogin ? "Need an account? Sign Up" : "Already have an account? Login"}</p>
    </div>
  </div>
  )
}

export default Login