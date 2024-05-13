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
import {Accordion, AccordionSummary, AccordionDetails} from '@mui/material';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import { styled } from '@mui/material/styles';
import taskChecker from './task-checker.utils';
import { useRef, useState } from 'react';
import CodeEditor from './CodeEditor.component';
import { Button, Typography } from '@mui/material';

const LOCAL_BASE_URL = 'http://localhost:3000' /* 'http://192.168.0.104:3000' */

function QueryIndicatorIcon(props) {
    if (props.isError) return <CancelIcon color='error' />
    if (props.isSuccess) return <CheckCircleIcon color='success' />
    return <BugReportIcon />
}

const Accordion1 = styled((props) => (
    <Accordion  square {...props} />
))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&:before': {
        display: 'none',
    },
}));

const AccordionSummary1 = styled((props) => (
    <AccordionSummary
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
    const [localTaskCheckResult, setLocalTaskCheckResult] = useState()
    const handleChange = (event) => {
        setExpanded((prev) => !prev);
    };

    const editorRef = useRef(JSON.stringify(props.task))

    async function fetchData() {
        const options = {
            method: "POST",
            body: JSON.stringify({ task: JSON.parse(editorRef.current.getValue().replace(/[\t\n]/g, '')) }),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            credentials: 'include'
        }

        const res = await fetch(`${LOCAL_BASE_URL}/test-task`, options)
        /* if(!res.ok) throw new Error('Request Failed') */
        return res.json()
    }



    const { isLoading, isError, isSuccess, data, error, isFetching, refetch } = useQuery({
        queryKey: [props.task.url],
        queryFn: () => fetchData(editorRef),
        enabled: false,
        refetchOnWindowFocus: false,
        retry: false,
        staleTime: 0,
        cacheTime: 0
    })



    return (
        <Accordion1
            expanded={expanded}
            onChange={handleChange}
            sx={{ width: '100%', borderRadius: 2 }}
        >

            <AccordionSummary1
                sx={{ justifyContent: "space-between" }}
                expandIcon={<ExpandMoreIcon />}
            >

                <Typography variant='h6'>{props.name}</Typography>
                <LoadingButton
                    className='p-0 m-0 h-fit'
                    loading={isFetching}
                    loadingPosition='end'
                    endIcon={<QueryIndicatorIcon isError={isError || (data && data.success === false)} isSuccess={isSuccess} />}
                    variant='outlined'
                    onClick={(e) => {
                        e.stopPropagation()
                        const msg = taskChecker(JSON.parse(editorRef.current.getValue().replace(/[\t\n]/g, '')))
                        if (msg == 'task is valid') {
                            queryClient.invalidateQueries({ queryKey: props.task.url })
                            refetch();
                        } else {
                            setLocalTaskCheckResult({ message: msg })
                        }
                    }}>
                    test

                </LoadingButton>

            </AccordionSummary1>

            <CodeEditor data={props.task} editorRef={editorRef} heading={'Body'} readOnly={isFetching} />

            <CodeBlock data={data || error || localTaskCheckResult} initialExpandLevel={1} heading="Result" />
        </Accordion1>
    )
}