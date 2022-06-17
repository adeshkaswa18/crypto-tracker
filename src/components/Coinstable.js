import React, { useState, useEffect } from 'react';
import {Container,
    createTheme,
    TableCell,
    LinearProgress,
    ThemeProvider,
    Typography,
    TextField,
    TableBody,
    TableRow,
    TableHead,
    TableContainer,
    CssBaseline,
    Table
   } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import { CryptoState } from '../Cryptocontext';
import axios from 'axios';
import { CoinList } from '../config/api'
import { useNavigate } from "react-router-dom";
import Pagination from "@material-ui/lab/Pagination";

const useStyles = makeStyles(() => ({
    row: {
      // backgroundColor: "#16171a",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#131111",
      },
      fontFamily: "IBM Plex Serif",
      
    },
    
    pagination: {
      "& .MuiPaginationItem-root": {
        color: "gold",
      },
    },
}))

export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

const Coinstable = () => {

    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    const [page, setPage] = useState(1);


    const { currency, symbol } = CryptoState();

    const fetchCoins = async () => {
        setLoading(true);
        const { data } = await axios.get(CoinList(currency))

        setCoins(data);
        setLoading(false);
    }

    

    useEffect(() => {
        fetchCoins();
        // eslint-disable-next-line
    }, [currency])

    const theme = createTheme({
    palette: {
      type: 'dark',
    },
  });

    const handleSearch = () => {
        return coins.filter(
          (coin) =>
            coin.name.toLowerCase().includes(search) ||
            coin.symbol.toLowerCase().includes(search)
        );
    };

    

    const classes = useStyles();
    

  return (
    <ThemeProvider theme={theme} >
    <CssBaseline />
      <Container style={{textAlign: "center" }}>
       <Typography variant='h4' style={{margin: 18, FontFamily: "IBM Plex Serif"}}>
        Cryptocurrency Prices by Market Cap
       </Typography>
       <TextField 
        label="Search For a Crypto Currency" variant="outlined"
        style={{ marginBottom: 20, width: "100%" }}
        onChange={(e) => setSearch(e.target.value)} />
       <TableContainer>
       {
         loading ? (
            <LinearProgress style={{backgroundColor: "gold"}} />
         ) : (
            <Table>
             <TableHead style={{ backgroundColor: "#EEBC1D" }}>
                <TableRow >
                  {[ "Rank", "Coin", "Price", "24h Change", "Day's High", "Day's Low", "24h Volume", "Market Cap"].map((head) => (
                    <TableCell align="center"
                      style={{ fontWeight: "700", fontFamily: "IBM Plex Serif",}}
                      key={head} 
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {handleSearch().slice((page - 1) * 10, (page - 1) * 10 + 10).map((row) => {
                    const profit = row.price_change_percentage_24h > 0;

                    return (
                        <TableRow onClick={() => navigate(`/coins/${row.id}`)} className={classes.row} key={row.name} >
                        <TableCell align="center"  >
                        {row?.market_cap_rank}
                        </TableCell>
                        <TableCell align="center" component="th" scope="row" style={{ display: "flex", gap: 15,  justifyContent: "center" }}>
                         
                          <img src={row?.image} alt={row.name} height="50" style={{ marginBottom: 10 }} />

                          <div style={{ display: "flex", flexDirection: "column" }}>
                          
                          <span style={{textTransform: "uppercase", fontSize: 22}}>{row.symbol}</span>
                          <span style={{ color: "darkgrey" }}>{row.name}</span>
                          </div>
                        </TableCell>

                        <TableCell align="center" >
                          {symbol}{" "}
                          {numberWithCommas(row.current_price.toFixed(2))}
                        </TableCell>

                        <TableCell align="center" style={{ color: profit > 0 ? "rgb(14, 203, 129)" : "red", fontWeight: 500, }}>
                          {profit && "+"}
                          {row.price_change_percentage_24h.toFixed(2)}%
                        </TableCell>

                        <TableCell align="center" >
                          {symbol}{" "}
                          {numberWithCommas(row.high_24h)}
                        </TableCell>

                        <TableCell align="center" >
                          {symbol}{" "}
                          {numberWithCommas(row.low_24h)}
                        </TableCell>

                        <TableCell align="center" >
                          {numberWithCommas(row.total_volume.toString().slice(0, -6))}M
                        </TableCell>

                        <TableCell align="center" > 
                        {symbol}{" "} {numberWithCommas( row.market_cap.toString().slice(0, -6) )}M
                        </TableCell>
                        </TableRow>
                    )
                })}
              </TableBody>

            </Table>
         )
       }
       </TableContainer>
       <Pagination
          count={(handleSearch()?.length / 10).toFixed(0)}
          style={{
            padding: 20,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
          classes={{ ul: classes.pagination }}
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 450);
          }}
        />
      </Container>

    </ThemeProvider>
  )
}

export default Coinstable;