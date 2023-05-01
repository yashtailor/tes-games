import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Table from "../utilities/Table";
import { Link } from "react-router-dom";

const Event = () => {
    let {id} = useParams();

    let [eventName,setEventName] = useState('');

    const getData = ()=>{
        let events = JSON.parse(localStorage.getItem("events"));
        events = events.filter((event)=>event.id == id);
        if(events.length == 1){
            setEventName(events[0].name);
            return events[0].games;
        }
        return null;
    }

    const getBgColor = (isPlayed,isPartialPlayed) => {
        console.log(isPlayed,isPartialPlayed);
        if(isPlayed)return '#21ff2c';
        else if(isPartialPlayed) return '#fbff21';
        return '';
    }

    const columns = React.useMemo(() => [
        {
          Header: "Game Name",
          accessor: 'gameName',
        },
        {
          Header: "Game Score",
          accessor: 'gameScore',
        },
        {
            Header: 'Link',
            accessor: 'gameId',
            Cell: ({row : {original}}) => {
                console.log(original);
                let isPlayed = original.isPlayed;
                let isPartialPlayed = original.teamScores.filter((score)=>score>0).length > 0;
                return (<Link to={"/event/"+id+"/game/"+original.gameId} className="p-2 rounded" style={{backgroundColor:getBgColor(isPlayed,isPartialPlayed)}}>Go to {original.gameName}</Link>)
                // <Link to={'/event/'+original.id}>Go To Game {id}</Link>
            }
        },
    ], []);

    const data = React.useMemo(() => getData(), []);

    return <div>
        <h1 className="text-3xl font-bold">Event Name : {eventName}</h1>
        <br />
        {data && data.length > 0 ? <Table columns={columns} data={data}/> : <div>No Games</div>}
    </div>
}
export default Event;