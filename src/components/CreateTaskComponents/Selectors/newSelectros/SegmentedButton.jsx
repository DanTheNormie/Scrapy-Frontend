
import { Box, Button } from '@mui/material';
import { useRef, useState, createRef, useEffect } from 'react';
import { v4 as uuid } from 'uuid';

export default function SegmentedButton({ value, values, onChange }) {

	console.log(value, values);

	const [checked, setChecked] = useState(values.findIndex((item)=>item==value) || 0)
	const [highlighterWidth, setHighlighterWidth] = useState() 
	const [highlighterStartPos, setHighlighterStartPos] = useState()
	const radioRefs = useRef(values.map(()=>createRef()))
	
	const onClick = (i)=>{
		onChange(values[i])
	}
	useEffect(()=>{
		setChecked(values.findIndex((item)=>item==value) || 0)
	},[value])
	useEffect(()=>{
		console.log(checked);
		setHighlighterStartPos(getLeftForHighlighter(checked))
		setHighlighterWidth(radioRefs.current[checked].current.clientWidth)
	},[checked])

	const getLeftForHighlighter = (idx)=>{
		let cumsum = 0
		for (let i = 0; i < idx; i++) {
			cumsum += radioRefs.current[i].current.clientWidth
		}
		return cumsum
	}

	return (

		<Box sx={{position:'relative', display:'flex'}}>
			
			{values.map((item,i) => 
				<Button key={uuid()}
					disableRipple
					sx={{
						zIndex:2,
						'&:hover':{
							bgcolor:'#0000'
						}
					}}
					onClick={()=>onClick(i)}
					ref={radioRefs.current[i]}
					>
						{item}
				</Button>)
			}

			<Box sx={{
				position:'absolute',
				top:0,
				bottom:0,
				width:`${highlighterWidth}px`,
				borderRadius:2,
				backgroundColor:(theme)=>theme.palette.primary.main,
				opacity:0.2,
				transition:'all 250ms',
				transform:`translateX(${highlighterStartPos}px)`,
				zIndex:1,
			}}>

			</Box>
		</Box>

	);
}
