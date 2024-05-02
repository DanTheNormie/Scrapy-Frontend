import { v4 as uuid } from "uuid";
import './params.scss'
import { useEffect, useState, useMemo } from "react";
import Param from "./Param";
import { Table, TableCell, TableContainer, TableBody, TableHead, TableRow, TextField } from "@mui/material";

export default function ParamsContainer({urlState, params, setParams}) {
    const getParams = (urlState) => {
        const url = urlState.getCurrentContent().getPlainText()
        const CURLY_REGEX = /\{\{([^{}]+)\}\}/g;
        let noice = url.match(CURLY_REGEX)
        if (noice === null) noice = []
        /* set uid to all params */

        noice = noice.map((val) => {
            const item = {
                name: val.slice(2, val.length - 2),
                uid: uuid(),
                value: ""
            }
            return item
        })

        setParams(noice)
    }

    useEffect(() => {
        getParams(urlState)
    }, [urlState])

    const TableHeadCellStyle = useMemo(() => {
        return {

            p: "6px 4px",
            borderBottomWidth: 1,
            borderLeftWidth: 0,
            borderTopWidth: 1,
            borderRightWidth: 1,
            borderStyle: "solid",
            borderColor: "#0002",
            backgroundColor: "#0000",
        }
    }, [])

    return (
        <div className="params-container">

            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" sx={{ ...TableHeadCellStyle, borderLeftWidth: 1, width: '100px' }}>S.no.</TableCell>
                            <TableCell align="center" sx={TableHeadCellStyle}>Name</TableCell>
                            <TableCell align="center" sx={TableHeadCellStyle}>Value</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {params.map((item, index) => {
                            return <Param key={item.uid} name={item.name} uid={item.uid} value={item.value} index={index} params={params} setParams={setParams}/>

                        })}
                    </TableBody>
                </Table>
            </TableContainer>


        </div>)

}