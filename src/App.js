import {Header} from './components/Header';
import { Routes, Route} from "react-router-dom";


import PlayArea from './pages/PlayArea';
import Rating from './pages/Rating';
import ActivePlayer from './pages/ActivePlayer';
import GameHistory from './pages/GameHistory';
import PlayerList from './pages/PlayerList';

function App() {
  return (
    <div className="App">
        <Header/>
        <Routes>
            <Route exact path="/play" element={<PlayArea/>}/>
            <Route exact path="/rating" element={<Rating/>}/>
            <Route exact path="/active-player" element={<ActivePlayer/>}/>
            <Route exact path="/game-history" element={<GameHistory/>}/>
            <Route exact path="/player-list" element={<PlayerList/>}/>
        </Routes>
    </div>
  );
}

export default App;
