import React from 'react'
import { Button, Stack } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { logout } from '../../Helpers/logout';

export const ReporteScreen = () => {
    const location = useLocation();
    let history = useHistory();
    const reporte = location.state.reporte;
    return (
        <Stack gap={2} className="col-md-8 mx-auto mt-5">
            <h2>Fecha y Hora: <span className="badge bg-secondary">{reporte.fecha}</span></h2>
            <h2>Monto retirado <span className="badge bg-secondary">${reporte.monto}</span></h2>
            <h2>Balance actual <span className="badge bg-secondary">${reporte.balance}</span></h2>

            <Button
                variant="primary"
                type="submit"
                onClick={() => history.push("/")}
            >
                Atras
            </Button>

            <Button
                variant="danger"
                onClick={logout}
            >Salir</Button>
        </Stack>
    )
}
