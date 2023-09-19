import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "../utils/firebase";
import { signOut } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { addUser, removeUser } from "../utils/userSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const { uid, email, displayName } = user;
        // ...
        dispatch(addUser({ uid: uid, email: email, displayName: displayName }));
        //navigate to browse if user logged in
        navigate("/browse");
      } else {
        // User is signed out
        // ...
        dispatch(removeUser);
        navigate("/");
      }
    });

    //when component unmounts, unsubscribe onauthchange callback
    return () => unsubscribe();
  }, []);

  const handleSignout = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        navigate("/error");
      });
  };
  return (
    <div className="absolute max-w-full	 w-screen px-8 px-y bg-gradient-to-b from-black z-10 flex justify-between">
      <img
        className="w-44"
        src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
        alt=""
      />
      {auth.currentUser && (
        <div className="flex text-white w-22 h-12 ">
          <img
            className="p-2"
            src="https://occ-0-6247-2164.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABdpkabKqQAxyWzo6QW_ZnPz1IZLqlmNfK-t4L1VIeV1DY00JhLo_LMVFp936keDxj-V5UELAVJrU--iUUY2MaDxQSSO-0qw.png?r=e6e"
            alt=""
          />
          <button className="font-bold" onClick={handleSignout}>
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
