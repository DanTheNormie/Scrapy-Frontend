import { TextField } from "@mui/material"
import SegmentedButton from "./SegmentedButton.component"
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';


const Selector = ({selectorInfo, updateSelectors}) => {


    const deleteSelector=()=>{
        
        updateSelectors((prev)=>{
            return prev.filter((e)=> {if(e.uid!==selectorInfo.uid)return e})
        });
    }

    const onNameChange = (event)=>{
        updateSelectors((prev)=>{
            return prev.map((e)=>{
                if(e.uid===selectorInfo.uid) return {...e,name:event.target.value}
                else return e
            })
        })
    }

    const onSelectorStringChange = (event)=>{
        updateSelectors((prev)=>{
            return prev.map((e)=>{
                if(e.uid===selectorInfo.uid) return {...e,selector:event.target.value} 
                else return e
            })
        })
    }

    const onTargetChange = (event)=>{
        updateSelectors((prev)=>{
            return prev.map((e)=>{
                if(e.uid===selectorInfo.uid) return {...e,target:event.target.value}
                else return e
            })
        })
    }

    const onFormatChange = (format)=>{
        updateSelectors((prev)=>{
            return prev.map((e)=>{
                if(e.uid===selectorInfo.uid) return {...e,format:format}
                else return e
            })
        
        })
    }
    
    return (
        <div className="selector">
            <TextField id="outlined-basic" required label="Name" onChange={onNameChange} value={selectorInfo.name} variant="outlined" />
            <TextField
                id="outlined-basic"
                label="Selector String"
                required
                value={selectorInfo.selector}
                onChange={onSelectorStringChange}
                variant="outlined"
                helperText={'CSS selector used to target an element'}
            />
            <TextField
                id="outlined-basic"
                label="Target"
                required
                value={selectorInfo.target}
                onChange={onTargetChange}
                variant="outlined"
                helperText={`Can contain 2 possible values [ innerText | <attr-name> ]`}
            />
            <SegmentedButton value={selectorInfo.format} values={['single','multiple']} onChange={onFormatChange}/>

            <div className="delete-selector-btn">
                <IconButton aria-label="delete" onClick={deleteSelector}>
                    <DeleteIcon color="error"/>
                </IconButton>
            </div>
        </div>
    )
}

export default Selector