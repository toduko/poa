import { Routes, Route } from "react-router-dom";
import GameList from "./GameList";
import PageNotFound from "./PageNotFound";
import Room from "./Room";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<GameList />} />
        <Route exact path="/room/:roomId" element={<Room />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
};

export default App;
