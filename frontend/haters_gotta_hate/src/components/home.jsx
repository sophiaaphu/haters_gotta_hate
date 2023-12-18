import React from "react";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Home() {
  const [videoLink, setVideoLink] = useState("");
  const navigate = useNavigate();
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      //splice the video id from the link
      const startIndex = videoLink.indexOf("v=");
      const videoId = videoLink.slice(startIndex + 2 ,startIndex + 13);
      // navigate to new page 
      navigate(`/comments/${videoId}`);
    }
  };
  return (
    <div>
      <Box sx = {{ textAlign: "center", marginTop:30 }} >
        <Typography textAlign="center" fontWeight="bold" fontSize="3rem" sx = {{lineHeight:{xs:1.6, s:1.6}}}>
          The internet has <span style={{ color: '#B43757' }}>lots of negativity</span>.
        </Typography>
        <Typography textAlign="center" fontSize="1.4rem" style={{ color: '#363636', marginBottom: 15}}>
          Make it easier to find the hate!
        </Typography>

        {/* Integrated Material-UI TextField */}
        <TextField
          variant="outlined"
          label="Enter a Youtube video link here"
          color="secondary" 
          InputLabelProps={{ shrink: true }}
          InputProps={{
            startAdornment: <SearchIcon />,
          }}
          sx={{
            borderRadius: 15,
            width: "70%",
            margin: "auto",
            '& .MuiOutlinedInput-notchedOutline': {
            borderRadius: 15,} // Set the border radius for the input outline
          }}
          value={videoLink}
          onChange={(e) => setVideoLink(e.target.value)}
          onKeyDown={handleKeyPress}
        />
      </Box>
    </div>
  );
}

export default Home;