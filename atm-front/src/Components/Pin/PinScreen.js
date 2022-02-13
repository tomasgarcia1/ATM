import React, { useState } from 'react'
import { Button, Form, Row, Stack } from 'react-bootstrap'
import { useHistory } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { Buttons } from '../Index/Buttons'

export const PinScreen = () => {

    const location = useLocation();
    const numero = location.state.numero;
    let history = useHistory();
    const [pin, setPin] = useState("");

    const handlePressButton = (num) => {
        if (pin.length < 4) {
            setPin(`${pin}${num}`);
        }
    }

    const cleanInputs = () => {
        setPin("");
    }

    const handleSubmit = () => {
        const url = process.env.REACT_APP_URL;
        fetch(`${url}/api/Tarjeta/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                numero,
                pin
            })
        })
            .then(res => {
                if (res.status === 500) {
                    throw new Error()
                }
                return res.json()
            })
            .then(({ result, message }) => {
                if (result) {
                    sessionStorage.setItem('token', message);
                    window.location.replace('/');
                } else {
                    history.push({
                        pathname: '/error',
                        state: { detail: message }
                    })
                }
            })
            .catch(error => {
                history.push({
                    pathname: '/error',
                    state: { detail: 'Error interno.' }
                })
            })
    }

    return (
        <>
            <Row className=' justify-content-md-center'>
                <Form className='mt-3 w-50'>
                    <Form.Group className="mb-3">
                        <Form.Label>PIN</Form.Label>
                        <Form.Control
                            type="text"
                            value={pin}
                            disabled
                        />
                        <Form.Text className="text-muted">
                            Ingrese un numero de 4 digitos
                        </Form.Text>
                    </Form.Group>
                </Form>
            </Row>
            <Buttons handlePressButton={handlePressButton} />
            <Stack gap={2} className="col-md-5 mx-auto">
                <Button
                    variant="primary"
                    type="submit"
                    onClick={handleSubmit}
                >
                    Aceptar
                </Button>
                <Button
                    variant="outline-secondary"
                    onClick={cleanInputs}
                >Limpiar</Button>
                <Button
                    variant="danger"
                    onClick={() => history.goBack()}
                >Salir</Button>
            </Stack>
        </>
    )
}
