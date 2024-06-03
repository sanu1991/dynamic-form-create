import React from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

function TextNumberDateBoxComponent({ objData, handleChange }) {
  return (
    <>
      {objData?.type?.name === "blank" ? (
        <Row className="m-2">
          <Col sm={12}></Col>
        </Row>
      ) : (
        <Row className="m-2">
          <Col sm={4}>
            <Form.Label column>{objData?.caption}</Form.Label>
          </Col>
          <Col sm={8}>
            <Form.Control
              placeholder=""
              type={
                objData?.type?.name === "string"
                  ? "text"
                  : objData?.type?.name === "number"
                  ? "number"
                  : objData?.type?.name === "date"
                  ? "date"
                  : ""
              }
              value={objData?.value}
              onChange={(e) => handleChange(e?.target?.value, objData?.uid)}
            />
          </Col>
        </Row>
      )}
    </>
  );
}

export default TextNumberDateBoxComponent;
