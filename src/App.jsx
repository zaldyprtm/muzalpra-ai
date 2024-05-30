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
  const [showResult, setShowResult] = useState(false); // State untuk mengelola animasi hasil

  const handleSubmit = async () => {
    setLoading(true);
    setShowResult(false); // Sembunyikan hasil sebelumnya saat loading
    const ai = await requestToGroqAI(content);
    setTimeout(() => {
      setData(ai);
      setSubmittedContent(content);
      setLoading(false);
      setContent("");
      setShowResult(true); // Tampilkan hasil dengan animasi
    }, 2000);
  };

  return (
    <>
      <Navbar />
      <main className="flex flex-col min-h-[80vh] justify-center items-center max-w-xl w-full mx-auto rounded-md mt-20">
        <h1 className="text-4xl font-bold text-indigo-500 uppercase">MUZALPRA | AI</h1>

        {/* form */}
        <form className="flex flex-col gap-4 py-4 w-full" onSubmit={(e) => e.preventDefault()}>
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
            {loading ? (
              <div className="loader"></div>
            ) : (
              "Submit"
            )}
          </button>
        </form>

        {/* div to display the submitted content */}
        {submittedContent && (
          <div className="py-2 px-4 text-md rounded-md w-56 md:w-full mx-auto mt-4 bg-sky-300 text-black font-semibold">
            <p>Pertanyaan kamu: {submittedContent}</p>
          </div>
        )}

        {/* kotak untuk menampilkan hasil pencarian atau permintaan user */}
        <div className={`max-w-xl rounded-xl md:w-full mx-auto rounded-e-lg w-[300px] mt-4 ${showResult ? 'fade-in' : ''}`}>
          {data && (
            <SyntaxHighlight language="id" style={darcula} wrapLongLines={true}>
              {data}
            </SyntaxHighlight>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

export default App;
