import { useEffect, useState } from "react";
import './selectors.scss'
import Selector from "./Selector.component";
import { v4 as uuid } from 'uuid'
import { Button } from "@mui/material";

const SelectorContainer = ({selectorsList, setSelectorsList}) => {

    const addSelector = () => {
        setSelectorsList([...selectorsList, {
            name: "",
            selector: "",
            target: '',
            format: 'array',
            uid: uuid(),
            active:false
        }])
    }

    return (
        <div className="selectors-container">

            {(selectorsList.length < 1) &&
                <div className="helper-msg">
                    No Selectors... ☹️, 
                    Add Selectors to Scrape Data.
                </div>
            }

            {selectorsList.map((e) => {
                return <Selector key={e.uid} selectorInfo={e} updateSelectors={setSelectorsList} />
            })}


            <div className="add-btn-container">
                <Button onClick={addSelector} color="success" variant="contained">Add Selector</Button>
            </div>
        </div>)
}

export default SelectorContainer;