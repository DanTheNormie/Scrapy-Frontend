import { TableRow, TableCell, } from "@mui/material"
import { TextField, Button } from "@mui/material"
import SegmentedButton from "./SegmentedButton"
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCallback, useMemo, useState } from "react";
import { Reorder, useDragControls } from "framer-motion";
import { ReorderIcon } from "./ReorderIcon";
import './selector.scss'
export const Selector = ({ index, selectorInfo, updateSelectors }) => {

    const onNameChange = useCallback((event) => {
        updateSelectors((prev) => {
            return prev.map((e) => {
                if (e.uid === selectorInfo.uid) return { ...e, name: event.target.value }
                else return e
            })
        })
    }, [updateSelectors])

    const onSelectorStringChange = useCallback((event) => {
        updateSelectors((prev) => {
            return prev.map((e) => {
                if (e.uid === selectorInfo.uid) return { ...e, selector: event.target.value }
                else return e
            })
        })
    }, [updateSelectors])

    const onTargetChange = useCallback((event) => {
        updateSelectors((prev) => {
            return prev.map((e) => {
                if (e.uid === selectorInfo.uid) return { ...e, target: event.target.value }
                else return e
            })
        })
    }, [updateSelectors])

    const onFormatChange = useCallback((format) => {
        updateSelectors((prev) => {
            return prev.map((e) => {
                if (e.uid === selectorInfo.uid) return { ...e, format: format }
                else return e
            })

        })
    }, [updateSelectors])

    const deleteSelector = useCallback(() => {

        updateSelectors((prev) => {
            return prev.filter((e) => { if (e.uid !== selectorInfo.uid) return e })
        });
    }, [updateSelectors])

    const textFieldStyle = useMemo(() => {
        return {
            "& fieldset": { border: 'none' },
            "& .MuiInputBase-input": { 
                overflow: "hidden",
                textOverflow: "ellipsis",
                p: 0,
                pl: 1,
            },
        }
    }, [])

    const [showOptions, setShowOptions] = useState(false)
    const dragControls = useDragControls();
    return <Reorder.Item 
    as="tr" 
    onHoverStart={()=>{setShowOptions(true)}}
    onHoverEnd={()=>{setShowOptions(false)}}
    className="table-row"
    value={selectorInfo} 
    id={selectorInfo.uid} 
    dragListener={false} 
    dragControls={dragControls} >
        <TableCell align="center" sx={{border:1}}>{index + 1}</TableCell>
        <TableCell align="center" sx={{border:1}}>
            <TextField fullWidth variant="outlined" sx={textFieldStyle} onChange={onNameChange} value={selectorInfo.name} />
        </TableCell>
        <TableCell align="center" sx={{border:1}}>
            <TextField fullWidth variant="outlined" sx={textFieldStyle} onChange={onSelectorStringChange} value={selectorInfo.selector} />
        </TableCell>
        <TableCell align="center" sx={{border:1}}>
            <TextField fullWidth variant="outlined" sx={textFieldStyle} onChange={onTargetChange} value={selectorInfo.target} />
        </TableCell>
        <TableCell  align="center" sx={{border:1}} >
            <SegmentedButton value={selectorInfo.format} values={['single', 'multiple']} onChange={onFormatChange} />
            <div 
            style={{
                position: "absolute",
                right: -36,
                top: 0,
                visibility:showOptions?"visible":"hidden"
            }}>
                <IconButton aria-label="delete" onClick={deleteSelector}>
                    <DeleteIcon color="error" />
                </IconButton>
            </div>
        </TableCell>
        <div 
        style={{
            position: "absolute",
            left: -26,
            top: 8, 
            cursor:'grab',
            height:"100%",
            width:30,
            visibility:showOptions?"visible":"hidden"
        }}>
            <ReorderIcon dragControls={dragControls}/>
        </div>
    </Reorder.Item>

}