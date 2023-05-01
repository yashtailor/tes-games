import React, { useState } from 'react'
// import Table, { AvatarCell, SelectColumnFilter, StatusPill } from '../utilities/Table'  // new

// const getData = () => {
//   const data = [
//     {
//       name: 'Jane Cooper',
//       email: 'jane.cooper@example.com',
//       title: 'Regional Paradigm Technician',
//       department: 'Optimization',
//       status: 'Active',
//       role: 'Admin',
//       age: 27,
//       imgUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
//     },
//     {
//       name: 'Cody Fisher',
//       email: 'cody.fisher@example.com',
//       title: 'Product Directives Officer',
//       department: 'Intranet',
//       status: 'Inactive',
//       role: 'Owner',
//       age: 43,
//       imgUrl: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
//     },
//     {
//       name: 'Esther Howard',
//       email: 'esther.howard@example.com',
//       title: 'Forward Response Developer',
//       department: 'Directives',
//       status: 'Active',
//       role: 'Member',
//       age: 32,
//       imgUrl: 'https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
//     },
//     {
//       name: 'Jenny Wilson',
//       email: 'jenny.wilson@example.com',
//       title: 'Central Security Manager',
//       department: 'Program',
//       status: 'Offline',
//       role: 'Member',
//       age: 29,
//       imgUrl: 'https://images.unsplash.com/photo-1498551172505-8ee7ad69f235?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
//     },
//     {
//       name: 'Kristin Watson',
//       email: 'kristin.watson@example.com',
//       title: 'Lean Implementation Liaison',
//       department: 'Mobility',
//       status: 'Inactive',
//       role: 'Admin',
//       age: 36,
//       imgUrl: 'https://images.unsplash.com/photo-1532417344469-368f9ae6d187?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
//     },
//     {
//       name: 'Cameron Williamson',
//       email: 'cameron.williamson@example.com',
//       title: 'Internal Applications Engineer',
//       department: 'Security',
//       status: 'Active',
//       role: 'Member',
//       age: 24,
//       imgUrl: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60',
//     },
//   ]
//   return [...data, ...data, ...data]
// }

const Home = () => {
  // const columns = React.useMemo(() => [
  //   {
  //     Header: "Name",
  //     accessor: 'name',
  //     Cell: AvatarCell,
  //     imgAccessor: "imgUrl",
  //     emailAccessor: "email",
  //   },
  //   {
  //     Header: "Title",
  //     accessor: 'title',
  //   },
  //   {
  //     Header: "Status",
  //     accessor: 'status',
  //     Cell: StatusPill,
  //   },
  //   {
  //     Header: "Age",
  //     accessor: 'age',
  //   },
  //   {
  //     Header: "Role",
  //     accessor: 'role',
  //     Filter: SelectColumnFilter,  // new
  //     filter: 'includes',
  //   },
  // ], [])

  const [eventName,setEventName] = useState('');
  const [numTeams,setNumTeams] = useState(4);
  const [numGames,setNumGames] = useState(4);

  let events = JSON.parse(localStorage.getItem("events"));
  events = events == null ? [] : events; 

  function addEvent(){
    let teams = [];
    for(let i=1;i<=numTeams;i++){
      console.log(document.getElementById("team"+i).value,document.getElementById("teamColor"+i))
      teams.push({
        teamName : document.getElementById("team"+i).value,
        teamColor : document.getElementById("teamColor"+i).value,
        teamId : i
      });
    }
    let games = [];
    for(let i=1;i<=numGames;i++){
      games.push({
        gameName : document.getElementById("game"+i).value,
        gameScore : document.getElementById("gameScore"+i).value,
        gameId : i,
        teamScores : teams.map(_ => 0),
        isPlayed : false
      })
    }
    events.push({
      name : eventName,
      numTeams : numTeams,
      numGames : numGames,
      teams : teams,
      games : games,
      id : events.length + 1,
      isPlayed : false,
      isInProgress : false,
      isDeleted: false
    });
    document.getElementById("alert").classList.remove("invisible");
    setTimeout(()=>{
      if(document.getElementById("alert") != null)document.getElementById("alert").classList.add("invisible");
    },5000);
    console.log(events);
    localStorage.setItem('events',JSON.stringify(events));
  }

  const getTeamNames = ()=>{
    const content = [];
    for(let i=1;i<=numTeams;i++){
      let id = "team"+i;
      let colorId = "teamColor"+i;
      content.push(<div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for={id}>
        Team {i} Name :
      </label>
      <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id={id} type="text" defaultValue={"Team "+i}/>
      <input type="color" id={colorId}/>
    </div>)
    }  
    return content;
  }

  const getGameNames = ()=>{
    const content = [];
    for(let i=1;i<=numGames;i++){
      let id = "game"+i;
      let gameScoreId = "gameScore"+i;
      content.push(<div class="mb-4">
      <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for={id}>
             Game {i} Name :
            </label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id={id} type="text" defaultValue={"Game "+i}/>
          </div>
          <div class="mb-6">
            <label class="block text-gray-700 text-sm font-bold mb-2" for={gameScoreId}>
              Game {i} Score :
            </label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id={gameScoreId} type="number" placeholder="Game score" defaultValue={100}/>
          </div>
      </div>)
    }  
    return content;
  }

  // const data = React.useMemo(() => getData(), [])

    return <div>
      <div class="w-full max-w-xs" className="invisible" id="alert">
        <div class="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3" role="alert">
        <p class="font-bold">Event {eventName} added successfully!</p>
        </div>
      </div>
      <h1 className="text-3xl font-bold">Create an Event</h1>
      <div>
        <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="eventName">
              Event Name
            </label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="gameName" type="text" placeholder="Event Name" onChange={e => setEventName(e.target.value)} value={eventName}/>
          </div>
          <div class="mb-6">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="numTeams">
              Number of Teams
            </label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="numTeams" type="number" placeholder="Number of Teams" onChange={e => setNumTeams(e.target.value)} value={numTeams}/>
          </div>
          <div class="mb-6">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="numTeams">
              Number of Games
            </label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="numTeams" type="number" placeholder="Number of Games" onChange={e => setNumGames(e.target.value)} value={numGames}/>
          </div>
          {/* Team Names */}
          {getTeamNames()}
          {getGameNames()}

          <div class="flex items-center justify-between" onClick={addEvent}>
            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
              Create Event
            </button>
          </div>
        </form>
      </div>
      {/* <div className="mt-6">
          <Table columns={columns} data={data} />
        </div> */}
    </div>;
};
  
export default Home;