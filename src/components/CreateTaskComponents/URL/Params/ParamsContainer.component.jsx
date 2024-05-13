import { v4 as uuid } from "uuid";
import ParamComponent from "./Param.component";
import './params.scss'
import { hexToRgb } from "@mui/material";
import { useEffect } from "react";

export default function Params({urlState, params, setParams}) {

    const getParams = (urlState) => {
        const url = urlState.getCurrentContent().getPlainText()
        const CURLY_REGEX = /\{\{([^{}]+)\}\}/g;
        let noice = url.match(CURLY_REGEX)
        if(noice===null) noice = []
        /* set uid to all params */

        noice = noice.map((val)=>{
            const item = {
                name:val.slice(2, val.length - 2),
                uid:uuid(),
                value:""
            }
            return item
        })

        setParams(noice)
    }

    useEffect(()=>{
        getParams(urlState)
    },[urlState])

    return (
        <div className="params-container">

            {(params.length < 1) && <div className="helper-msg">
                <p>No Parameters in the url...☹️</p>
                <br />
                <p>{`Try adding words in between double curly braces, like this -> `}<span style={{ color: hexToRgb('#00f') }}>{`{{ word }}`}</span> {`to make the url more dynamic`}</p>

            </div>}

            {params.map((item) => {
                return <ParamComponent key={item.uid} uid={item.uid} value={item.value} name={item.name} params={params} setParams={setParams}/>
            })}

        </div>)

}