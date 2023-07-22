import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Spinner = () => {
  return (
    <Box sx={{ display: 'flex',justifyContent:"center", alignItems:"center", marginTop: "8rem"}}>
      <CircularProgress color="success"  size={80}  thickness={4}/>
    </Box>
  )
}

export default Spinner