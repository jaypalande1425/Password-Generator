import { useState, useCallback } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllow, setNumberAllow] = useState(false);
  const [charAllow, setCharAllow] = useState(false);
  const [password, setPassword] = useState("");

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllow) str += "0123456789";
    if (charAllow) str += "~`!@#$%^&*()-_=+[{]}\\|;:',<.>/?";

    for (let i = 0; i < length; i++) {
      let charIndex = Math.floor(Math.random() * str.length);
      pass += str.charAt(charIndex);
    }
    setPassword(pass);
  }, [length, numberAllow, charAllow]);

  const copyPassword = () => {
    navigator.clipboard.writeText(password);
    alert("Password copied!");
  };

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800">
        <h1 className="text-white text-center my-2">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="password"
            readOnly
          />
          <button
            onClick={copyPassword}
            className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
          >
            Copy
          </button>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-white">
            <input
              type="range"
              min={6}
              max={20}
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="cursor-pointer"
            />
            <label>Length: {length}</label>
          </div>

          <div className="flex items-center gap-2 text-white">
            <input
              type="checkbox"
              checked={numberAllow}
              onChange={(e) => setNumberAllow(e.target.checked)}
            />
            <label>Include Numbers</label>
          </div>

          <div className="flex items-center gap-2 text-white">
            <input
              type="checkbox"
              checked={charAllow}
              onChange={(e) => setCharAllow(e.target.checked)}
            />
            <label>Include Special Characters</label>
          </div>

          <button
            onClick={passwordGenerator}
            className="bg-green-600 text-white py-2 rounded mt-2"
          >
            Generate Password
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
