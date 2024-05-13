import { Divider, useTheme } from '@mui/material';
import { ObjectView } from 'react-object-view';

export default function CodeBlock({ data, hidden, initialExpandLevel, heading }) {
    const theme = useTheme()
    const lightTheme = {
        base00: "#FFF",
        base01: "#7CAFC2",
        base02: "#B8B8B8",
        base03: "#7CAFC2",
        base04: "#86C1B9",
        base05: "#A1B56C",
        base06: "#BA8BAF",
        base07: "#AB4642",
        base08: "#181818",
        base09: "#F7CA88",
        base0A: "#86C1B9",
        base0B: "#A1B56C",
        base0C: "#BA8BAF",
        base0D: "#AB4642",
        base0E: "#383838",
        base0F: "#F7CA88"
    };

    const darkTheme = {
        base00: "#212121",
        base01: "#303030",
        base02: "#353535",
        base03: "#4A4A4A",
        base04: "#B2CCD6",
        base05: "#EEFFFF",
        base06: "#EEFFFF",
        base07: "#FFFFFF",
        base08: "#F07178",
        base09: "#F78C6C",
        base0A: "#FFCB6B",
        base0B: "#C3E88D",
        base0C: "#89DDFF",
        base0D: "#82AAFF",
        base0E: "#C792EA",
        base0F: "#FF5370"
    }

    const options = {
        expandLevel: initialExpandLevel || 1,
        displayEntriesMaxCount: 4
    }
    return (
        <div >
            <Divider sx={{my:2}}>{heading}</Divider>
            <div className='gen-url-container'>
                <ObjectView
                    data={data}
                    options={options}
                    palette={(theme.palette.mode =='dark'?darkTheme:lightTheme)}
                />
            </div>
        </div>
    )
}