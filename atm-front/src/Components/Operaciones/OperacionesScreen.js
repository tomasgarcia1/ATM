import React from 'react'
import { Button, Stack } from 'react-bootstrap'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { logout } from '../../Helpers/logout'
export const OperacionesScreen = () => {
    let history = useHistory();

    const goToBalance = () => {
        history.push("/balance")
    }
    const goToRetiro = () => {
        history.push("/retiro")
    }

    return (

        <Stack gap={2} className="col-md-5 mx-auto mt-5">
            <h1 className='text-center'>Bienvenido</h1>
            <span className='text-center'>Seleccione una opción.</span>
            <Button
                variant="primary"
                onClick={goToBalance}
            >
                Balance
            </Button>
            <Button
                variant="success"
                onClick={goToRetiro}
            >
                Retiro
            </Button>
            <Button
                variant="danger"
                onClick={logout}
            >
                Salir
            </Button>
        </Stack>



    )
}
