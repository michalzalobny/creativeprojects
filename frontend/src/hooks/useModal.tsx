import React, { useState } from 'react';

const useModal = () => {
  const [show, setShow] = useState(false);

  const toggle = React.useCallback(() => {
    setShow(!show);
  }, [show]);

  return {
    show,
    toggle,
  };
};

export default useModal;
