import React,{forwardRef} from 'react'
import {Box, Dialog,DialogContent,Fade} from '@mui/material'
import { Grid } from 'semantic-ui-react';



const Transition=forwardRef(function Transition(props,ref){
    return <Fade ref={ref}{...props}></Fade>
})
const deleteuser = async (id) => { 

    const res2 = await fetch(`/deleteuser/${id}`, {
        method: "DELETE",

    });

    const deletedata = await res2.json();
    

    if (res2.status === 422 || !deletedata) {
        console.log("error");
    } else {
        console.log("user deleted");
        setDeletedata(deletedata)
        getdata();
    }

}


function ConfirmBox({open,deleteuser}){
    return(
    <Dialog
    fullWidth
    open={open}
    maxWidth="sm" 
    >
        <DialogContent sx={{px:0,py:0,position:"relative"}}>
       
        
            <Grid >
                <Box sx={{textAlign:"center",flexDirection:"row",backgroundColor:'gray'}}>
                
                <svg width="50%" height="50%" class="bi bi-trash" viewBox="0 0 15 15" backgroundColor='gray' >
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
  <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
</svg>
<br></br>
<h3> Are you want to delete this ?</h3>
<br></br>
                    
</Box>
              
              <Grid style={{backgroundColor:'gray'}}> 
            

                            <a href={`/`}>  <button className="btn btn-light" style={{backgroundColor:'silver',width:299,marginRight:1,marginLeft:0,textAlign:'center'}}>CANCEL</button></a>

                            <button class="btn btn-light" style={{backgroundColor:'silver', width:300,marginLeft:0,textAlign:'center'}} onClick={() => deleteuser(element.id)} >DELETE</button>
                       
                          </Grid>
                           
            </Grid>
           

    

</DialogContent>
    </Dialog>
)
}
export default ConfirmBox