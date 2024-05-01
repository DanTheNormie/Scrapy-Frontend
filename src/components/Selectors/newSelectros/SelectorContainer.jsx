import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material"
import { TextField, Button } from "@mui/material"
import { memo, useMemo, useState } from "react"
import { v4 as uuid } from "uuid"
import _ from 'lodash'
import '../selectors.scss'
import { Selector } from "./Selector"
import { Reorder } from "framer-motion"

const TableHeadRow = () => {
    const cellStyle = useMemo(() => {
        return {

            px: "4px",
            borderBottomWidth: 1,
            borderLeftWidth: 0,
            borderTopWidth: 1,
            borderRightWidth: 1,
            borderStyle: "solid",
            borderColor: "#0002",
            backgroundColor: "#0000",
            "&:hover": {
                borderLeftWidth: 1,
                borderColor: "#000"
            }
        }
    }, [])

    console.log('noice');
    return (
        <TableHead>
            <TableRow>
                <TableCell sx={{ ...cellStyle, borderLeftWidth: 1 }} align="center">S.no.</TableCell>
                <TableCell sx={cellStyle} align="center">Name</TableCell>
                <TableCell sx={cellStyle} align="center">Selector String</TableCell>
                <TableCell sx={cellStyle} align="center">Target</TableCell>
                <TableCell sx={cellStyle} align="center">Format</TableCell>
                {/* <TableCell sx={cellStyle} align="center">Options</TableCell> */}
            </TableRow>
        </TableHead>
    )
}

export const SelectorContainer = ({ selectorsList, setSelectorsList }) => {


    const MemoizedTableHeadRow = memo(TableHeadRow, () => true)

    const addNewSelector = () => {
        setSelectorsList((prev) => {
            return [...prev, {
                name: "",
                selector: "",
                target: '',
                format: 'array',
                uid: uuid(),
                active: false
            }]
        })
    }

    return (
        <div className="selectors-container">
            <TableContainer sx={{ overflowX: 'visible' }}>
                <Table stickyHeader size="small">
                    <MemoizedTableHeadRow />

                    <Reorder.Group as="tbody" axis="y" values={selectorsList} onReorder={setSelectorsList}>

                        {(selectorsList.length < 1) &&

                            <Reorder.Item as="tr" style={{
                                border:'10px solid black'
                            }}>
                                <TableCell colSpan={6} align="center">

                                    <div className="helper-msg">
                                        No Selectors... ☹️,
                                        Add Selectors to Scrape Data.
                                    </div>

                                </TableCell>
                            </Reorder.Item>

                        }

                        {selectorsList.map((item, i) =>
                            (<Selector key={item.uid} index={i} selectorInfo={item} updateSelectors={setSelectorsList} />)
                            /*  <MemoizedSelectorRow key={item.uid} index={i} selectorInfo={item} updateSelectors={setSelectorsList} /> */
                        )}
                        <Reorder.Item as="tr">
                            <TableCell colSpan={6} align="center">
                                <Button onClick={addNewSelector} variant="outlined">Add New Selector</Button>
                            </TableCell>
                        </Reorder.Item>
                    </Reorder.Group>

                </Table>
            </TableContainer>
        </div>
    )
}