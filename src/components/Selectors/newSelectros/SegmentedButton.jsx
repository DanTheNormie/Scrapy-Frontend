import * as React from 'react';
import Box from '@mui/joy/Box';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import Typography from '@mui/joy/Typography';
import { FormControlLabel } from '@mui/material';

export default function SegmentedButton({ value: defaultSelectedValue, values, onChange }) {
	
	return (
		<Box sx={{ display: 'flex', alignItems: 'center',justifyContent:'center', gap: 1,  }}>
			<RadioGroup
				orientation="horizontal"
				name="format"
				value={defaultSelectedValue}
				onChange={(event) => onChange(event.target.value)}
				sx={{
					p:1,
					backgroundColor:"#fff",
                    borderColor:'#0000003f',
                    "&:hover":{
                        borderColor:"#000"
                    },
					'--RadioGroup-gap': '4px',
					'--Radio-actionRadius': '4px',
				}}
			>
				{values.map((item) => (
					<Radio
						key={item}
						color="neutral"
						value={item}
						disableIcon
						label={item}
						variant="plain"
						sx={{
							p:'4px',
							alignItems: 'center',
							
						}}
						slotProps={{
							action: ({ checked }) => ({
								sx: {
									'&:hover': {
										bgcolor: 'rgba(255,255,255,0.3)',
									},
									...(checked && {
										bgcolor: 'rgb(247, 230, 230)',
										boxShadow: 'sm',
										'&:hover': {
											bgcolor: 'rgb(247, 230, 230)',
										},
									}),
									
								},
							}),
						}}
					/>
				))}
			</RadioGroup>
		</Box>
	);
}
