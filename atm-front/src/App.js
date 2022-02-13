import './App.css';
import { IndexScreen } from './Components/Index/IndexScreen';
import { Container } from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { ErrorScreen } from './Components/Error/ErrorScreen';
import { PinScreen } from './Components/Pin/PinScreen';
import { useEffect, useState } from 'react';
import { OperacionesScreen } from './Components/Operaciones/OperacionesScreen';
import { BalanceScreen } from './Components/Balance/BalanceScreen';
import { RetiroScreen } from './Components/Retiro/RetiroScreen';
import { ReporteScreen } from './Components/Reporte/ReporteScreen';

function App() {


  const [loading, setLoading] = useState(true);
  const [verified, setVerified] = useState(false)

  const checkToken = () => {
    const url = process.env.REACT_APP_URL;
    const token = sessionStorage.getItem('token');
    fetch(`${url}/api/tarjeta/validate`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(({ status }) => {
        if (status===200) {
          setLoading(false);
          setVerified(true);
        } else {
          setLoading(false);
          setVerified(false);;
        }
      })
      .catch(err => {
        setLoading(false);
        setVerified(false);;
      });
  }

  useEffect(() => {
    checkToken();
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  if (verified) {
    return (
      <Container className='w-50'>
        <Router>
          <div>
            <Switch>
              <Route exact path="/error" component={ErrorScreen} />
              <Route exact path="/balance" component={BalanceScreen} />
              <Route exact path="/retiro" component={RetiroScreen} />
              <Route exact path="/reporte" component={ReporteScreen} />
              <Route path="/" component={OperacionesScreen} />
              <Redirect to="/" />
            </Switch>
          </div>
        </Router>
      </Container>
    )
  }

  return (
    <Container className='w-50'>
      <Router>
        <div>
          <Switch>
            <Route exact path="/error" component={ErrorScreen} />
            <Route exact path="/pin" component={PinScreen} />
            <Route path="/" component={IndexScreen} />
            <Redirect to="/" />
          </Switch>
        </div>
      </Router>
    </Container>
  );
}

export default App;
