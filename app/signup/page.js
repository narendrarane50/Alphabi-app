/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { useState } from "react";
import Link from "next/link";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { BarLoader } from "react-spinners";

const page = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (values.password !== values.confirmPassword) {
      setErrorMsg("Passwords do not match. Please try again.");
      return;
    } else if (!values.email || !values.password || !values.confirmPassword) {
      setErrorMsg("Please fill all the fields.");
      return;
    } else {
      setErrorMsg("");
      setLoading(true);
      createUserWithEmailAndPassword(auth, values.email, values.password)
        .then((res) => {
          // console.log(res);
          setLoading(false);
          const user = res.user;
          console.log(user);
          // navigate to home page
          window.location.href = "/home";
        })
        .catch((err) => {
          // console.log(err);
          setLoading(false);
          setErrorMsg(err.message);
        });
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex bg-white w-[30vw] mt-[12%] mx-auto rounded-md flex-col justify-center items-center gap-6  p-6"
      >
        <div className="text-2xl font-bold">Sign Up</div>
        <input
          placeholder="Enter Email"
          type="text"
          className="rounded-md p-2 border-2 w-full"
          value={values.email}
          onChange={(e) =>
            setValues((prev) => ({ ...prev, email: e.target.value }))
          }
        />
        <input
          placeholder="Enter Password"
          type="password"
          className="p-2 rounded-md border-2 w-full"
          value={values.password}
          onChange={(e) =>
            setValues((prev) => ({ ...prev, password: e.target.value }))
          }
        />
        <input
          placeholder="Confirm Password"
          type="password"
          className="p-2 rounded-md border-2 w-full"
          value={values.confirmPassword}
          onChange={(e) =>
            setValues((prev) => ({
              ...prev,
              confirmPassword: e.target.value,
            }))
          }
        />
        <div className="flex flex-col w-full justify-between gap-12">
          <button
            className="bg-red-500 p-2 text-white rounded-xl font-semibold text-xl bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500"
            disabled={loading}
          >
            {loading ? "Loading..." : "Sign up"}
          </button>
          <Link href="/login">Already have an account?</Link>
        </div>
        {errorMsg && <div>{errorMsg}</div>}
        {loading && <BarLoader />}
      </form>
    </div>
  );
};

export default page;
