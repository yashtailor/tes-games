import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Table from "../utilities/Table";
import wc_hex_is_light from "../utilities/Color";

 /**
   * @desc get table data as json
   * @param data
   * @param columns
   */
 const getTableDataForExport = (data, columns) => data?.map((record) => columns
 .reduce((recordToDownload, column) => (
   { ...recordToDownload, [column.Header]: record[column.accessor] }
 ), {}));
 
 /**
  * @desc make csv from given data
  * @param rows
  * @param filename
  */
 const makeCsv = async (rows, filename) => {
   const separator = ',';
   const keys = Object.keys(rows[0]);
 
 const csvContent = `${keys.join(separator)}\n${
   rows.map((row) => keys.map((k) => {
     let cell = row[k] === null || row[k] === undefined ? '' : row[k];
 
     cell = cell instanceof Date
       ? cell.toLocaleString()
       : cell.toString().replace(/"/g, '""');
 
     if (cell.search(/("|,|\n)/g) >= 0) {
       cell = `"${cell}"`;
     }
     return cell;
   }).join(separator)).join('\n')}`;
 
 const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
   if (navigator.msSaveBlob) { // In case of IE 10+
     navigator.msSaveBlob(blob, filename);
   } else {
     const link = document.createElement('a');
     if (link.download !== undefined) {
       // Browsers that support HTML5 download attribute
       const url = URL.createObjectURL(blob);
       link.setAttribute('href', url);
       link.setAttribute('download', filename);
       link.style.visibility = 'hidden';
       document.body.appendChild(link);
       link.click();
       document.body.removeChild(link);
     }
   }
 };
 
const EventboardEvent = () => {
  let {id} = useParams();
  let [curEventName,setCurEventName] = useState();
  let [numGames,setNumGames] = useState();
  let [games,setGames] = useState();

  const getData = ()=>{
      let events = JSON.parse(localStorage.getItem("events"));
      console.log("id=======",id);
      events = events.filter((event)=>event.id == id);
      console.log(events.length);
      if(events.length == 1){
        setCurEventName(events[0].name);
        let teams = events[0].teams;
        let games = events[0].games;
        setNumGames(games.length);
        setGames(games);
        for(let i=0;i<teams.length;i++)teams[i].teamScore = 0;
        for(let i=0;i<games.length;i++){
          for(let j=0;j<teams.length;j++){
            console.log(teams[j]);
            teams[j][games[i].gameName] = Number(games[i].teamScores[j]);
            teams[j].teamScore += Number(games[i].teamScores[j]);
          }
        }
        console.log("TEAMSSSS",teams);
        return teams;
      }
      return null;
  }

  const cols = [];

  cols.push(
    {
      Header: "Team Name",
      accessor: 'teamName',
    }
  )

  for(let i=0;i<numGames;i++){
    cols.push({
      Header:games[i].gameName,
      accessor: games[i].gameName
    })
  }

  cols.push(
    {
      Header: "Team Score",
      accessor: 'teamScore',
      Cell: ({row : {original}}) => {
        let teamColor = original.teamColor;
        return (<div className="p-2" style={{backgroundColor:teamColor,color:wc_hex_is_light(teamColor) ? 'black' : 'white'}}>{original.teamScore}</div>)
        // <Link to={'/event/'+original.id}>Go To Game {id}</Link>
    }
    }
  )

  // const columns = React.useMemo(() => [
  //     {
  //       Header: "Team Name",
  //       accessor: 'teamName',
  //     },

  //     {
  //       Header: "Team Score",
  //       accessor: 'teamScore',
  //     }
  // ], []);

  const data = React.useMemo(() => getData(), []);

  return <div>
      <h1 className="text-3xl font-bold">Event : {curEventName}</h1>
      <br />
      {data && data.length > 0 ? <Table columns={cols} data={data}/> : <div>No Events</div>}
      <button
        type="button"
        onClick={() => makeCsv(getTableDataForExport(data, cols), `${curEventName}.csv`)}
      >
        Download table data CSV
      </button>
  </div>
}
export default EventboardEvent;