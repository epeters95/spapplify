import { Routes, Route, Outlet } from "react-router-dom";
import './App.css'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/callback" element={<Callback />} />
        </Route>
      </Routes>
    </div>
  );
}

function Callback() {
    return (
        <div>
        <h1>Display your Spotify profile data</h1>

        <section id="profile">
        <h2>Logged in as <span id="displayName"></span></h2>
        <span id="avatar"></span>
        <ul>
            <li>User ID: <span id="id"></span></li>
            <li>Email: <span id="email"></span></li>
            <li>Spotify URI: <a id="uri" href="#"></a></li>
            <li>Link: <a id="url" href="#"></a></li>
            <li>Profile Image: <span id="imgUrl"></span></li>
        </ul>
        </section>
        </div>
    );
}

function Layout() {

    return (
    <div>
        <header className="App-header">
        <marquee>Spapplify</marquee>
      <main>
        <h3>
          Select a playlist below:
        </h3>
        <h3>
          Choose a song to add to your playlist.
        </h3>
        <div className="song-search">
            <label id="search">Search: </label>
            <input id="search" type="text" placeholder="Type a song here" />
        </div>
      </main>
      <Outlet/>
      </header>
    </div>
  );
}

export default App;

