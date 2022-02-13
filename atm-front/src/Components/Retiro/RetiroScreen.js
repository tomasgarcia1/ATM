import React, { useState } from 'react'
import { Button, Form, Row, Stack } from 'react-bootstrap'
import { useHistory } from 'react-router-dom';
import { logout } from '../../Helpers/logout';
import { Buttons } from '../Index/Buttons'


export const RetiroScreen = () => {
    const [importe, setImporte] = useState("");
    let history = useHistory();
    const handlePressButton = (num) => {
        setImporte(`${importe}${num}`);
    }

    const cleanInputs = () => {
        setImporte("");
    }

    const handleSubmit = () => {
        const url = process.env.REACT_APP_URL;
        var form = new FormData();
        form.append("monto", importe);
        fetch(`${url}/api/Tarjeta/withdraw`,
            {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                },
                body: form,
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
            .then(({ reporte, result, message, status }) => {
                if (result) {
                    history.push({
                        pathname: '/reporte',
                        state: { reporte }
                    })
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
            });
    }
    return (
        <>
            <Row className='justify-content-md-center'>
                <Form className='mt-3 w-50'>
                    <Form.Group className="mb-3">
                        <Form.Label>Importe</Form.Label>
                        <Form.Control
                            type="text"
                            value={importe}
                            disabled
                        />
                        <Form.Text className="text-muted">
                            Ingrese el importe a retirar.
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

