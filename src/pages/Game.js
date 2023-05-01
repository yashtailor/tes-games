import React from "react";
import { useParams } from "react-router-dom";
import Table from "../utilities/Table";
import wc_hex_is_light from "../utilities/Color";
import { Link } from "react-router-dom";

const Game = () => {
    let {eventId,gameId} = useParams();
    console.log(eventId,gameId);

    let events = JSON.parse(localStorage.getItem("events"));
    let curEvent = events.filter((event)=>event.id == eventId);
    let curEventName = curEvent[0].name;
    console.log(curEvent[0]);
    let curGame = curEvent[0].games.filter((game)=>game.gameId == gameId);
    console.log("curGame===",curGame[0]);
    let curGameName = curGame[0].gameName;
    let curChances = Number(curEvent[0].teams.length);
    let atomicGameScore = Number(curGame[0].gameScore)/Number(curEvent[0].teams.length);
    let curGameMaxScore = curGame[0].gameScore;
    let isCurGamePlayed = curGame[0].isPlayed;
    let numNonZero = curGame[0].teamScores.filter((score)=>score > 0).length;

    let saveGame = ()=>{
      let scores = [];
      for(let i=1;i<=curEvent[0].teams.length;i++){
        scores.push(document.getElementById("teamScore"+i).innerText);
      }
      events[eventId-1].games[gameId-1].isPlayed = true;
      events[eventId-1].games[gameId-1].teamScores = scores;
      localStorage.setItem("events",JSON.stringify(events));
      document.getElementById("alert").classList.remove("invisible");
      setTimeout(()=>{
        if(document.getElementById("alert") != null)document.getElementById("alert").classList.add("invisible");
      },5000);
    }

    let score = (id)=>{
      curChances = curChances - numNonZero;
      console.log("NUM NON ZERO",numNonZero);
      document.getElementById("teamScore"+id).innerText = atomicGameScore*curChances;
      events[eventId-1].games[gameId-1].teamScores[id-1] = atomicGameScore*curChances;
      localStorage.setItem("events",JSON.stringify(events));
      document.getElementById("teamScore"+id).classList.add('pointer-events-none');
      curChances--;
      console.log("oho cur chances:",curChances);
    }

    const columns = React.useMemo(() => [
        {
          Header: "Team Id",
          accessor: 'teamId',
        },
        {
          Header: "Team Name",
          accessor: 'teamName',
        },
        {
            Header: 'Team Score',
            accessor: 'teamColor',
            Cell: ({row : {original}}) => {
                console.log(events[eventId-1].games[gameId-1].teamScores);
                let teamColor = original.teamColor;
                console.log(wc_hex_is_light(teamColor));
                let curScore = Number(events[eventId-1].games[gameId-1].teamScores[original.teamId-1]);
                let classes;
                console.log("CUR SCORE",curScore);
                if(curScore > 0){
                  classes = "p-3 pointer-events-none";
                }
                else classes = "p-3 cursor-pointer"
                return (<div className={classes} style={{backgroundColor:teamColor,color:wc_hex_is_light(teamColor) ? 'black' : 'white'}} id={"teamScore"+original.teamId} onClick={()=>{score(original.teamId)}}>{events[eventId-1].games[gameId-1].teamScores[original.teamId-1]}</div>)
                // <Link to={'/event/'+original.id}>Go To Game {id}</Link>
            }
        },
    ], []);

    const data = curEvent[0].teams;
    // console.log("data===",data);

    return <div>
        <div class="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3 invisible" role="alert" id="alert">
          <p class="font-bold">Game Details Saved Successfully!</p>
          {/* <p class="text-sm">Some additional text to explain said message.</p> */}
        </div>
        <h1 className="text-3xl font-bold">Event : {curEventName}</h1>
        <h1 className="text-3xl font-bold">Game : {curGameName}</h1>
        <h1 className="text-3xl font-bold">Game Max Score : {curGameMaxScore}</h1>
        <br />
        {data && data.length > 0 ? <Table columns={columns} data={data}/> : <div>No Teams</div>}
        {!isCurGamePlayed && <div class="flex items-center justify-between" onClick={saveGame}>
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
              Done
            </button>
        </div>}
    </div>
}
export default Game;