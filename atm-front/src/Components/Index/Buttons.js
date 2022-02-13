import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'

export const Buttons = ({ handlePressButton }) => {

    const handleClick = (num) => {
        handlePressButton(num);
    }

    return (
        <Container className='w-50'>
            <Row className='mb-2   justify-content-center '>
                <Col className='text-center'>
                    <Button
                       variant="secondary"
                        size="lg"
                        onClick={() => handleClick(1)}
                    >
                        1
                    </Button>
                </Col>
                <Col className='text-center'>
                    <Button
                       variant="secondary"
                        size="lg"
                        onClick={() => handleClick(2)}
                    >
                        2
                    </Button>
                </Col>
                <Col className='text-center'>
                    <Button
                       variant="secondary"
                        size="lg"
                        onClick={() => handleClick(3)}
                    >
                        3
                    </Button>
                </Col>
            </Row>
            <Row className='mb-2'>
                <Col className='text-center'>
                    <Button
                       variant="secondary"
                        size="lg"
                        onClick={() => handleClick(4)}
                    >
                        4
                    </Button>
                </Col>
                <Col className='text-center'>
                    <Button
                       variant="secondary"
                        size="lg"
                        onClick={() => handleClick(5)}
                    >
                        5
                    </Button>
                </Col>
                <Col className='text-center'>
                    <Button
                       variant="secondary"
                        size="lg"
                        onClick={() => handleClick(6)}
                    >
                        6
                    </Button>
                </Col>
            </Row>
            <Row className='mb-2'>
                <Col className='text-center'>
                    <Button
                       variant="secondary"
                        size="lg"
                        onClick={() => handleClick(7)}
                    >
                        7
                    </Button>
                </Col >
                <Col className='text-center'>
                    <Button
                       variant="secondary"
                        size="lg"
                        onClick={() => handleClick(8)}
                    >
                        8
                    </Button>
                </Col>
                <Col className='text-center' >
                    <Button
                       variant="secondary"
                        size="lg"
                        onClick={() => handleClick(9)}
                    >
                        9
                    </Button>
                </Col>
            </Row>
            <Row className='mb-2'>
                <Col >

                </Col>
                <Col className='text-center'>
                    <Button
                       variant="secondary"
                        size="lg"
                        onClick={() => handleClick(0)}
                    >
                        0
                    </Button>
                </Col>
                <Col >

                </Col>
            </Row>
        </Container>
    )
}
