import { useEffect, useState } from 'react';
import { EditorStateContext } from '../components/URL/editorStateContext';
import { EditorState, ContentState } from 'draft-js';
import { compositeDecorator } from '../components/URL/url.utils';
import URLSection from '../components/URL/urlSection.component';
import URLTextField from '../components/URL/url.component';
import Params from '../components/URL/Params/ParamsContainer.component';
import {default as PS} from '../components/URL/newParams/ParamsContainer';
/* import SelectorContainer from '../components/Selectors/SelectorsContainer.component'; */
import { SelectorContainer } from '../components/Selectors/newSelectros/SelectorContainer';
import './styles.scss'
import { Button } from '@mui/material';
import { ResultOptions } from '../components/ResultFormat/ResultFormat.component';
import ScrapeRouteComponent from '../components/JSONViewer/ScrapeRoute.component';
import { v4 as uuid } from 'uuid';
export default function CreateScrapeTaskPage() {
    const [urlState, setURLState] = useState(EditorState.createEmpty(compositeDecorator));
    const [params, setParams] = useState([])
    const [selectorsList, setSelectorsList] = useState([]);
    const [selectorsOrder, setSelectorsOrder] = useState([]);
    const [resultOptions, setResultOptions] = useState({parentElementSelector:"",format:"single"});
    const [resultJSON, setResultJSON] = useState({})

    const populateDummyData = ()=>{
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
                
            ]
            return result
        })
        setResultOptions({
            parentElementSelector:'body',
            format:'single'
        })
        
    }

    
    
    const generateJSON = ()=>{
        const result = {}
        result.task = {
            'url':urlState.getCurrentContent().getPlainText() || ""
        }

        result.task.params = {}

        params.forEach((val)=>{
            result.task.params[val.name] = {
                name:val.name,
                value:val.value
            }
        })

        result.task.selectors = [...selectorsList];

        result.task.result = {
            format:resultOptions.format,
            parentElementSelector:resultOptions.parentElementSelector || "",
            data:selectorsList.map((item)=>item.name)
        }

        console.log(result);
        setResultJSON(result)
    }

    return (
        <div className='page-container'>
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
            
                <ScrapeRouteComponent task={resultJSON}/>
            </div>
        </div>
    );
}