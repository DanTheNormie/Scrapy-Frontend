import React, { useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { Box, Button, Divider, useTheme } from '@mui/material';
import HistoryIcon from '@mui/icons-material/History';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { useState } from 'react';

const CodeEditor = ({heading, data, editorRef, readOnly}) => {

    const stringify =(task)=>{
        return JSON.stringify(task, null, '\t')
    }

    const theme = useTheme()

    const [editorValue, setEditorValue] = useState(stringify(data))
    

    function handleEditorDidMount(editor, monaco){
        editorRef.current = editor
    }
    const options = {
        readOnly: readOnly,
        minimap:  {enabled : false} 
    };

    useEffect(()=>{
        setEditorValue(stringify(data.task))
    },[data])

    

    const onFormatClick = async ()=>{
        editorRef.current.getAction('editor.action.formatDocument').run();
    }

    const onResetClick = ()=>{
        editorRef.current.setValue(stringify(data))
    }

    return (
      <div>
        <Divider sx={{my:2}}>{heading}</Divider>
        
        <Editor 
            theme={(theme.palette.mode=='dark')?'vs-dark':'vs-light'}
            height={'50vh'}
            defaultLanguage='json'
            value={editorValue}
            onMount={handleEditorDidMount}
            className='m-4 !rounded-xl'
            options={options}
        />
        <Box sx={{mt:2}} >
            <Divider textAlign='right'>
                <div style={{display:'flex', width:"100%"}}>
                    <Button startIcon={<AutoAwesomeIcon/>} variant='outlined' color='secondary' onClick={onFormatClick} style={{marginRight:"16px"}}>Format</Button>
                    <Divider orientation='vertical' flexItem variant='middle'/>
                    <Button startIcon={<HistoryIcon/>} variant='outlined' color='success' style={{marginLeft:"16px"}} onClick={onResetClick}>Reset</Button>
                </div> 
            </Divider>
        </Box>
      </div>
      
    );
  };
  
  export default CodeEditor;