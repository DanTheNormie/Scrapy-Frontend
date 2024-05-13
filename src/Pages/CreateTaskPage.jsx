import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Card, Paper, TextField, Typography } from "@mui/material";
import URLTextField from "../components/CreateTaskComponents/URL/url.component";
import { EditorStateContext } from "../components/CreateTaskComponents/URL/editorStateContext";
import { ContentState, EditorState } from "draft-js";
import { compositeDecorator } from "../components/CreateTaskComponents/URL/url.utils";
import { useEffect, useState, useRef } from "react";
import { v4 as uuid } from "uuid";
import ParamsContainer from "../components/CreateTaskComponents/URL/newParams/ParamsContainer";
import { SelectorContainer } from "../components/CreateTaskComponents/Selectors/newSelectros/SelectorContainer";
import SegmentedButton from "../components/CreateTaskComponents/Selectors/newSelectros/SegmentedButton";
import { ArrowDropDown } from "@mui/icons-material";
import ScrapeRouteComponent from "../components/CreateTaskComponents/JSONViewer/ScrapeRoute.component";
export default function () {

    const [urlState, setURLState] = useState(EditorState.createEmpty(compositeDecorator))
    const [params, setParams] = useState([])
    const [selectorsList, setSelectorsList] = useState([])
    const [parentElementSelector, setParentElementSelector] = useState('')
    const [resultFormat, setResultFormat] = useState('separate')
    const [resultJSON, setResultJSON] = useState({})
    const [taskName, setTaskName] = useState('')
    const taskToPopulate = useRef({
        task:{
            name:'Amazon Product Query',
            url:'https://www.amazon.in/dp/{{ASIN_NUMBER}}',
            params:{
                ASIN_NUMBER:{
                    value:"B0CS5Y7H6T"
                }
            },
            selectors:[
                {
                    name: "Product-Title",
                    selector: "#productTitle",
                    target: 'innerText',
                    format: 'single',
                    uid: uuid(),
                    active:false
                },
                {
                    name: "Product-Price",
                    selector: "#corePriceDisplay_desktop_feature_div > div.a-section.a-spacing-none.aok-align-center.aok-relative > span.a-price.aok-align-center.reinventPricePriceToPayMargin.priceToPay > span:nth-child(2) > span.a-price-whole",
                    target: 'innerText',
                    format: 'single',
                    uid: uuid(),
                    active:false
                },
                {
                    name: "Product-Availability",
                    selector: "#availability",
                    target: 'innerText',
                    format: 'single',
                    uid: uuid(),
                    active:false
                },
                
            ],
            taskOptions:{
                parentElementSelector:'body',
                format:'separate',
                dataOrder:[
                    'Product-Title',
                    'Product-Price',
                    'Product-Availability'
                ]
            }
        }
    })

    /* populate hack */
    const populateFlag = useRef(false)

    useEffect(() => {
        selectorsList.forEach((item) => {
            if (item.format == 'single') {
                setResultFormat('separate')
                return;
            }
        })
    }, [selectorsList])

    useEffect(() => {
        if (resultFormat == 'together') {
            setSelectorsList((prev) => { return prev.map((item) => { return { ...item, format: 'multiple' } }) })
        }
    }, [resultFormat])

    useEffect(()=>{
        if(populateFlag.current){
            populateFlag.current = false

            setParams((prev)=>{
                const log =  prev.map((item)=>{
                    if(taskToPopulate.current.task.params[item.name]){
                        return {...item, value:taskToPopulate.current.task.params[item.name].value}
                    }else{
                        return item
                    }
                })
                console.log(log);
                return log
            })
        }
    },[urlState])

    const generateJSON = ()=>{
        const result = {}
        result.task = {
            name:taskName,
            url:urlState.getCurrentContent().getPlainText() || ''
        }

        result.task.params = new Map()

        params.forEach((val)=>{
            result.task.params[val.name] = {
                name:val.name,
                value:val.value
            }
        })

        result.task.selectors = [...selectorsList];

        result.task.taskOptions = {
            format:resultFormat,
            parentElementSelector:parentElementSelector,
            dataOrder:selectorsList.map((item)=>item.name)
        }

        console.log(result);
        setResultJSON(result)
    }

    const populateDummyData = ()=>{
        populateFlag.current = true

        setTaskName(taskToPopulate.current.task.name)

        setURLState(EditorState.createWithContent(
            ContentState.createFromText(taskToPopulate.current.task.url),
            compositeDecorator
        ))

        setSelectorsList(taskToPopulate.current.task.selectors)

        setParentElementSelector(taskToPopulate.current.task.taskOptions.parentElementSelector)

        setResultFormat(taskToPopulate.current.task.taskOptions.format)
    }

    const generateURL = async ()=>{
        if(resultJSON){
            const options = {
                method:"POST",
                body:JSON.stringify(resultJSON),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
            const LOCAL_BASE_URL = 'http://localhost:3000' /* 'http://192.168.0.109:3000 */
            const res = await fetch(`${LOCAL_BASE_URL}/generate-url`,options)
            return res.json() || 'noice'
        }
    }

    return (
        <Box sx={{
            width: '100%',
            minHeight: 'fit-content',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            py: 8,
            px: 4
        }}>
            <Card elevation={4} sx={{
                maxWidth: (theme) => theme.breakpoints.values.md,
                p: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                overflow: 'visible',
                width: '100%'
            }}>
                <Box sx={{
                    position: "relative",
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    flexDirection: 'column'
                }}>
                    <Typography variant="h4" sx={{ mb: 4 }}>Create Task</Typography>

                    <Button variant="outlined" onClick={populateDummyData} sx={{ position: 'absolute', right: 0, top: 0 }}>populate dummy data</Button>

                    {/* <Box sx={{width:'100%', pb:100, mt:4, position:'relative', p:4, border:'1px solid', borderRadius:2}}>
                    <Typography sx={{
                        position:'absolute', 
                        top:-16, 
                        left:'16px', 
                        px:2, 
                        backgroundColor:(theme)=>((theme.palette.mode=='dark'?'#121212':'#fff')), 
                        backgroundImage:'linear-gradient(rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.09))' 
                    }} variant="h6"> URL Section</Typography>

                    <EditorStateContext.Provider value={{urlState, setURLState}}>
                        <URLTextField/>
                        <ParamsContainer urlState={urlState} params={params} setParams={setParams}/>
                    </EditorStateContext.Provider>
                </Box>
                <Box sx={{width:'100%', pb:100, mt:4, position:'relative', p:4, border:'1px solid', borderRadius:2}}>
                    <Typography sx={{
                        position:'absolute', 
                        top:-16, 
                        left:'16px', 
                        px:2, 
                        backgroundColor:(theme)=>((theme.palette.mode=='dark'?'#121212':'#fff')), 
                        backgroundImage:'linear-gradient(rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.09))' 
                    }} variant="h6">Selectors</Typography>

                    <SelectorContainer selectorsList={selectorsList} setSelectorsList={setSelectorsList}/>

                </Box>

                <Box sx={{width:'100%', pb:100, mt:4, position:'relative', p:4, border:'1px solid', borderRadius:2}}>
                    <Typography sx={{
                        position:'absolute', 
                        top:-16, 
                        left:'16px', 
                        px:2, 
                        backgroundColor:(theme)=>((theme.palette.mode=='dark'?'#121212':'#fff')), 
                        backgroundImage:'linear-gradient(rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.09))' 
                    }} variant="h6">Result Options</Typography>
                    
                    <TextField fullWidth label='Parent Element Selector' value={parentElementSelector} onChange={(e)=>setParentElementSelector(e.target.value)}/>

                    <Box sx={{display:'flex', alignItems:'center', mt:4}}>
                        <Typography sx={{mr:2}}>Format : </Typography>
                        <SegmentedButton value={resultFormat} values={['seperate', 'together']} onChange={setResultFormat}/>
                    </Box>

                </Box> */}
                    <TextField fullWidth label='Task Name' value={taskName} onChange={(e) => setTaskName(e.target.value)} required />

                    <Accordion sx={{
                        width: '100%',
                        borderRadius: 2,
                        mt: 2,
                        border:(theme)=>`1px solid ${theme.palette.divider}`,
                        '&:before': {
                            display: 'none',
                        },
                    }}
                    >
                        <AccordionSummary expandIcon={<ArrowDropDown />}>
                            <Typography variant="h6">URL Section</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <EditorStateContext.Provider value={{ urlState, setURLState }}>
                                <URLTextField />
                                <ParamsContainer urlState={urlState} params={params} setParams={setParams} />
                            </EditorStateContext.Provider>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion sx={{ 
                        width: '100%',
                        border:(theme)=>`1px solid ${theme.palette.divider}`,
                        '&:before': {
                            display: 'none',
                        }, 
                        borderRadius: 2, 
                        mt: 2, 
                        '&:before': { display: 'none' } }}>
                        <AccordionSummary expandIcon={<ArrowDropDown />}>
                            <Typography variant="h6">Selectors</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <SelectorContainer selectorsList={selectorsList} setSelectorsList={setSelectorsList} />
                        </AccordionDetails>
                    </Accordion>

                    <Accordion sx={{ 
                        width: '100%',
                        border:(theme)=>`1px solid ${theme.palette.divider}`,
                        '&:before': {
                            display: 'none',
                        }, 
                        borderRadius: 2, 
                        mt: 2, 
                        '&:before': { display: 'none' } }}>
                        <AccordionSummary expandIcon={<ArrowDropDown />}>
                            <Typography variant="h6">Result Options</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <TextField fullWidth label='Parent Element Selector' value={parentElementSelector} onChange={(e) => setParentElementSelector(e.target.value)} />

                            <Box sx={{
                                display: 'flex', alignItems: 'center', mt: 4, '&::before': {
                                    display: 'none',
                                    m: '10px'
                                }
                            }}>
                                <Typography sx={{ mr: 2 }}>Format : </Typography>
                                <SegmentedButton value={resultFormat} values={['separate', 'together']} onChange={setResultFormat} />
                            </Box>
                        </AccordionDetails>
                    </Accordion>

                    <Box sx={{ width: '100%', mt: 4, display: 'flex', justifyContent: 'center' }}><Button onClick={generateJSON} variant="contained">Generate JSON</Button></Box>
                </Box>

                <Box sx={{
                    position: "relative",
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    flexDirection: 'column',
                    pt: 4
                }}>

                    <ScrapeRouteComponent name={'Preview'} task={resultJSON} />

                </Box>

                <Box sx={{ width: '100%', mt: 4, display: 'flex', justifyContent: 'center' }}><Button onClick={generateURL} variant="contained">Generate URL</Button></Box>
            </Card>
        </Box>
    )
}