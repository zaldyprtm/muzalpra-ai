import { useState } from "react";
import "./App.css";
import { requestToGroqAI } from "./utils/groq";
import { Light as SyntaxHighlight } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/hljs";
import Navbar from "./layouts/Navbar";
import Footer from "./layouts/Footer";

function App() {
  const [data, setData] = useState("");
  const [content, setContent] = useState("");
  const [submittedContent, setSubmittedContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegister, setIsRegister] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setShowResult(false);
    const ai = await requestToGroqAI(content);
    setTimeout(() => {
      setData(ai);
      setSubmittedContent(content);
      setLoading(false);
      setContent("");
      setShowResult(true);
    }, 2000);
  };

  const handleLogin = () => {
    const storedUser = localStorage.getItem("username");
    const storedPass = localStorage.getItem("password");
    if (username === storedUser && password === storedPass) {
      setIsLoggedIn(true);
    } else {
      alert("Login failed! Please check your username and password.");
    }
  };

  const handleRegister = () => {
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);
    alert("Registration successful! Please log in.");
    setIsRegister(false);
  };

  return (
    <>
      <Navbar
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        setUsername={setUsername}
        setPassword={setPassword}
      />
      <main className="flex flex-col min-h-[80vh] justify-center items-center max-w-xl w-full mx-auto rounded-md mt-20">
        <h1 className="text-4xl font-bold text-indigo-500 uppercase">
          MUZALPRA | AI
        </h1>

        {!isLoggedIn ? (
          <div className="flex flex-col gap-4 py-4 w-full">
            <form>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="py-2 px-4 text-md rounded-md w-56 md:w-full mx-auto"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="py-2 px-4 text-md rounded-md w-56 md:w-full mx-auto"
              />
              {isRegister ? (
                <button
                  type="button"
                  onClick={handleRegister}
                  className="bg-sky-500 text-white py-2 px-4 font-semibold rounded-lg mx-auto flex justify-center items-center"
                >
                  Register
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleLogin}
                  className="bg-sky-500 text-white py-2 px-4 font-semibold rounded-lg mx-auto flex justify-center items-center"
                >
                  Login
                </button>
              )}
              <button
                type="button"
                onClick={() => setIsRegister(!isRegister)}
                className="text-sky-500 mx-auto"
              >
                {isRegister
                  ? "Already have an account? Login"
                  : "Don't have an account? Register"}
              </button>
            </form>
          </div>
        ) : (
          <>
            <form
              className="flex flex-col gap-4 py-4 w-full"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="text"
                placeholder="ketik permintaan kamu disini..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="py-2 px-4 text-md rounded-md w-56 md:w-full mx-auto"
              />
              <button
                type="button"
                onClick={handleSubmit}
                className="bg-sky-500 text-white py-2 px-4 font-semibold rounded-lg mx-auto flex justify-center items-center"
                disabled={loading}
              >
                {loading ? <div className="loader"></div> : "Submit"}
              </button>
            </form>

            {submittedContent && (
              <div className="py-2 px-4 text-md rounded-md w-56 md:w-full mx-auto mt-4 bg-sky-300 text-black font-semibold">
                <p>Pertanyaan kamu: {submittedContent}</p>
              </div>
            )}

            <div
              className={`max-w-xl rounded-xl md:w-full mx-auto rounded-e-lg w-[300px] mt-4 ${
                showResult ? "fade-in" : ""
              }`}
            >
              {data && (
                <SyntaxHighlight
                  language="id"
                  style={darcula}
                  wrapLongLines={true}
                >
                  {data}
                </SyntaxHighlight>
              )}
            </div>
          </>
        )}
      </main>
      <Footer />
    </>
  );
}

export default App;
