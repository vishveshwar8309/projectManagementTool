import React from "react";
import { Button } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const UnloggedScreen = () => {
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);

  const handleClick = () => {
    navigate("/signin");
  };

  return (
    <div style={{ textAlign: "center", marginTop: "15%" }}>
      {userInfo ? (
        <Navigate to="/projectmanagementtool" />
      ) : (
        <Button variant="success" onClick={handleClick}>
          signIn to continue
        </Button>
      )}
    </div>
  );
};

export default UnloggedScreen;
