import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useEffect,useState } from 'react';

function UserDetail(props) {

    const [data, setData] = useState(null);
    const [userId, setUserId] = useState(1);
    const [uId, setUId] = useState();

    useEffect(() => {
        setUserId(props.userId);
        setUId(props.id);
        fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
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
       }, [props.userId]);
    return(
        <div className='col-6'>
            { props.userId&& 
            <>
                <h1>User Detail</h1>
                <div className='border mt-5'>

                <Table  hover className='table-borderless'>
                <tbody>
                    <tr>
                        <td>ToDo ID</td>
                        <td>{data.id}</td>
                    </tr>
                    <tr>
                        <td>ToDo Title</td>
                        <td>{data.name}</td>
                    </tr>
                    <tr>
                        <td>User ID</td>
                        <td>{props.id}</td>
                    </tr>
                    <tr>
                        <td>Name</td>
                        <td>{data.username}</td>
                    </tr>
                    <tr>
                        <td>Email</td>
                        <td>{data.email}</td>
                    </tr>
                </tbody>
                </Table>
                </div>
            </>
            }

      </div>
    )


}

export default UserDetail;