import React from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

function CheckboxComponent({
  boxWidth,
  boxHeight,
  fieldHeight,
  type,
  objData,
  handleChange,
}) {
  return (
    <>
      <Row className="m-2">
        <Col sm={4}>
          <Form.Label>{objData?.caption}</Form.Label>
        </Col>
        <Col sm={8}>
          <Form.Check
            type={type}
            checked={objData?.value === "1" ? true : false}
            onChange={
              (e) => handleChange(e?.target?.checked === true ? "1" : "0", objData?.uid)
            }
          />
        </Col>
      </Row>
    </>
  );
}

export default CheckboxComponent;
