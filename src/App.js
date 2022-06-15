import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { makeStyles } from '@material-ui/core';
import Header from './components/Header';
import Coinpage from './pages/Coinpage';
import Homepage from './pages/Homepage';

function App() {
  const useStyles = makeStyles(() =>({
    App: {
      backgroundColor: "black",          // #14161a
      color: "white",
      minHeight: "100vh",

    }
  }));

  const classes = useStyles()
  return (
    <Router>
      <div className={classes.App}>
        <Header />
        <Routes>
          <Route exact path="/" element={<Homepage />} />
          <Route exact path="/coins/:id" element={<Coinpage />} />
        </Routes>
        
      </div>
    </Router>
  );
}

export default App;
