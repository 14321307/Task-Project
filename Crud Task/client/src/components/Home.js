import React, { useState, useEffect, useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import ConfirmBox from './ConfirmBox';


import { adddata, deldata } from './context/ContextProvider';
import { updatedata } from './context/ContextProvider';


const Home = () => {

    const [getuserdata, setUserdata] = useState([]);
    const [open,setOpen]=useState(false);
    const [delData,setDeletedata]=useState({})


    const { udata, setUdata } = useContext(adddata);

    const { updata, setUPdata } = useContext(updatedata);

    const { dltdata, setDLTdata } = useContext(deldata);
    
    const getdata = async () => {

        const res = await fetch("/getuser", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();

        if (res.status === 422 || !data) {
            console.log("error ");

        } else {
            setUserdata(data)
            console.log("get data");

        }
    }

    useEffect(() => {
        getdata();
    }, [])

   
    function openDelete(data)
{
    setOpen(true)
   
}

    return (

        <>
           
            


            <div className="mt-5">
                <div className="container">
                    <div className="add_btn mt-2 mb-5 ">
                        <input type="search" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
                        <span class="fas fa-search" id="search-addon">
                        </span>

                        <a href="/register" className="btn btn-dark">ADD</a>
                    </div>

                    <table class="table">
                        <thead>
                            <tr className="table-light">
                                <th scope="col">Id</th>
                                <th scope="col">Firstname</th>
                                <th scope="col">Lastname</th>
                                <th scope="col">Location</th>
                                <th scope="col">Email</th>
                                <th scope="col">Dob</th>
                                <th scope="col">Education</th>
                                <th scope="col">Edit </th>
                               <th scope="col"> Action</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                getuserdata.map((element, id) => {
                                    return (
                                        
                                            <tr>
                                                <th scope="row">{id + 1}</th>
                                                <td>{element.fname}</td>
                                                <td>{element.lname}</td>
                                                <td>{element.location}</td>
                                                <td>{element.email}</td>
                                                <td>{element.Dob}</td>
                                                <td>{element.education}</td>


                                                 
                                                   <td><NavLink to={`edit/${element.id}`}><button class="btn btn-light"  onClick={() => edituser(element.id)}><i class="fa fa-edit"></i>Edit</button>   </NavLink></td> 
                                                
                                               
                                                
                                               <td><Link onClick={()=>openDelete(element.id) } to={'/'} ><button className="btn btn-light" ><i class="fa fa-trash"></i> Delete</button></Link></td>
                                               </tr>
                                    
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>            </div>
                <ConfirmBox
                open={open}
               
                deleteuser={deleteuser}/>
</>)
}

export default Home










