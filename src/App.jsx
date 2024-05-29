import { useState } from "react";
import "./App.css";
import { requestToGroqAI } from "./utils/groq";
import { Light as SyntexHighlight } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/hljs";
import Navbar from "./layouts/Navbar";

function App() {
  const [data, setData] = useState("");

  const handleSubmit = async () => {
    const ai = await requestToGroqAI(content.value);
    setData(ai);
  };
  return (
    <>
    <Navbar />
      <main className="flex flex-col min-h-[80vh] justify-center items-center max-w-xl w-full mx-auto rounded-md">
        <h1 className="text-4xl font-bold text-indigo-500">MUZALPRA|AI</h1>

        {/* form */}
        <form className="flex flex-col gap-4 py-4 w-full">
          <input
            type="text"
            placeholder="ketik permintaan disini..."
            id="content"
            name="content"
            className="py-2 px-4 text-md rounded-md w-56 mx-auto"
          />
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-sky-500 text-white py-2 px-4 font-semibold  rounded-lg mx-auto"
          >
            Submit
          </button>
        </form>
        {/* kotak untuk menampilkan hasil pencarian atau permintaan user */}
        <div className="max-w-xl rounded-lg w-full mx-auto">
          {data ? (

            <SyntexHighlight language="swift" style={darcula} wrapLongLines={true}>
            {data}
          </SyntexHighlight>
          ) : null }
        </div>
      </main>
    </>
  );
}

export default App;
