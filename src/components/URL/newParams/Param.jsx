import { useEffect } from 'react';
import { Table, TableCell, TableContainer, TableBody, TableHead, TableRow, TextField } from "@mui/material";

const Param = ({ uid, index, name, value, params, setParams }) => {

    const onChange = (event) => {
        console.log(uid);
        const newParams = params.map((item) => { if (item.uid == uid) { return { ...item, value: event.target.value } } else return item })
        setParams(newParams)
    }

    const onDummyData = () => {
        
        const newParams = params.map((item) => { if (item.name == "ASIN_NUMBER" && item.uid == uid) { return { ...item, value: 'B0CS5Y7H6T' } } else return item })
        setParams(newParams || [])
        
    }

    useEffect(() => {
        console.log(params);
        onDummyData()
    }, [])

    return (
        <TableRow>
            <TableCell className="table-cell" align="center">{index + 1}</TableCell>
            <TableCell className="table-cell" align="center">
                <TextField 
                InputProps={{ readOnly: true, style: { textAlign: 'center' } }}
                sx={{
                height: "100%",
                p: '6px 4px',
                
                "& fieldset": { border: 'none' },

                "& .MuiInputBase-input": {
                    borderColor: "#0000",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    padding: 0,
                    pl: 1,
                    
                },
                "& input":{
                    textAlign:'center'
                }
            }}
                value={name} /></TableCell>
            <TableCell className="table-cell" align="center">
                <TextField fullWidth sx={{
                    height: "100%",
                    p: '6px 4px',
                    "& fieldset": { border: 'none' },
                    textAlign:'center',
                    "& .MuiInputBase-input": {
                        borderColor: "#0000",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        padding: 0,
                        pl: 1,
                    },
                }}
                    value={value}
                    onChange={onChange} />
            </TableCell>

        </TableRow>
    )
}

export default Param