import { TextField } from "@mui/material"
import SortableSelectorList from "./SortableSelectorList.component"
import SegmentedButton from "../Selectors/SegmentedButton.component"
import { useEffect, useState } from "react";

export const ResultOptions = ({selectorsList, selectorsOrder,setSelectorsOrder, resultOptions, setResultOptions, })=>{


    const [parentElementSelector, setParentElementSelector] = useState('');
    const [resultFormat, setResultFormat] = useState(resultOptions.format)

    useEffect(()=>{
        setResultOptions((prev)=>{
            console.log({...prev,parentElementSelector:parentElementSelector});
            return{...prev,parentElementSelector:parentElementSelector}
        })
    },[parentElementSelector])

    useEffect(()=>{
        setResultOptions((prev)=>{
            return{...prev, format:resultFormat}
        })
    },[resultFormat])

    const onParentSelectorChange = (evt)=>{
        setParentElementSelector(evt.target.value)
    }

    const onFormatChange = (format)=>{
        console.log(format);
        setResultFormat(format)
    }

    return(
        <div className="result-options-container">
            <SortableSelectorList selectorsList={selectorsList} selectorsOrder={selectorsOrder} setSelectorsOrder={setSelectorsOrder}/>
            
            <TextField required label="ParentElementSelector" value={parentElementSelector} onChange={onParentSelectorChange} variant="outlined" />
            
            <SegmentedButton value={resultFormat} onChange={onFormatChange} values={['Separate','Together']}/>
        </div>
    )
}