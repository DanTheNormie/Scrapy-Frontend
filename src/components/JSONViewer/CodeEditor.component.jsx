import React, { useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import { Button, Divider } from '@mui/material';
import HistoryIcon from '@mui/icons-material/History';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { useState } from 'react';

const CodeEditor = ({heading, data, editorRef, readOnly}) => {

    const stringify =(task)=>{
        return JSON.stringify(task, null, '\t')
    }

    const [editorValue, setEditorValue] = useState(stringify(data.task))
    

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
      <div className='bg-[#1e1e1e] p-4 rounded-lg m-4'>
        <Divider>{heading}</Divider>
        
        <Editor 
            theme='vs-light'
            height={'50vh'}
            defaultLanguage='json'
            value={editorValue}
            onMount={handleEditorDidMount}
            className='m-4 !rounded-xl'
            options={options}
        />
        <div className=''>
            <Divider textAlign='right'>
                <div style={{display:'flex', width:"100%"}}>
                    <Button startIcon={<AutoAwesomeIcon/>} variant='outlined' color='secondary' onClick={onFormatClick} style={{marginRight:"16px"}}>Format</Button>
                    <Divider orientation='vertical' flexItem variant='middle'/>
                    <Button startIcon={<HistoryIcon/>} variant='outlined' color='success' style={{marginLeft:"16px"}} onClick={onResetClick}>Reset</Button>
                </div> 
            </Divider>
        </div>
      </div>
      
    );
  };
  
  export default CodeEditor;