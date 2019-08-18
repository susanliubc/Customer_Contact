import React, { useContext } from 'react';
import AlertContext from '../../context/alert/AlertContext';

const Alert = () => {
  const alertContext = useContext(AlertContext);

  const { setAlert, alerts } = alertContext;
  return (
    alerts.length > 0 &&
    alerts.map(alert => (
      <div key={alert.id} className={`alert alert-${alert.type}`}>
        i.fas.
        <i class='fa fa-circle' />
        {alert.msg}
      </div>
    ))
  );
};

export default Alert;
