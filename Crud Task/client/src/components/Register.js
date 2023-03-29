import React, { useContext, useState, form } from 'react'
import { useHistory } from 'react-router-dom'
import { adddata } from './context/ContextProvider';

const Register = () => {

    const { udata, setUdata } = useContext(adddata);

    const history = useHistory();

    const [inpval, setINP] = useState({
        fname: "",
        lname: "",
        location: "",
        email: "",
        Dob: "",
        education: "",
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


    const addinpdata = async (e) => {
        e.preventDefault();

        const { fname, lname, location, email, Dob, education,About } = inpval;


        if (fname == "") {
            alert("fname is required")
        } else if (lname == "") {
            alert("lname is required")
        }
        else if (location == "") {
            alert("location is required")
        }
        else if (email == "") {
            alert("email is required")
        }
        else if (!email.includes("@")) {
            alert("enter valid email")
        }
        else if (Dob == "") {
            alert("Dob is required")
        }
        else if (education == "") {
            alert("education is required")
        }
        else if (About == ""){
             alert("About is required")
        } else {
            const res = await fetch("/create", {
                method: "POST",
                headers:{
                "content-type": "application/json",},
                body: JSON.stringify({
                    fname, lname, location, email, Dob, education,About
                })
            });

            const data = await res.json();
            console.log(data);

            if (res.status === 422 || !data) {
                console.log("error ");
                alert("error");

            } else {
                history.push("/")
                setUdata(data)
                console.log("data added");

            }
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
                        <label for="location" class="form-label w-6">Location</label>
                        <input type="text" value={inpval.location} onChange={setdata} name="location" class="form-control" id="exampleInputPassword1" />
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
                
                
                <button type="submit" onClick={addinpdata} class="btn btn-dark mt-5">Submit</button>
            
            </div>
       </div>




       
    )
}
export default Register;
