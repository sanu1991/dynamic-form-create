/* eslint-disable no-unused-vars */
import React from "react";
import Select from "react-select";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

function SelectboxComponent({
  boxWidth,
  boxHeight,
  fieldHeight,
  objData,
  handleChange,
}) {
  const [selectdata, setSelectData] = React.useState([]);
  const apicall = () => {
    // fetch("https://jsonplaceholder.typicode.com/users")
    fetch(`${objData?.asyncUrl}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setSelectData(data);
      });
  };

  React.useEffect(() => {
    objData?.items.length > 0 ? setSelectData(objData?.items) : apicall();
  }, []);

  return (
    <>
      <Row className="m-2">
        <Col sm={4}>
          <Form.Label column>{objData?.caption}</Form.Label>
        </Col>
        <Col sm={8}>
          <Select
            isClearable
            options={selectdata.map((sd) => ({
              value: sd?.id,
              label: sd?.name,
            }))}
            value={{ value: objData?.value.id, label: objData?.value.name }}
            closeMenuOnSelect
            openMenuOnFocus
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

export default SelectboxComponent;
