import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import LoadingButton from '@mui/lab/LoadingButton';
import { useQuery, useQueryClient } from '@tanstack/react-query';
//import { LOCAL_BASE_URL } from '../../config/config';
import CodeBlock from './CodeBlock.component';
import SendIcon from '@mui/icons-material/Send';
import BugReportIcon from '@mui/icons-material/BugReport';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import { styled } from '@mui/material/styles';

import { useRef, useState } from 'react';
import CodeEditor from './CodeEditor.component';
import { Button } from '@mui/material';

const LOCAL_BASE_URL = 'http://localhost:3000' /* 'http://192.168.0.101:3000' */

function QueryIndicatorIcon(props) {
    if (props.isError) return <CancelIcon color='error' />
    if (props.isSuccess) return <CheckCircleIcon color='success' />
    return <BugReportIcon />
}

const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
}));

const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
        expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
        {...props}
    />
))(({ theme }) => ({

    justifyContent: "space-between",
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(180deg)',

    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
        justifyContent: "space-between",
        alignItems: "center"
    },
}));



export default function ScrapeRouteComponent(props) {
    const queryClient = useQueryClient()
    
    const [expanded, setExpanded] = useState(false)
    const handleChange = (event) => {
        setExpanded((prev)=>!prev);
    };

    const editorRef = useRef(JSON.stringify(props.task))

    async function fetchData() {
        const options = {
            method: "POST",
            body: JSON.stringify({ task: JSON.parse(editorRef.current.getValue().replace(/[\t\n]/g,''))}),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        }

        const res = await fetch(`${LOCAL_BASE_URL}/api/customscrape`, options)
        /* if(!res.ok) throw new Error('Request Failed') */
        return res.json()
    }

    

    const {isLoading,isError,isSuccess, data, error,isFetching,refetch} = useQuery({
                                                                                    queryKey:[props.task.url],
                                                                                    queryFn:() => { return fetchData(editorRef) },
                                                                                    enabled: false,
                                                                                    refetchOnWindowFocus: false,
                                                                                    retry: false,
                                                                                    staleTime: 0,
                                                                                    cacheTime: 0
                                                                                })

    

    return (
        <Accordion 
            className="border border-gray-400 m-4 p-2 !rounded-xl"
            expanded={expanded}
            onChange={handleChange}
            
        >

            <AccordionSummary
                sx={{ justifyContent: "space-between" }}
                expandIcon={<ExpandMoreIcon />}
            >

                    <div className='text-xl'>{props.name}</div>
                    <LoadingButton
                        className='p-0 m-0 h-fit'
                        loading={isFetching}
                        loadingPosition='end'
                        endIcon={<QueryIndicatorIcon isError={isError || (data && data.success === false)} isSuccess={isSuccess} />}
                        variant='outlined'
                        onClick={(e) => {
                            e.stopPropagation()
                            refetch();
                            queryClient.invalidateQueries({ queryKey: props.task.url })
                        }}>
                            test

                    </LoadingButton>

            </AccordionSummary>
            
            <CodeEditor data={props.task} editorRef={editorRef} heading={'Body'} readOnly={isFetching}/>

            <CodeBlock data={data || error} initialExpandLevel={1} heading="Result" />
        </Accordion>
    )
}