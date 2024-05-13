import { v4 as uuid } from "uuid";
import { useEffect, useState, useMemo, useRef } from "react";
import Param from "./Param";
import { Table, TableCell, TableContainer, TableBody, TableHead, TableRow, TextField, InputLabel, Typography } from "@mui/material";
import { Box } from "@mui/joy";

export default function ParamsContainer({ urlState, params, setParams }) {
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
        if(false){
            setNoice((prev)=>!prev)
        }else{
            getParams(urlState)
        }
    }, [urlState])

    const TableHeadCellStyle = useMemo(() => {
        return {

            p: "6px 4px",
            border:1
        }
    }, [])

    return (
        <Box sx={{
            position:'relative',
            border:1,
            borderRadius:2,
            mt:4,
            p:4
        }}>
           <Typography sx={{
                        position:'absolute', 
                        top:'-12px', 
                        left:'16px', 
                        px:1,
                        backgroundColor:(theme)=>((theme.palette.mode=='dark'?'#121212':'#fff')), 
                        backgroundImage:'linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))'  /* 'linear-gradient(rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.09))' */
                    }} variant="subtitle1">PARAMS</Typography>
            <TableContainer>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" sx={{ ...TableHeadCellStyle, borderLeftWidth: 1, width: '100px' }}>S.no.</TableCell>
                            <TableCell align="center" sx={TableHeadCellStyle}>Name</TableCell>
                            <TableCell align="center" sx={TableHeadCellStyle}>Default Value</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {params.length < 1 &&
                            <TableRow>
                                <TableCell colSpan={6} align="center">

                                    <Box className="helper-msg">
                                        <Typography sx={{ opacity:0.5}}>No Parameters in the url...☹️</Typography>
                                        <br />
                                        <Typography sx={{ opacity:0.5}}>{`Try adding words in between double curly braces, like this -> `}<Typography sx={{display:'inline'}} color='primary.main'>{`{{ word }}`}</Typography> {`to make the url more dynamic`}</Typography>
                                    </Box>

                                </TableCell>
                            </TableRow>

                        }


                        {params.map((item, index) => {
                            return <Param key={item.uid} name={item.name} uid={item.uid} value={item.value} index={index} params={params} setParams={setParams} />

                        })}
                    </TableBody>
                </Table>
            </TableContainer>


        </Box>)

}