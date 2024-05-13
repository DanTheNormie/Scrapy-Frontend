import * as React from 'react';
import Box from '@mui/joy/Box';
import Radio from '@mui/joy/Radio';
import RadioGroup from '@mui/joy/RadioGroup';
import Typography from '@mui/joy/Typography';
import { FormControlLabel } from '@mui/material';

export default function SegmentedButton({ value: defaultSelectedValue, values, onChange }) {
	return(<Box></Box>)
	return (
		<Box sx={{ display: 'flex', alignItems: 'center', gap: 1, paddingLeft: 1 }}>
			<Typography fontSize="lg" color='var(--text)'>
				Format : 
			</Typography>
			<RadioGroup
				orientation="horizontal"
				name="format"
				value={defaultSelectedValue}
				onChange={(event) => onChange(event.target.value)}
				sx={{
					minHeight: 56,
					padding: '8px',
					borderRadius: '12px',
					bgcolor: '#fff',
					'--RadioGroup-gap': '8px',
					'--Radio-actionRadius': '8px',
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
							px: 2,
							alignItems: 'center',
							color:'black'
						}}
						slotProps={{
							action: ({ checked }) => ({
								sx: {
									...(checked && {
										bgcolor: 'var(--background)',
										boxShadow: 'sm',
										'&:hover': {
											bgcolor: 'var(--background)',
										},
									}),
									...(!checked && {
										bgcolor: 'var(--background)',
										boxShadow: 'sm',
										color:'black !important',
										'&:hover': {
											bgcolor: 'var(--background)',
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
