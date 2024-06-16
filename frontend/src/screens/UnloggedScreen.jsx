import React from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const UnloggedScreen = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/signin");
  };

  return (
    <div>
      <Button variant="success" onClick={handleClick}>
        signIn to continue
      </Button>
    </div>
  );
};

export default UnloggedScreen;
