import TextField from '@mui/material/TextField';
import { useEffect } from 'react';

const Param = ({ name, uid, value, params, setParams }) => {

    const onChange = (event)=>{
        const newParams = params.map((item)=>{if(item.uid == uid){return {...item,value:event.target.value}}else return e})
        setParams(newParams)
    }

    const onDummyData = ()=>{
        if(params.length>0 && params[0].name == 'ASIN_NUMBER'){
            const newParams = params.map((item)=>{if(item.uid == uid){return {...item,value:'B0CS5Y7H6T'}}else return e})
            setParams(newParams)
        }
    }

    useEffect(()=>{
        onDummyData()
    },[])

    return (
        <div className='param'>
            <TextField InputProps={{ readOnly: true }} id="outlined-basic" label="Name" value={name} variant="outlined" />
            <TextField 
            id="outlined-basic" 
            label="Value" 
            value={value}
            onChange={onChange}
            required 
            variant="outlined"
            helperText={'This value will replace the {{ param }}'}
            />
        </div>
    )
}

export default Param