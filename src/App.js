import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useEffect,useState } from 'react';
import UserDetail from './component/UserDetail';


function App() {

  const [data, setData] = useState(null);
  const [user, setUser] = useState(null);
  const [uid, setId] = useState(null);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [sortState, setSortState] = useState("none");

useEffect(() => {
  fetch(`https://jsonplaceholder.typicode.com/todos`)
   .then((response) => {
    if(response.ok){
      return response.json()
    }
    throw response;
   })
   .then(data=>{
      
      setData(data);
   })
   .catch(error=>{
    console.log("error occured while fetching")
   })
 }, []);

 useEffect(() => {
 },[sortState]);

 const onHandleView = (e, id) =>{
  e.preventDefault();
  setUser(e.target.id);
  setId(id);
 }

 const searchItems = (searchValue) =>{
  setSearchInput(searchValue)
  if (searchInput !== '') {
      const filteredData = data.filter((item) => {
          return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
      })
      setFilteredResults(filteredData)
  }
  else{
      setFilteredResults(data)
  }

 }
 const sorting = (e) =>{
    if(e == "ascending"){
      data.sort((a, b) => {
        if (a.title < b.title) {
          return -1;
        }}
       );
    }else{
      data.sort((a, b) => {
        if (a.title > b.title) {
          return -1;
        }}
       );
    }
    return 0;
 }
 
  return (
    <div className="container mt-5">
      <div className='row'>
        <div className='col-6'>

        <h1>Todos</h1>
      <div className=''>
      <select className=' float-start' defaultValue={'DEFAULT'} onChange={(e) => {sorting(e.target.value); setSortState(e.target.value) }}>
        <option value="DEFAULT" disabled>None</option>
        <option value="ascending">Ascending</option>
        <option value="descending">Descending</option>
      </select>
      <input
        className="input-sm float-end"
        type="text"
        placeholder="Search here"
        onChange={(e) => searchItems(e.target.value)}        />
        </div>
        <Table striped bordered hover className='mt-5'>
      <thead>
        <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {
          searchInput.length > 1 ? filteredResults.map((user)=>{
            return(
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.title}</td>
                <td>{user.completed? "complete": "incomplete"}</td>
                <td><Button id={user.id} onClick={(e)=>onHandleView(e,`${user.userId}`)} variant="primary">View</Button>
                </td>
              </tr>
            );
          }):
          data&&
          data.map((user)=>{
            return(
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.title}</td>
                <td>{user.completed? "complete": "incomplete"}</td>
                <td><Button id={user.id} onClick={(e)=>onHandleView(e,`${user.userId}`)} variant="primary">View</Button>
                </td>
              </tr>
            );
          })
        }
        
        
    
      </tbody>
    </Table>

        </div>
        <UserDetail userId={user} id={uid} />
      </div>
    </div>
  );
}

export default App;
