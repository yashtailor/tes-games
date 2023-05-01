import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Game from "./pages/Game";
import Events from "./pages/Events";
import Event from "./pages/Event";
import LeaderboardEvent from "./pages/LeaderboardEvent";
import Leaderboard from "./pages/Leaderboard";

export default function App() {
  // console.log = function(){}
  // window.console = console;
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="events" element={<Events />} />
          <Route path="event/:id" element={<Event />} />
          <Route path="event/:eventId/game/:gameId" element={<Game />} />
          <Route path="leaderboard/event/:id" element={<LeaderboardEvent />} />
          <Route path="leaderboard" element={<Leaderboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
