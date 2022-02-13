import React from 'react'
import { Alert, Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

export const ErrorScreen = () => {
  const location = useLocation();
  const error = location.state.detail;
  let history = useHistory();
  
  return (
    <Alert variant="danger" className='mt-3' >
      <Alert.Heading>Error</Alert.Heading>
      <p>
        {error}
      </p>
      <hr />
      <div className="d-flex justify-content-end">
        <Button onClick={() => history.goBack()} variant="outline-secondary">
         Atras
        </Button>
      </div>
    </Alert>
  )
}
