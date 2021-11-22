/// <reference types="chrome"/>
import React, {useState, useEffect, useCallback} from 'react';
import ReactDOM from 'react-dom';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import NotionClient from "./notion";
import Typography from '@mui/material/Typography';

type AlertType = 'error' | 'info' | 'success' | 'warning'
const App = () => {

    const [highlight, setHighlight] = useState("");
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
                setDBid(res[0].id)
            })
        });
        chrome.tabs.executeScript(
            {
            code: "window.getSelection().toString();",
            },
            function (selection) {
                setHighlight(selection[0]);
            }
        );
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
    
    return <Box sx={{width: 300}}>
        <Typography variant="h6">
            doc-ear
        </Typography>
        <TextField
            label="Title" value={title}
            contentEditable="true" 
            fullWidth
            margin="normal"
            onChange={e => {setTitle(e.target.value);}} 
            />            
        <TextField 
            id="outlined-multiline-flexible" 
            label="Highlight" 
            fullWidth
            margin="normal"
            multiline maxRows={30} 
            value={highlight}
            onChange={e => {setHighlight(e.target.value);}} 
            />
        <p></p>
        <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Database</InputLabel>
        <Select 
            fullWidth
            displayEmpty
            value={dbid}
            label="database"
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
        </FormControl>
        <p></p>
        
        <div style={{textAlign:'center'}}>
        <Button variant="contained" color="primary"
                fullWidth
                onClick={async()=>{
                    const _data = {
                        title: title,
                        highlight: highlight,
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
                    console.log(data);}}
        >
            <BookmarkBorderIcon/>Bookmark
        </Button>
        </div>
        <p>
        {dispSnackbar(message, type)}
        </p>
    </Box>;
}  


ReactDOM.render(<App />, document.getElementById('root'));