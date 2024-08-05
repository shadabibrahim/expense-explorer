import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db, provider } from "../../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import "./styles.css";
import Input from "../Input";
import Button from "../Button";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function SignupSigninComponent() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loginForm, setLoginForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const signupWithEmail = () => {
    setLoading(true);
    console.log(name, email, password, confirmPassword);
    // Authenticate the user ,or create a new account using email and pass
    if (
      name !== "" &&
      email !== "" &&
      password !== "" &&
      confirmPassword !== ""
    ) {
      if (password === confirmPassword) {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            // Signed up
            const user = userCredential.user;
            console.log("user>>>", user);
            toast.success("Account created successfully");
            setLoading(false);
            setName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");

            // ...create a doc with userid as the following id
            createDoc(user);
            navigate("/dashboard");
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            toast.error(errorMessage);
            setLoading(false);
            // ..
          });
      } else {
        toast.error("Passwords and confirm password do not match!");
        setLoading(false);
      }
    } else {
      toast.error("All fields are mandatory!");
      setLoading(false);
    }
  };
  const loginUsingEmail = () => {
    console.log("Email", email);
    console.log("Password", password);
    setLoading(true);
    if (email !== "" && password !== "") {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          toast.success("User Logged In!");
          console.log("User Logged In", user);
          setLoading(false);
          navigate("/dashboard");
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setLoading(false);
          toast.error(errorMessage);
        });
    } else {
      toast.error("All the fields are mandatory!");
      setLoading(false);
    }
  };
  const createDoc = async (user) => {
    setLoading(true);
    // Make sure that the doc with the uid doesn't exist
    // create a doc
    if (!user) return;
    const userRef = doc(db, "users", user.uid);
    const userData = await getDoc(userRef);
    if (!userData.exists()) {
      try {
        await setDoc(doc(db, "users", user.uid), {
          name: user.displayName ? user.displayName : name,
          email: user.email,
          photoURL: user.photoURL ? user.photoURL : "",
          createdAt: new Date(),
        });
        toast.success("Doc Created!");
        setLoading(false);
      } catch (e) {
        toast.error(e.message);
        setLoading(false);
      }
    } else {
      // toast.error("Doc already Exists");
      setLoading(false);
    }
  };

  const googleAuth = () => {
    setLoading(true);
    try {
      signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          console.log("User>>>", user);
          createDoc(user);
          setLoading(false);
          toast.success("User authenticated!");

          // IdP data available using getAdditionalUserInfo(result)
          // ...
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          setLoading(false);
          toast.error(errorMessage);
          // ...
        });
    } catch (e) {
      toast.error(e.message);
      setLoading(false);
    }
  };

  return (
    <>
      {loginForm ? (
        <>
          {" "}
          <div className="signup-wrapper">
            <h2 className="title">
              Login on{" "}
              <span style={{ color: "var(--theme)" }}>Expense Explorer.</span>
            </h2>
            <form>
              <Input
                type={"email"}
                label={"Email"}
                state={email}
                setState={setEmail}
                placeholder={"johndoe@example.com"}
              />
              <Input
                type={"password"}
                label={"Password"}
                state={password}
                setState={setPassword}
                placeholder={"Password"}
              />

              <Button
                text={loading ? "Loading..." : "Login Using Email and Password"}
                onClick={loginUsingEmail}
                disabled={loading}
              />
              <p style={{ textAlign: "center", margin: 0 }}>or</p>
              <Button
                onClick={googleAuth}
                text={loading ? "Loading..." : "Login Using Google"}
                blue={true}
              />
              <p
                className="p-login"
                style={{ cursor: "pointer" }}
                onClick={() => setLoginForm(!loginForm)}
              >
                Or Don't Have An Account? Click Here
              </p>
            </form>
          </div>
        </>
      ) : (
        <div className="signup-wrapper">
          <h2 className="title">
            Sign Up on{" "}
            <span style={{ color: "var(--theme)" }}>Expense Explorer.</span>
          </h2>
          <form>
            <Input
              type={"text"}
              label={"Full name"}
              state={name}
              setState={setName}
              placeholder={"Jhon Doe"}
            />
            <Input
              type={"email"}
              label={"Email"}
              state={email}
              setState={setEmail}
              placeholder={"johndoe@example.com"}
            />
            <Input
              type={"password"}
              label={"Password"}
              state={password}
              setState={setPassword}
              placeholder={"Password"}
            />
            <Input
              type={"password"}
              label={"Confirm Password"}
              state={confirmPassword}
              setState={setConfirmPassword}
              placeholder={"Confirm Password"}
            />
            <Button
              text={loading ? "Loading..." : "Signup Using Email and Password"}
              onClick={signupWithEmail}
              disabled={loading}
            />
            <p style={{ textAlign: "center", margin: 0 }}>or</p>
            <Button
              onClick={googleAuth}
              text={loading ? "Loading..." : "Signup Using Google"}
              blue={true}
            />
            <p
              className="p-login"
              style={{ cursor: "pointer" }}
              onClick={() => setLoginForm(!loginForm)}
            >
              Or Have An Account Already? Click Here
            </p>
          </form>
        </div>
      )}
    </>
  );
}

export default SignupSigninComponent;
