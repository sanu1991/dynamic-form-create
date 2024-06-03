import React from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";

function FormConfig({ formConfig, setFormConfig }) {
  const [isFormHeightAuto, setIsFormHeightAuto] = React.useState(true);
  const handleChange = (ele, value) =>
    setFormConfig((pre) => ({ ...pre, [ele]: value }));
  return (
    <div>
      <Row>
        <Col sm={2}>
          <Form.Group>
            <Form.Label>Form Height</Form.Label>
            <InputGroup className="mb-3">
              <Form.Control
                type="string"
                disabled={isFormHeightAuto}
                max={1000}
                min={1}
                value={formConfig?.formHeight}
                // value="50vh"
                onChange={(e) => handleChange("formHeight", e?.target?.value)}
              />
              <Button
                variant="outline-secondary"
                onClick={() => {
                  if (isFormHeightAuto) {
                    setIsFormHeightAuto(false);
                  } else {
                    setIsFormHeightAuto(true);
                    handleChange("formHeight", "auto");
                  }
                }}
              >
                {isFormHeightAuto ? "Change" : "Auto"}
              </Button>
            </InputGroup>
          </Form.Group>
        </Col>
        <Col sm={2}>
          <Form.Group>
            <Form.Label>Fields in a single row</Form.Label>
            <Form.Control
              type="number"
              max={10}
              min={1}
              value={formConfig?.columnNo}
              onChange={(e) => handleChange("columnNo", e?.target?.value)}
            />
          </Form.Group>
        </Col>
        <Col sm={2}>
          <Form.Group>
            <Form.Label>Gape From Top</Form.Label>
            <Form.Control
              type="number"
              max={50}
              min={1}
              value={formConfig?.marginTop}
              onChange={(e) => handleChange("marginTop", e?.target?.value)}
            />
          </Form.Group>
        </Col>
        <Col sm={2}>
          <Form.Group>
            <Form.Label>Gape From Bottom</Form.Label>
            <Form.Control
              type="number"
              max={50}
              min={1}
              value={formConfig?.marginBottom}
              onChange={(e) => handleChange("marginBottom", e?.target?.value)}
            />
          </Form.Group>
        </Col>
        <Col sm={2}>
          <Form.Group>
            <Form.Label>Gape From Left</Form.Label>
            <Form.Control
              type="number"
              max={50}
              min={1}
              value={formConfig?.marginLeft}
              onChange={(e) => handleChange("marginLeft", e?.target?.value)}
            />
          </Form.Group>
        </Col>
        <Col sm={2}>
          <Form.Group>
            <Form.Label>Gape From Right</Form.Label>
            <Form.Control
              type="number"
              max={50}
              min={1}
              value={formConfig?.marginRight}
              onChange={(e) => handleChange("marginRight", e?.target?.value)}
            />
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
}

export default FormConfig;
