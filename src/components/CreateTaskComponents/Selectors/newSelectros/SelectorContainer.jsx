import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Typography } from "@mui/material"
import { TextField, Button, Paper } from "@mui/material"
import { memo, useMemo, useState, useRef } from "react"
import { v4 as uuid } from "uuid"
import _ from 'lodash'
import './selector.scss'
import { Selector } from "./Selector"
import { Reorder } from "framer-motion"

export const SelectorContainer = ({ selectorsList, setSelectorsList }) => {

    const columnRefs = [useRef(), useRef(), useRef(), useRef()]
    const resizing = useRef(-1)

    const TableHeadCellStyle = useMemo(() => {
        return {

            px: "4px",
            border:'1px solid',
        }
    }, [])

    const addNewSelector = () => {
        setSelectorsList((prev) => {
            return [...prev, {
                name: "",
                selector: "",
                target: '',
                format: 'multiple',
                uid: uuid(),
                active: false
            }]
        })
    }

    const onDragStart = (e, index) => {
        e.preventDefault();
        console.log("start resize");
        resizing.current = index;
    }

    const adjustWidthColumn = (index, width) => {
        const minWidth = 70;
        const maxWidth = 400;

        const newWidth = width > maxWidth ? maxWidth : width < minWidth ? minWidth : width

        columnRefs[index].current.parentElement.style.width = newWidth + 'px'
    }

    const onDrag = (e) => {
        console.log('moving...')
        if (resizing.current >= 0) {
            /* diff between col-start to mouseX == newWidth */
            const newWidth = e.clientX - columnRefs[resizing.current].current.parentElement?.getBoundingClientRect().left;
            console.log(e.clientX, '-', columnRefs[resizing.current].current.parentElement?.getBoundingClientRect().left, '=', newWidth);
            console.log();
            adjustWidthColumn(resizing.current, newWidth);
        }
    }

    const onDragStop = () => {
        console.log("end resize");
        resizing.current = -1;
    };

    return (

        <TableContainer sx={{ overflowX: 'visible' }} >
            <Table stickyHeader size="small" sx={{ maxWidth: '100%' }}>
                <TableHead>
                    <TableRow
                    /* onMouseMove = {(e)=>onDrag(e)}
                    onMouseUp = {()=>onDragStop()} */
                    >
                        <TableCell className="first-cell" sx={TableHeadCellStyle} align="center">
                            S.no.
                            <div className="resize-line" ref={columnRefs[0]} onMouseDown={(e) => { onDragStart(e, 0) }} />
                        </TableCell>
                        <TableCell sx={TableHeadCellStyle} align="center">
                            Name
                            <div className="resize-line" ref={columnRefs[1]} onMouseDown={(e) => { onDragStart(e, 1) }} />
                        </TableCell>
                        <TableCell sx={TableHeadCellStyle} align="center">
                            Selector String
                            <div className="resize-line" ref={columnRefs[2]} onMouseDown={(e) => { onDragStart(e, 2) }} />
                        </TableCell>
                        <TableCell sx={TableHeadCellStyle} align="center">
                            Target
                            <div className="resize-line" ref={columnRefs[3]} onMouseDown={(e) => { onDragStart(e, 3) }} />
                        </TableCell>
                        <TableCell sx={TableHeadCellStyle} align="center">
                            Format
                        </TableCell>
                        {/* <TableCell className="empty-cell"/> */}
                        {/* <TableCell sx={cellStyle} align="center">Options</TableCell> */}
                    </TableRow>
                </TableHead>

                <Reorder.Group as="tbody" axis="y" values={selectorsList} onReorder={setSelectorsList}>

                    {(selectorsList.length < 1) &&

                        <Reorder.Item as="tr">
                            <TableCell colSpan={6} align="center">

                                <Typography sx={{opacity:0.5}} >
                                    No Selectors... ☹️,
                                    Add Selectors to Scrape Data.
                                </Typography>

                            </TableCell>
                        </Reorder.Item>

                    }

                    {selectorsList.map((item, i) =>{
                        console.log(item);
                        return (<Selector key={item.uid} index={i} selectorInfo={item} updateSelectors={setSelectorsList} />)
                        /*  <MemoizedSelectorRow key={item.uid} index={i} selectorInfo={item} updateSelectors={setSelectorsList} /> */
                    })}
                    <Reorder.Item as="tr">
                        <TableCell sx={{ border: 0 }} colSpan={6} align="center">
                            <Button onClick={addNewSelector} variant="outlined">Add New Selector</Button>
                        </TableCell>
                    </Reorder.Item>
                </Reorder.Group>

            </Table>
        </TableContainer>

    )
}