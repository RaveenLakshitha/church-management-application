"use client"

import { authClient } from "@/lib/auth-client"; 
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function Home() {
  const { 
        data: session,
    } = authClient.useSession() 

  const [name, setName ] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = () => authClient.signUp.email({
      email, // user email address
      password, // user password -> min 8 characters by default
      name, // user display name
  }, {
      onRequest: (ctx) => {
          //show loading
      },
      onSuccess: (ctx) => {
          window.alert("Success");
      },
      onError: (ctx) => {
          window.alert("Something went wrong");
      },
  });

  const onLogin = () => authClient.signIn.email({
      email, // user email address
      password, // user password -> min 8 characters by default
  }, {
      onRequest: (ctx) => {
          //show loading
      },
      onSuccess: (ctx) => {
          window.alert("Success");
      },
      onError: (ctx) => {
          window.alert("Something went wrong");
      },
  });

  if(session){
    return(
      <div className="flex flex-col p-4 gap-y-4">
        <p>Logged in as {session.user.name}</p>
        <Button onClick={() =>authClient.signOut()}>Sign Out</Button>
      </div>
    )
  }


  return (
    <div className="p4 flex flex-col gap-y-10">
    <div className="p4 flex flex-col gap-y-4">
        <Input placeholder="name" value={name} onChange={(e) => setName(e.target.value)}></Input>
        <Input placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)}></Input>
        <Input placeholder="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}></Input>
        <Button onClick={onSubmit}>
          Create User
        </Button>
    </div>
    <div className="p4 flex flex-col gap-y-4">
        <Input placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)}></Input>
        <Input placeholder="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}></Input>
        <Button onClick={onLogin}>
          Login
        </Button>
    </div>
    </div>
  );
}
