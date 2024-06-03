import React from "react";
import AsyncSelect from "react-select/async";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

function AsyncselectboxComponent({
  boxWidth,
  boxHeight,
  objData,
  handleChange,
}) {
  const mapResponseToValuesAndLabels = (data) => ({
    value: data.id,
    label: data.name,
  });
  async function callApi(value) {
    if (value) {
      const data = await fetch(
        // `https://jsonplaceholder.typicode.com/users?q=${value}`
        `${objData?.asyncUrl}?q=${value}`
      )
        .then((response) => response.json())
        .then((response) => response.map(mapResponseToValuesAndLabels))
        .then((final) =>
          final.filter((i) =>
            i.label.toLowerCase().includes(value.toLowerCase())
          )
        );
      return data;
    } else return [];
  }
  return (
    <>
      <Row className={objData?.fieldMargin ? `m-${objData?.fieldMargin}` : "m-2"}>
        <Col sm={objData?.labelWidth?.id ? objData?.labelWidth?.id : 4}>
          <Form.Label column>{objData?.caption}</Form.Label>
        </Col>
        <Col sm={objData?.fieldWidth?.id ? objData?.fieldWidth?.id : 8}>
          <AsyncSelect
            isClearable
            loadOptions={callApi}
            value={{ value: objData?.value.id, label: objData?.value.name }}
            onChange={(e) =>
              handleChange({ id: e?.value, name: e?.label }, objData?.uid)
            }
            placeholder="Select..."
          />
        </Col>
      </Row>
    </>
  );
}

export default AsyncselectboxComponent;
