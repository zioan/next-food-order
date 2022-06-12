import { useState, useEffect } from 'react';

function SuccessMessage({ successHandler, message }) {
  const [showSuccessMessage, setShowSuccessMessage] = useState(successHandler);

  useEffect(() => {
    // After 3 seconds hide success message
    const timeId = setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);

    return () => {
      clearTimeout(timeId);
    };
  }, [showSuccessMessage]);

  return (
    <>{showSuccessMessage && <p className=' text-red-500'>{message}</p>}</>
  );
}

export default SuccessMessage;
