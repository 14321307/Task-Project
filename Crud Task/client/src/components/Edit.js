import React, { useContext, useEffect, useState } from 'react'
import { NavLink, useParams,useHistory } from 'react-router-dom'
import { updatedata } from './context/ContextProvider'


const Edit = () => {

    // const [getuserdata, setUserdata] = useState([]);
    // console.log(getuserdata);

   const {updata, setUPdata} = useContext(updatedata)

    const history = useHistory("");

    const [inpval, setINP] = useState({
        fname: "",
        lname:"",
        location:"",
        email: "",
        Dob:"",
        education:"",
       About:"",
        
    })

    const setdata = (e) => {
        console.log(e.target.value);
        const { name, value } = e.target;
        setINP((preval) => {
            return {
                ...preval,
                [name]: value
            }
        })
    }


    const { id } = useParams("");
    console.log(id);



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
            setINP(data[0])
            console.log("get data");

        }
    }

    useEffect(() => {
        getdata();
    }, []);


    const updateuser = async(e)=>{
        e.preventDefault();

        const {fname,lname,location,email,Dob,education,About} = inpval;

        const res2 = await fetch(`/updateuser/${id}`,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                fname,lname,location,email,Dob,education,About
            })
        });

        const data2 = await res2.json();
        console.log(data2);

        if(res2.status === 422 || !data2){
            alert("fill the data");
        }else{
            history.push("/")
            setUPdata(data2);
        }

    }

    return (
        <div className="container ">
            <a href="/" class="fa fa-arrow-left" aria-hidden="true"></a>
            <div className="mt-5">
            <div className="row">
                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="fname" class="form-label">Firstname</label>
                        <input type="text" value={inpval.fname} onChange={setdata} name="fname" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                
                    </div>

                    <div class="mb-3 col-lg-6 col-md-6 col-12">
                        <label for="lname" class="form-label">Lastname</label>
                        <input type="test" value={inpval.lname} onChange={setdata} name="lname" class="form-control" id="exampleInputPassword1" />
                
                    </div>
                    <div class="mb-1">
                        <label for="email" class="form-label">Email</label>
                        <input type="text" value={inpval.email} onChange={setdata} name="email" class="form-control" id="exampleInputPassword1" />
                  </div>
                  <div class="mb-1">
                        <label for="Dob" class="form-label">DOB</label>
                        <input type="text" value={inpval.Dob} onChange={setdata} name="Dob" class="form-control" id="exampleInputPassword1" />
                    </div>
                    <div class="mb-1 ">
                        <label for="education" class="form-label ">Education</label>
                        <input type="text" value={inpval.education} onChange={setdata} name="education" class="form-control " id="exampleInputPassword1" />
                    </div>
                    <div class="mb-1 ">
                        <label for="About" class="form-label">About</label>
                        <textarea cols="80" rows="5"  onChange={setdata} value={inpval.About}  name="About" class="form-control" id="exampleInputPassword1">  
</textarea>
                        
                    </div>
                    <br/>
                    </div>

                    <button type="submit" onClick={updateuser} class="btn btn-dark mt-5">Submit</button>
                
            </div>
        </div>
    )
}

export default Edit;




