import React, { useEffect, useState } from 'react'

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import {useParams, useHistory } from 'react-router-dom';




const Details = () => {

    const [getuserdata, setUserdata] = useState([]);
    console.log(getuserdata);

    const { id } = useParams("");
    console.log(id);

    const history = useHistory();


    const getdata = async () => {

        const res = await fetch(`/induser/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const data = await res.json();
        console.log(data);

        if (res.status === 422 || !data) {
            console.log("error ");

        } else {
            setUserdata(data[0])
            console.log("get data");
        }
    }

    useEffect(() => {
        getdata();
    }, [])

    const deleteuser = async (id) => {

        const res2 = await fetch(`/deleteuser/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });

        const deletedata = await res2.json();
        console.log(deletedata);

        if (res2.status === 422 || !deletedata) {
            console.log("error");
        } else {
            console.log("user deleted");
            history.push("/");
        }

    }

    return (
        <div className="container"style={{fontWeight: 40, marginTop: 150 }}>


            <Card sx={{ maxWidth: 500, borderRadius: 5 }} style={{ marginLeft: 350 }}>
                <CardContent>

                    <h3 style={{ textAlign: 'center' }}>Are you want to delete</h3>
                    <img src="/th.jpg" style={{marginLeft: 130,maxHeight: 200 }} />

                    <div className='row' style={{marginLeft:100 }}>
                        <div class="add_btn mt-5">


                            <a href={`/`}>  <button className="btn btn-dark" >CANCEL</button></a>

                            <button class="btn btn-dark" style={{ marginLeft:80,textAlign:'right' }} onClick={() => deleteuser(getuserdata.id)} >DELETE</button>
                        </div>
                
</div>                </CardContent>     </Card>
        </div>




    )
}

export default Details