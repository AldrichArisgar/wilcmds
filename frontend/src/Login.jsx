import { useContext, useState } from "react";
import { client } from "./Url";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { Navigate } from "react-router-dom";

import { UserContext } from "./App";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [toast, setToast] = useState("");
  const [currentUser, setCurrentUser] = useContext(UserContext);

  function submitLogin(e) {
    e.preventDefault();
    try {
      client
        .post("/login", {
          email: email,
          password: password,
        })
        .then(function (res) {
          console.log(res.data);
          setCurrentUser(true);
        })
        .catch((error) => {
          console.error(error.response.data);
          if (error.response.data && error.response) {
            const invalidToast = error.response.data;
            handleToast(invalidToast);
            setIsError(true);
          }
        });
    } catch (error) {
      console.error(
        "An unexpected error occured during the HTTP request.",
        error
      );
    }
  }

  if (currentUser) {
    return (
      <>
        <Navigate to="/explore" />
      </>
    );
  }

  function handleToast(toast) {
    setToast(toast);
  }
  
  return (
    <>
      <div className="flex items-center justify-center h-screen w-full">
        <div className="border-2 border-black rounded-2xl w-96">
          <div className="flex flex-col p-8 space-y-6">
            <div className="text-2xl font-semibold">
              Sign In
            </div>
            <span
              id="span_toast"
              className={`text-[12px] w-full py-1 ${
                isError ? "border-red-600" : "hidden"
              }  text-center rounded border text-red-600 ${
                toast ? "" : "hidden"
              }`}
            >
              {toast}
            </span>

            <form className="grid gap-4" onSubmit={(e) => submitLogin(e)}>
              {/* Email Field */}
              <div className="border-2 border-black w-full rounded-xl flex flex-row relative">
                <FontAwesomeIcon
                  icon={faEnvelope}
                  className="absolute top-[14px] left-[12px]"
                />
                <input
                  className="text-sm pl-10 py-3 placeholder-black bg-inherit w-full  rounded-sm text-custom-gray focus:outline-yellow focus:outline-none focus:outline-[1px]"
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                />
              </div>
              {/* Password Field */}
              <div className="border-2 border-black w-full rounded-xl flex flex-row relative">
                <FontAwesomeIcon
                  icon={faLock}
                  className="absolute top-[14px] left-[12px] text-custom-gray"
                />
                <input
                  className="text-sm pl-10 py-3 placeholder-black bg-inherit w-full border-none rounded-sm text-custom-gray focus:outline-yellow focus:outline-none focus:outline-[1px]"
                  type="password"
                  name="email"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
              </div>

            
              <button
                type="submit"
                className="py-2 mt-4 border-2 rounded-xl text-white bg-yellow hover:bg-black hover:text-white"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
