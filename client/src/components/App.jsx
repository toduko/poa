import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import PageNotFound from "./PageNotFound";
import Room from "./Room";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/room/:roomId" element={<Room />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
};

export default App;
