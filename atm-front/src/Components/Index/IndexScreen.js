import React, { useState } from 'react'
import { Button, Form, Row, Stack } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { Buttons } from './Buttons';

export const IndexScreen = () => {
    let history = useHistory();
    const [numero, setNumero] = useState("")

    const handlePressButton = (num) => {
        if (numero.length < 19) {
            if (numero.length === 4 || numero.length === 9 || numero.length === 14) {
                setNumero(`${numero}-${num}`);
            } else {
                setNumero(`${numero}${num}`);
            }
        }
    }

    const cleanInputs = () => {
        setNumero("");
    }

    const handleSubmit = () => {
        const url = process.env.REACT_APP_URL;
        fetch(`${url}/api/Tarjeta?numero=${numero}`)
            .then(res => {
                if (res.status === 500) {
                    throw new Error()
                }
                return res.json()
            })
            .then(({ result ,message}) => {
                if (result) {
                    history.push({
                        pathname: '/pin',
                        state: { numero }
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
            })
    }


    return (
        <>
            <Row className=' justify-content-md-center'>
                <Form className='mt-3 w-50'>
                    <Form.Group className="mb-3">
                        <Form.Label>Numero de tarjeta</Form.Label>
                        <Form.Control
                            type="text"
                            value={numero}
                            disabled
                        />
                        <Form.Text className="text-muted">
                            Ingrese un numero de 16 digitos
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
            </Stack>
        </>
    )
}
