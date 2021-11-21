/// <reference types="chrome"/>
import React, {useState, useEffect, useCallback} from 'react';
import ReactDOM from 'react-dom';
import RefreshIcon from '@mui/icons-material/Refresh';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import styled from "styled-components"
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import MenuItem from '@mui/material/MenuItem';
import NotionClient from "./notion";
type AlertType = 'error' | 'info' | 'success' | 'warning'
const App = () => {
    const [abstract, setAbstract] = useState("");
    const [title, setTitle] = useState("");
    const [URL, setURL] = useState("");
    const [databases, setDatabases] = useState([])
    const [dbid, setDBid] = useState("")
    let _client = new NotionClient()
    const [client, setClient] = useState(_client)
    const [isOpen, setIsOpen] = useState(false)
    const [type, setType] = useState<AlertType>("success")
    const [message, setMessage] = useState("Default Message")
    

    useEffect(() => {
        // Runs after the first render() lifecycle
        chrome.tabs.query({active: true, currentWindow: true}, (tabs)=>{
            setURL(tabs[0].url);
            setTitle(tabs[0].title);
        });
        // DBのデータを取得
        chrome.storage.local.get("botId", async (d) => {
            if (!client.token) {
                const botId = d.botId;
                // console.log("botid",botId);
                const data = await client.requestToken(botId);
                if (data.name == "UnauthorizedError") {
                    console.log("Unauthorized Error")
                } else {
                    console.log("Authorized", data);
                    client.token = data.token;
                    setClient(client);
                }
            }
            client.retrieveDatabase().then(res =>{
                res.forEach((e:any) => console.log("DB",e.title[0].text.content))
                setDatabases(res)
            })
        });
    }, []);
    
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
    
    return <Grid container justifyContent = "center">
        <Box sx={{width: 300}}>
        <h2>Doc Ear</h2>
        <TextField
            label="Title" value={title}
            contentEditable="true" 
            fullWidth
            margin="normal"
            onChange={e => {setTitle(e.target.value);}} 
            />            
        <TextField 
            label="URL" 
            fullWidth 
            margin="normal"
            value={URL} 
            onChange={e => {setURL(e.target.value);}} 
            />
        <TextField 
            id="outlined-multiline-flexible" 
            label="Abstract" 
            fullWidth
            margin="normal"
            multiline maxRows={30} 
            value={abstract}
            onChange={e => {setAbstract(e.target.value);}} 
            />
        <p>DB</p>
        <Select fullWidth
            onChange={(e: any) => {
                setDBid(e.target.value);
                console.log(e.target.value);
            }}
        >
            {databases.map((e) => (
            <MenuItem value={e.id}>
                {e.title[0].text.content}
            </MenuItem>
            ))}
        </Select>
        <p></p>
        <div style={{textAlign:'center'}}>
            <Fab color="primary" aria-label="Refresh" style={{margin:"0.25em"}}
                onClick={()=>{
                    chrome.tabs.executeScript(
                        {
                        code: "window.getSelection().toString();",
                        },
                        function (selection) {
                            setAbstract(selection[0]);
                        }
                    );
                }
            }>
            <RefreshIcon/>
            </Fab>
            <Fab color="primary" aria-label="Bookmark" style={{margin:"0.25em"}}
                onClick={async()=>{
                    const _data = {
                        title: title,
                        abst: abstract,
                        url: URL,
                    };
                    const data = await client.createPage(_data, dbid).then((res)=>{
                        if (res.object==="error"){
                            setIsOpen(true);
                            setMessage("Something wrong.")
                            setType("error")
                        }else{
                            setIsOpen(true);
                            setMessage("notion page is successfully created!")
                            setType("success")
                        }
                    } 
                    );
                    console.log(data)
                }}
            >
            <BookmarkBorderIcon/>
            </Fab>  
            </div>
        <p>
        {dispSnackbar(message, type)}
        </p>
    </Box>
    </Grid>;
}  


ReactDOM.render(<App />, document.getElementById('root'));