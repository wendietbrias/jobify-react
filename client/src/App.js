import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Auth, Landing, Main, Stats, AddJob, AllJobs, Profile } from "./pages";

function App() {
  const [id, setId] = useState(null);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />}>
          <Route path="/" element={<Stats />} />
          <Route path="/all" element={<AllJobs setId={setId} />} />
          <Route path="/add" element={<AddJob id={id} setId={setId} />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/landing" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
      </Routes>
    </div>
  );
}

export default App;
