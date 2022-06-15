import React from 'react'
import { AppBar, Container, Toolbar, Typography, Select, MenuItem,  } from '@material-ui/core'
import {createTheme, ThemeProvider} from '@material-ui/core/styles'
import { makeStyles } from '@material-ui/core';
import { useNavigate } from "react-router-dom"; 
import { CryptoState } from '../Cryptocontext';

const useStyles = makeStyles(() =>({
    title: {
      flex: 1,
      color: "gold",
      fontFamily: 'IBM Plex Serif',
      fontWeight: 'bold',
      cursor: 'pointer',

    }
  }));

const Header = () => {

    const classes = useStyles();
    const navigate = useNavigate();

    const { currency, setCurrency } = CryptoState()

    const handleClick = (e) => {
        e.preventDefault();
        navigate('/');
    }

    const darkTheme = createTheme({
        palette: {
            primary: {
                main: "#fff",
            },
            type: "dark",
        }
    })
  return (
    <ThemeProvider theme={darkTheme}>
    <AppBar color='black' position='static'>
      <Container>
        <Toolbar>
            <Typography
             onClick={handleClick}
             className={classes.title} >Crypto Tracker</Typography>
            <Select variant='outlined' style={{
                width: 100,
                height: 40,
                marginRight: 15,
            }}
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
             >
                <MenuItem value={"USD"}>USD</MenuItem>
                <MenuItem value={"INR"}>INR</MenuItem>
            </Select>
        </Toolbar>
      </Container>
    </AppBar>
    </ThemeProvider>
  )
}

export default Header