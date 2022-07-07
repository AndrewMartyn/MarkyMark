import React from 'react'
import { Tabs,Tab,Typography,Box } from '@mui/material'

function TabPanel(props = TabPanelProps) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        className='menu'
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ padding: 0,margin:0}}>
            <Typography sx={{ padding: 0,margin:0}}>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  
  function a11yProps(index = number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  
  export default function BasicTabs() {
    const [value, setValue] = React.useState(0);
  
    const handleChange = (event = React.SyntheticEvent, newValue =number) => {
      setValue(newValue);
    };
  
    return (
      <Box sx={{ margin: 0, padding: 0, width: '100%' }}>
        <Box sx={{ margin:0,padding:0,borderBottom: 0.1, borderColor: 'divider' }}>
          <Tabs sx={{margin:0,padding:0}} value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab sx={{fontSize:10, margin:0,padding:0}} label="File" {...a11yProps(0)} />
            <Tab sx={{fontSize:10, margin:0,padding:0}} label="Edit" {...a11yProps(1)} />
            <Tab sx={{fontSize:10, margin:0,padding:0}} label="Help" {...a11yProps(2)} />
          </Tabs>
        </Box>
      </Box>
    );
  }