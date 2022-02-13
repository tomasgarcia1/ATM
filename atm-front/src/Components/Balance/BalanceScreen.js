import React, { useEffect, useState } from 'react'
import { Button, Stack } from 'react-bootstrap';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { logout } from '../../Helpers/logout';

export const BalanceScreen = () => {

    let history = useHistory();

    const [tarjeta, setTarjeta] = useState({
        numero: "",
        vencimiento: "",
        balance: ""
    })

    useEffect(() => {
        const getBalance = () => {
            const url = process.env.REACT_APP_URL;
            fetch(`${url}/api/Tarjeta/balance`,
                {
                    method: "GET",
                    headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` }
                })
                .then(res => {
                    if(res.status === 500){
                        throw new Error();
                    }
                    if (res.status === 401) {
                        logout()
                    } else {
                        return res.json()
                    }
                })
                .then(({ numero, vencimiento, balance }) => {
                    setTarjeta({ numero, vencimiento, balance });
                })
                .catch(error => {
                    history.push({
                        pathname: '/error',
                        state: { detail: 'Error interno.' }
                    })
                });
        }
        getBalance();
       
    }, [history])


    return (
        <>
        <Stack gap={2} className="col-md-12  mt-3">
            <h1>Balance:</h1>
            <h2>Numero de tarjeta <span className="badge bg-secondary">{tarjeta.numero}</span></h2>
            <h2>Vencimiento <span className="badge bg-secondary">{tarjeta.vencimiento}</span></h2>
            <h2>Balance <span className="badge bg-secondary">${tarjeta.balance}</span></h2>

           
        </Stack>
        <Stack  gap={2} className="col-md-5 mx-auto">
             <Button
                variant="primary"
                onClick={() => history.goBack()}
            >
                Atras
            </Button>
            <Button
                variant="danger"
                onClick={logout}
            >
                Salir
            </Button>
        </Stack>
        </>
    )
}
