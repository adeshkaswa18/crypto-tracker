import axios from 'axios';
import { Line } from 'react-chartjs-2';
import React, { useState, useEffect } from 'react';
import { CryptoState } from "../Cryptocontext";
import { HistoricalChart } from '../config/api';
import { CircularProgress, createTheme, CssBaseline, makeStyles, ThemeProvider } from '@material-ui/core';
import { chartDays } from '../config/data';
import  Selectbutton  from './Selectbutton';




const useStyles = makeStyles((theme) => ({
  container: {
    width: "70%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    padding: 40,
    [theme.breakpoints.down("md")]: {
      width: "100%",
      marginTop: 0,
      padding: 20,
      paddingTop: 0,
    },
  },
}));

const Coininfo = ({ coin }) => {
  const [historicdata, sethistoricData] = useState();
  const [days, setDays] = useState(1);

  const {currency, symbol } = CryptoState();

  const fetchHistoricData = async () => {
    const { data } = await axios.get(HistoricalChart(coin.id, days, currency))

    sethistoricData(data.prices);
  }

  useEffect(() => {
    fetchHistoricData();
    // eslint-disable-next-line
  }, [currency, days])

  const theme = createTheme({
    palette: {
      type: 'dark',
    },
  });
  const classes = useStyles();


  return (
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <div className={classes.container}>
      {!historicdata ? (
        <CircularProgress 
          style={{color: "gold"}}
          size={250}
          thickness={1}
        />
      ) : (
        <>
         
          <Line 
             data={{
              labels: historicdata.map((coin) => {
                let date = new Date(coin[0]);
                let time =
                  date.getHours() > 12 
                  ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                  : `${date.getHours()}:${date.getMinutes()} AM`
                return days === 1 ? time : date.toLocaleDateString(); 
              }),
              datasets: [
                {
                  data: historicdata.map((coin) => coin[1]),
                  label: `Price ( Past ${days} Days) in ${currency}`,
                  borderColor: "#EEBC1D",
                }
              ]
             }}
             options={{
              elements: {
                point: {
                  radius: 1,
                },
              },
             }}
          />
          <div style={{ display: "flex", marginTop: 20, justifyContent: "space-around", width: "100%" }}>
          {chartDays.map((day) => (
            <Selectbutton
             key={day.value} 
             onClick={() => {setDays(day.value);
             }} 
             selected={day.value === days}
            >
             {day.label}
            </Selectbutton>
          ))}
          </div> 
        </>
      )}
    </div>
    </ThemeProvider>
  )
}

export default Coininfo