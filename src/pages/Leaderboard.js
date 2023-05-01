import React from "react";
import { Link } from "react-router-dom";
import Table from "../utilities/Table";

const Leaderboard = () => {
    const getData = ()=>{
        return JSON.parse(localStorage.getItem("events")).filter((event)=>event.isDeleted==false);
    }
    const getBgColor = (numPlayed,numActual)=>{
        if(numPlayed == numActual)return '#21ff2c';
        if(numPlayed > 0)return '#fbff21';
        return '';
    }
    const columns = React.useMemo(() => [
        {
          Header: "Event Name",
          accessor: 'name',
        },
        {
          Header: "Num Teams",
          accessor: 'numTeams',
        },
        {
          Header: "Num Games",
          accessor: 'numGames',
        },
        {
            Header: 'Link',
            accessor: 'id',
            Cell: ({row : {original}}) => {
                console.log(original);
                let numGamesPlayed = 0;
                original.games.map((game)=>{
                    if(game.isPlayed)numGamesPlayed++;
                })
                return (<Link to={"/leaderboard/event/"+original.id} className="p-2 rounded" style={{backgroundColor:getBgColor(numGamesPlayed,original.games.length)}}>Go to Leaderboard of Event {original.id}</Link>)
                // <Link to={'/event/'+original.id}>Go To Game {id}</Link>
            }
        },
    ], []);

    const data = React.useMemo(() => getData(), []);

    return <div>
        {data && data.length > 0 ? <Table columns={columns} data={data}/> : <div>No Events</div>}
    </div>
}
export default Leaderboard;