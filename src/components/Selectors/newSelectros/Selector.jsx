import { TableRow, TableCell, } from "@mui/material"
import { TextField, Button } from "@mui/material"
import SegmentedButton from "./SegmentedButton"
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCallback, useMemo } from "react";
import { Height, Margin, Padding } from "@mui/icons-material";
import { Reorder, useDragControls } from "framer-motion";
import { ReorderIcon } from "./ReorderIcon";
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
    const px = '1px'
    const tableCellStyle = useMemo(() => {
        return {
            p: "0",
            height: "fit-content",
            borderRightWidth: `1px`,
            borderLeftWidth: `1px`,
            borderTopWidth: `1px`,
            borderBottomWidth: `1px`,
            borderStyle: "solid",
            borderColor: "#0002",
        }
    }, [])

    const textFieldStyle = useMemo(() => {
        return {
            height:"100%",
            "& fieldset": { border: 'none' },

            "& .MuiInputBase-input": {
                borderColor: "#0000",
                overflow: "hidden",
                textOverflow: "ellipsis",
                padding: 0,
                pl: 1,
            },
            '&:focus-within':{

            }
        }
    }, [])

    const delBtnStyle = useMemo(() => {
        return {

        }
    }, [])

    const dragControls = useDragControls();
    return <Reorder.Item 
    as="tr" 
    value={selectorInfo} 
    id={selectorInfo.uid} 
    dragListener={false} 
    dragControls={dragControls} 
    style={{
        position: 'relative',
        marginTop:'20px',
        '&:focus-within':{
            bgcolor:"#fff5"
        }
        }}>
        <TableCell align="center" sx={{ ...tableCellStyle, borderLeftWidth: 1 }}>{index + 1}</TableCell>
        <TableCell align="center" sx={tableCellStyle}>
            <TextField fullWidth variant="outlined" sx={textFieldStyle} onChange={onNameChange} value={selectorInfo.name} />
        </TableCell>
        <TableCell align="center" sx={tableCellStyle}>
            <TextField fullWidth variant="outlined" sx={textFieldStyle} onChange={onSelectorStringChange} value={selectorInfo.selector} />
        </TableCell>
        <TableCell align="center" sx={tableCellStyle}>
            <TextField fullWidth variant="outlined" sx={textFieldStyle} onChange={onTargetChange} value={selectorInfo.target} />
        </TableCell>
        <TableCell align="center" sx={{...tableCellStyle, bgcolor:"#fff"}}>
            <SegmentedButton value={selectorInfo.format} values={['single', 'array']} onChange={onFormatChange} />
        </TableCell>
        <div style={{
            position: "absolute",
            right: -36,
            top: 10,
        }}>
            <IconButton aria-label="delete" onClick={deleteSelector}>
                <DeleteIcon color="error" />
            </IconButton>
        </div>
        <div 
        style={{position: "absolute",left: -26,top: 12, cursor:'grab'}}>
            <ReorderIcon dragControls={dragControls}/>
        </div>
    </Reorder.Item>

}