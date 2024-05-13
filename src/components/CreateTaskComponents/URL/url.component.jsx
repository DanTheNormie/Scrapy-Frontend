import { useState, useContext, useEffect } from 'react';
import { EditorStateContext } from './editorStateContext';
import { ContentState, Editor, EditorState, Modifier } from 'draft-js';
import { InputLabel, FormControl } from '@mui/material';
import 'draft-js/dist/Draft.css';
import './url-section.scss';
import { Box } from '@mui/material';

export default function URLTextField() {

    const { urlState, setURLState } = useContext(EditorStateContext);
    const [focused, setFocused] = useState(false)
    const [shrink, setShrink] = useState(false)
    const [classNames, setClassName] = useState('floating-label')

    const handlePaste = (text, html, editorState) => {


        setURLState((prevState) => {
            return EditorState.push(prevState, Modifier.replaceText(prevState.getCurrentContent(), prevState.getSelection(), text.replace(/\n/g, ' ')))
        })

        return 'handled'
    }

    const onFocus = (e) => {
        setFocused(true)
        setShrink(true)
        setClassName('floating-label active-fl focused-fl')
    }

    useEffect(() => {
        onBlur()
    }, [urlState.getCurrentContent().hasText()])

    const onBlur = () => {
        setFocused(false)
        if (urlState.getCurrentContent().hasText()) {
            setClassName('floating-label active-fl')
        } else {
            setShrink(false)
            setClassName('floating-label')
        }
    }

    return (
        <FormControl
            sx={{
                position: 'relative',
                border: '1px solid',
                borderRadius: 2,
                width: '100%',
                p: '16.5px 14px',
                borderColor:(theme)=>((focused)?theme.palette.primary.main:theme.palette.text.primary)
            }}
            onFocus={onFocus}
            onBlur={onBlur} >
            <InputLabel
                shrink={shrink}
                sx={{
                    px:2,
                    backgroundColor: (theme) => ((theme.palette.mode == 'dark' ? '#121212' : '#fff')),
                    backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))'/*linear-gradient(rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.09))  */
                }} focused={focused} variant='outlined'>URL</InputLabel>
            <Editor
                editorState={urlState}
                handlePastedText={handlePaste}
                onChange={setURLState}
                handleReturn={() => 'handled'}
            />
        </FormControl>
    );
}