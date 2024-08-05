import React, { useEffect } from "react";
import "./styles.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signOut } from "firebase/auth";
import userImg from "../../assets/user.svg";

function Header() {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, loading]);
  const logOut = () => {
    try {
      signOut(auth)
        .then(() => {
          // Sign-out successful.
          toast.success("Logged out successfully");
          navigate("/");
        })
        .catch((error) => {
          // An error happened.
          toast.error(error.message);
        });
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="navbar">
      <p className="logo">Expense Explorer.</p>
      {user && (
        <div style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
          {user.photoURL ? (
            <img
              src={user.photoURL}
              style={{ borderRadius: "50%", height: "2rem", width: "2rem" }}
              alt="profile_pic"
            />
          ) : (
            <img
              src={userImg}
              style={{ borderRadius: "50%", height: "2rem", width: "2rem" }}
               alt="profile_pic"
            />
          )}

          <p className="logo link" onClick={logOut}>
            Logout
          </p>
        </div>
      )}
    </div>
  );
}

export default Header;
