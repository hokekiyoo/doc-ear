/// <reference types="chrome"/>
import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import TextField from '@mui/material/TextField';
import Fab from '@mui/material/Fab';
import CheckIcon from '@mui/icons-material/Check';
import Grid from '@mui/material/Grid';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

type AlertType = 'error' | 'info' | 'success' | 'warning'
const Option = () => {
    const [iid, setIid] = useState("");
    const [isOpen, setIsOpen] = useState(false)
    const [type, setType] = useState<AlertType>("success")
    const [message, setMessage] = useState("Default Message")

    const iid2botId = (iid: string):string => {
        return `${iid.slice(0, 8)}-${iid.slice(8, 12)}-${iid.slice(12,16)}-${iid.slice(16, 20)}-${iid.slice(20, iid.length)}`;
    }

    const saveIntegrationId = async(iid: string) => {
        if (!iid.trim().length || iid.length != 32) {
          console.log("invalid!");
          setType("error")
          setMessage("Invalid token")
          setIsOpen(true)
          return;
        }
        const botId = iid2botId(iid);
        await chrome.storage.local.set({botId: botId,});
        chrome.storage.local.get("botId", (d) => {
          setIid(botId);
        });
        setType("success")
        setMessage("successfully registered")
        setIsOpen(true)
        
    }

    const dispSnackbar = (mes:string, type:'error' | 'info' | 'success' | 'warning') =>{
        return <Snackbar 
        open={isOpen} 
        autoHideDuration={5000} 
        onClose={()=>{setIsOpen(false)}}
        >
        <Alert 
            severity={type} sx={{ width: '100%' }}
            onClose={()=>{setIsOpen(false)}}
        >
        {mes}
        </Alert>
        </Snackbar>
    }


    return <Grid container gap={2}>
        <Grid item xs={12}>
            <h2>Doc Ear</h2>
        </Grid>
        <Grid item xs={9}>
            <TextField onChange={(e) => {setIid(e.target.value);}} value={iid} fullWidth/>
        </Grid>
        <Grid item xs={1}>
            <Fab color="primary" aria-label="Check" 
                onClick={() => { 
                    saveIntegrationId(iid);
                }}>
                <CheckIcon/>
            </Fab>  
        </Grid>
        <p></p>
        {dispSnackbar(message, type)}
    </Grid>
    
}  


ReactDOM.render(<Option />, document.getElementById('option'));