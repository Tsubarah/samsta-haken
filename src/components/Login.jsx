import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import ClipLoader from "react-spinners/ClipLoader";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { login, currentUser, loginSwipe, setLoginSwipe } = useAuthContext();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Try to log in the user
    try {
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      console.log("Success logging in as:", currentUser);
      navigate("/");
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <>
      {loading && (
        <div className="flex justify-center p-4">
          <ClipLoader color="#FFFF" />
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="bg-grey-lighter flex flex-col">
          <div className="container max-w-xs mx-auto flex-1 flex flex-col items-center justify-center px-2">
            <div className="flex justify-center flex-col bg-white px-6 py-8 rounded shadow-md text-black w-full">
              <h1 className="mb-8 text-3xl text-center">Login</h1>

              <input
                type="text"
                className="block border border-grey-light p-3 rounded mb-4"
                name="email"
                ref={emailRef}
                placeholder="Email"
              />

              <input
                type="password"
                className="block border border-grey-light p-3 rounded mb-4"
                name="password"
                ref={passwordRef}
                placeholder="Password"
              />

              <button className="block border border-grey-light p-3 mb-5 rounded">
                Login
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* Show error message */}
      {error && (
        <div className="pt-2">
          <div className="alert alert-error shadow-lg">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current flex-shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{error}</span>
            </div>
          </div>
        </div>
      )}

      <div className="text-grey-dark mb-5 flex flex-col justify-center">
        <p className="m-auto pt-4 text-md">Don't have an account?</p>
        <button
          className="px-8 h-8 underline text-sm"
          onClick={() => {
            setLoginSwipe(true);
          }}>
          Create account
        </button>
      </div>
    </>
  );
};

export default Login;
