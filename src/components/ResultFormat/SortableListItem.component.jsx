import { useRaisedShadow } from "./use-raised-shadow"
import { Reorder, useMotionValue } from "framer-motion"

const ReorderIcon=()=>{
   return <svg width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M8 2.5A1.5 1.5 0 1 0 9.5 4 1.5 1.5 0 0 0 8 2.5zm8 0A1.5 1.5 0 1 0 17.5 4 1.5 1.5 0 0 0 16 2.5zm-8 8A1.5 1.5 0 1 0 9.5 12 1.5 1.5 0 0 0 8 10.5zm8 0a1.5 1.5 0 1 0 1.5 1.5 1.5 1.5 0 0 0-1.5-1.5zm-8 8A1.5 1.5 0 1 0 9.5 20 1.5 1.5 0 0 0 8 18.5zm8 0a1.5 1.5 0 1 0 1.5 1.5 1.5 1.5 0 0 0-1.5-1.5z"/><path fill="none" d="M0 0h24v24H0z"/></svg>
}

export const SortableSelectorListItem = ({selector})=>{
    const y = useMotionValue(0);
    const boxShadow = useRaisedShadow(y);
    return(
    <Reorder.Item 
        value={selector}
        id={selector.uid}
        style={{boxShadow,y}}
        className="sortable-selector-list-item">
        <ReorderIcon/>
        <span>{selector.name}</span>
        
    </Reorder.Item>)
}