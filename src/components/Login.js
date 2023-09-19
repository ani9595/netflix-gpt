import React, { useState, useRef } from "react";
import Header from "./Header";
import { checkvalidation } from "../utils/checkvalidation";
import { auth } from "../utils/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [signInForm, setSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const email = useRef(null);
  const password = useRef(null);

  const toggleSignInForm = () => {
    setSignInForm(!signInForm);
  };

  const handleValidation = () => {
    //validate the data
    const errorMessage = checkvalidation(
      email.current.value,
      password.current.value
    );
    setErrorMessage(errorMessage);

    if (errorMessage) return;

    //signin and signup logic
    if (!signInForm) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          updateProfile(auth.user, {
            displayName: "Aniruddha Khadse",
            photoURL: "https://example.com/jane-q-user/profile.jpg",
          })
            .then(() => {
              // Profile updated!
              // ...
              const { uid, email, displayName } = auth.currentUser;
              dispatchEvent(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                })
              );
            })
            .catch((error) => {
              // An error occurred
              // ...
              setErrorMessage(error.message);
            });
          // Signed in
          const user = userCredential.user;
          console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode);
          // ..
        });
    } else {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage("Invalid Credentials");
        });
    }
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/dc1cf82d-97c9-409f-b7c8-6ac1718946d6/14a8fe85-b6f4-4c06-8eaf-eccf3276d557/IN-en-20230911-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          alt=""
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="p-12 bg-black absolute w-3/12 mx-auto left-0 right-0 my-36 text-white bg-opacity-80 rounded-lg"
      >
        <h1 className="font-bold text-3xl py-4">
          {signInForm ? "Sign in" : "Sign Up"}
        </h1>
        {!signInForm && (
          <input
            type="text"
            placeholder="Full Name"
            className="p-4 my-4 w-full bg-gray-700 rounded-lg"
          />
        )}
        {!signInForm && (
          <input
            type="text"
            placeholder="Contact Number"
            className="p-4 my-4 w-full bg-gray-700 rounded-lg"
          />
        )}
        <input
          ref={email}
          type="text"
          placeholder="Email"
          className="p-4 my-4 w-full bg-gray-700 rounded-lg"
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-4 my-4 w-full bg-gray-700 rounded-lg"
        />
        <p className="text-bold text-red-600">{errorMessage}</p>
        <button
          className="p-4 my-6  bg-red-700 w-full rounded-lg font-bold"
          onClick={handleValidation}
        >
          {signInForm ? "Sign in" : "Sign Up"}
        </button>
        <a className="py-4 cursor-pointer" onClick={toggleSignInForm}>
          {signInForm
            ? "New to Netflix? Sign up now!"
            : "Already registered? Sign in here!"}
        </a>
      </form>
    </div>
  );
};

export default Login;
