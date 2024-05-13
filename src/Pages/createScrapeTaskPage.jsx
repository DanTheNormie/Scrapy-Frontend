import { useEffect, useState, useRef } from 'react';
import { EditorStateContext } from '../components/CreateTaskComponents/URL/editorStateContext';
import { EditorState, ContentState } from 'draft-js';
import { compositeDecorator } from '../components/CreateTaskComponents/URL/url.utils';
import URLSection from '../components/CreateTaskComponents/URL/urlSection.component';
import URLTextField from '../components/CreateTaskComponents/URL/url.component';
import {default as PS} from '../components/CreateTaskComponents/URL/newParams/ParamsContainer';
import { SelectorContainer } from '../components/CreateTaskComponents/Selectors/newSelectros/SelectorContainer';
import './styles.scss'
import { Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { ResultOptions } from '../components/CreateTaskComponents/ResultFormat/ResultFormat.component';
import ScrapeRouteComponent from '../components/CreateTaskComponents/JSONViewer/ScrapeRoute.component';
import { v4 as uuid } from 'uuid';
import CodeBlock from '../components/CreateTaskComponents/JSONViewer/CodeBlock.component';
import { useQuery, useQueryClient } from '@tanstack/react-query';
const LOCAL_BASE_URL = 'http://192.168.0.101:3000'

export default function CreateScrapeTaskPage() {
    const [urlState, setURLState] = useState(EditorState.createEmpty(compositeDecorator));
    const [params, setParams] = useState([])
    const [selectorsList, setSelectorsList] = useState([]);
    const [selectorsOrder, setSelectorsOrder] = useState([]);
    const [resultOptions, setResultOptions] = useState({parentElementSelector:"",format:"single"});
    const [resultJSON, setResultJSON] = useState({})
    const [task, setTask] = useState()

    const populateFlag = useRef(false)
    const taskToPopulate = useRef({
        task:{
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
    
    const {isLoading, refetch, data} = useQuery({
        queryKey:['noice'],
        queryFn: async()=>generateURL(task),
        enabled:false
    })

    const queryClient = useQueryClient()
    
    const populateTaskData = (task)=>{
        setURLState(EditorState.createWithContent(
            ContentState.createFromText(task.url),
            compositeDecorator
        ))
    }

    useEffect(()=>{
        if(populateFlag.current){
            console.log('exec');
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

    const populateDummyData = ()=>{
        populateFlag.current = true
        setURLState(EditorState.createWithContent(
            ContentState.createFromText('https://www.amazon.in/dp/{{ASIN_NUMBER}}'),
            compositeDecorator
        ))

        setSelectorsList(()=>{
            const result = [
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
                    selector: ".a-price-whole",
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
                
            ]
            return result
        })
        setResultOptions({
            parentElementSelector:'body',
            format:'separate'
        })
        
    }

    const generateJSON = ()=>{
        const result = {}
        result.task = {
            'url':urlState.getCurrentContent().getPlainText() || ""
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
            format:resultOptions.format,
            parentElementSelector:resultOptions.parentElementSelector || "",
            dataOrder:selectorsList.map((item)=>item.name)
        }

        console.log(result);
        setTask(result)
        setResultJSON(result)
    }

    const generateURL = async (task)=>{
        if(task){
            const options = {
                method:"POST",
                body:JSON.stringify(task),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            }
            const res = await fetch(`${LOCAL_BASE_URL}/generate-url`,options)
            return res.json() || 'noice'
        }
    }

    return (
        <div className='page-container theme'>
            <div className='content-container'>
                <h1 className='page-heading'>Create Task</h1>
                <div className='dummy-btn'>
                    <Button variant='outlined' onClick={populateDummyData}>
                        populate Dummy Data
                    </Button>
                    
                </div>
                
                <EditorStateContext.Provider value={{ urlState, setURLState }}>
                    <URLSection>
                        <URLTextField />
                        {/* <Params urlState={urlState} params={params} setParams={setParams} /> */}
                        <PS urlState={urlState} params={params} setParams={setParams}/>
                    </URLSection>
                </EditorStateContext.Provider>

                <SelectorContainer selectorsList={selectorsList} setSelectorsList={setSelectorsList} />
            
                <ResultOptions selectorsList={selectorsList} selectorsOrder={selectorsOrder} setSelectorsOrder={setSelectorsOrder} resultOptions={resultOptions} setResultOptions={setResultOptions}/>

                <div className='gen-json-container'><Button onClick={generateJSON} variant="contained">Generate JSON</Button></div>
            
                <ScrapeRouteComponent  task={resultJSON}/>

                <div className='gen-json-container'>
                    <LoadingButton 
                        loading={isLoading} 
                        onClick={()=>{
                            queryClient.invalidateQueries({ queryKey: ['noice'] })
                            refetch();
                        }} 
                        variant="contained">
                            Generate URL
                    </LoadingButton>
                </div>
            
                <CodeBlock data={data} heading={'Generated URL'}/>
            
            </div>
        </div>
    );
}