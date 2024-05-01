import { Reorder } from "framer-motion"
import { useEffect, useState } from "react"
import { SortableSelectorListItem } from "./SortableListItem.component"
import './sortablelist.scss'

export default function SortableSelectorList({selectorsList,  selectorsOrder, setSelectorsOrder}) {

    useEffect(()=>{
        setSelectorsOrder(selectorsList.map((item)=>{return {name:item.name,uid:item.uid}}))
    },[selectorsList])

  const onR = (v)=>{
    /* setSelectorsList(v); */
  }

  return (
    <Reorder.Group axis="y" className="sortable-list-container" values={selectorsOrder} onReorder={setSelectorsOrder}>
      
      {(selectorsOrder.length < 1) && (<span className="helper-msg">Add some selectors to sort them.</span>)}
      
      {selectorsOrder.map((item) => {
        console.log(item.name);
        return(
        
            <SortableSelectorListItem key={item.uid} selector={item} />
        
      )})}
    </Reorder.Group>
  )
}