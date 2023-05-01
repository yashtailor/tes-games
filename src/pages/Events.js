import React from "react";
import { Link } from "react-router-dom";
import Table from "../utilities/Table";

const Events = () => {
    const getData = ()=>{
        return JSON.parse(localStorage.getItem("events")).filter((event)=>event.isDeleted==false);
    }
    const deleteEvent = (eventId)=>{
        console.log(eventId)
        let events = JSON.parse(localStorage.getItem("events"));
        console.log(events);
        events[eventId-1].isDeleted = true;
        localStorage.setItem('events',JSON.stringify(events));
        window.location.reload(false);
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
                let numGamesPlayed = 0;
                original.games.map((game)=>{
                    if(game.isPlayed)numGamesPlayed++;
                })
                return (<Link to={"/event/"+original.id} className="p-2 rounded" style={{backgroundColor:getBgColor(numGamesPlayed,original.games.length)}}>Go to Event {original.id}</Link>)
                // <Link to={'/event/'+original.id}>Go To Game {id}</Link>
            }
        },
        {
            Header: 'Delete',
            accessor: 'isDeleted',
            Cell: ({row : {original}}) => {
                return (<button onClick={()=>{deleteEvent(original.id)}}>Delete</button>)
                // <Link to={'/event/'+original.id}>Go To Game {id}</Link>
            }
        },
    ], []);

    const data = React.useMemo(() => getData(), []);

    return <div>
        {data && data.length > 0 ? <Table columns={columns} data={data}/> : <div>No Events</div>}
    </div>
}
export default Events;