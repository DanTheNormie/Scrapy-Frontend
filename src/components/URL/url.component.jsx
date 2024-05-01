import { useState, useContext, useEffect } from 'react';
import { EditorStateContext } from './editorStateContext';
import {ContentState, Editor, EditorState, Modifier} from 'draft-js';
import 'draft-js/dist/Draft.css';
import './url-section.scss';

export default function URLTextField() {

    const { urlState, setURLState } = useContext(EditorStateContext);

    const [classNames, setClassName] = useState('floating-label')

    const handlePaste = (text,html,editorState)=>{
       

        setURLState((prevState)=>{
            return EditorState.push(prevState,Modifier.replaceText(prevState.getCurrentContent(),prevState.getSelection(),text.replace(/\n/g,' ')))
        })
        
        return 'handled'
    }

    const onFocus = (e) => {
        setClassName('floating-label active-fl focused-fl')
    }

    useEffect(()=>{
        onBlur()
    },[urlState])

    const onBlur = () => {
        if (urlState.getCurrentContent().hasText()) {
            setClassName('floating-label active-fl')
        } else {
            setClassName('floating-label')
        }
    }

    return (
        <div className='text-input-container' onFocus={onFocus} onBlur={onBlur}>
            <div className={classNames}> URL </div>
            <Editor 
            editorState={urlState} 
            handlePastedText={handlePaste} 
            onChange={setURLState}
            handleReturn={() => 'handled'} 
            
            />
        </div>
    );
}