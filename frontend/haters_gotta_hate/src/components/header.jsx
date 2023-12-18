import React from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import '@fontsource/cookie';
import useScrollTrigger from "@mui/material/useScrollTrigger";

function Header() {
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });
  return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          color={trigger ? "default" : "transparent"}
          elevation={trigger ? 4 : 0}
          sx={{ borderBottom: trigger ? "1px solid rgba(0, 0, 0, 0.12)" : "none" }}
        >
        <Toolbar>
          <IconButton
            href = "/"
            size="large"
            edge="start"
            color="inherit"
            aria-label="home"
            sx={{ mr: 2, marginLeft:{xs:2, sm:5, md:10} }}
          >
            <QuestionAnswerIcon/>
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold', fontFamily: 'Cookie', fontSize: 32}}>
            Haters Gotta Hate
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
export default Header;