// import { useEffect, useState } from "react";

// function App() {
//   const [message, setMessage] = useState("");

//   // Fetching message from backend on mount
//   useEffect(() => {
//     fetch("https://sp-enterprises.onrender.com")
//       .then((res) => res.json())
//       .then((data) => setMessage(data.message));
//   }, []);

//   return (
//     <div className="App">
//       <h1>{message}</h1>
//     </div>
//   );
// }

// export default App;


import { Route, Routes } from "react-router-dom";
import { Login, SignUp } from "./pages";
import Home from "./pages/Home";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;