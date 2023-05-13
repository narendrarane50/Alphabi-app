/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import React, { useState } from "react";
import Link from "next/link";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
const page = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!values.email || !values.password) {
      setErrorMsg("Please fill all the fields.");
      return;
    } else {
      setErrorMsg("");
      signInWithEmailAndPassword(auth, values.email, values.password)
        .then((res) => {
          // console.log(res);
          const user = res.user;
          console.log(user);
          // navigate to home page
          window.location.href = "/home";
        })
        .catch((err) => {
          // console.log(err);
          setErrorMsg("Invalid Email or Password");
        });
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex bg-white w-[30vw] mt-[12%] mx-auto rounded-md flex-col justify-center items-center gap-6  p-6"
      >
        <div className="text-2xl font-bold">LOG IN</div>
        <input
          onChange={(e) =>
            setValues((prev) => ({ ...prev, email: e.target.value }))
          }
          placeholder="Enter Email"
          type="text"
          className="rounded-md p-2 border-2 w-full"
        />
        <input
          onChange={(e) =>
            setValues((prev) => ({ ...prev, password: e.target.value }))
          }
          placeholder="Enter Password"
          type="password"
          className="p-2 rounded-md border-2 w-full"
        />
        <div className="flex flex-col w-full justify-between gap-12">
          <button className="bg-red-500 p-2 text-white rounded-xl font-semibold text-xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
            Sign in
          </button>
          <Link href="/signup">New User?</Link>
        </div>
        {errorMsg && <div>{errorMsg}</div>}
      </form>
    </div>
  );
};

export default page;
