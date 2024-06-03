import React from "react";
import "./App.css";
import DynamicFormCreate from "./components/DynamicFormCreate";
import Form from "react-bootstrap/Form";

function App() {
  // const data = [
  //   {
  //     id: 1,
  //     type: {
  //       id: 5,
  //       name: "boolean",
  //     },
  //     subType: {
  //       id: 1,
  //       name: "checkbox",
  //     },
  //     caption: "Is Active",
  //     variable: "active",
  //     asyncUrl: "",
  //     items: [],
  //     visibilityDependOn: {},
  //     visibilitySettings: [],
  //     value: "1",
  //     labelWidth: {},
  //     fieldWidth: {},
  //     fieldMargin: "",
  //     uid: "fd4ec2bc-9be5-470a-a9e7-07c84fc43bc0",
  //   },
  //   {
  //     id: 2,
  //     type: {
  //       id: 6,
  //       name: "string",
  //     },
  //     subType: {},
  //     caption: "Name",
  //     variable: "name",
  //     asyncUrl: "",
  //     items: [],
  //     visibilityDependOn: { variable: "active", value: "0" },
  //     visibilitySettings: [],
  //     value: "Sanu",
  //     labelWidth: {},
  //     fieldWidth: {},
  //     fieldMargin: "",
  //     uid: "109c94f4-476d-4ce3-9b38-45295f70fcf9",
  //   },
  //   {
  //     id: 3,
  //     type: {
  //       id: 6,
  //       name: "string",
  //     },
  //     subType: {},
  //     caption: "Father Name",
  //     variable: "fathername",
  //     asyncUrl: "",
  //     items: [],
  //     visibilityDependOn: { variable: "active", value: "1" },
  //     visibilitySettings: [],
  //     value: "R N Pandab",
  //     labelWidth: {},
  //     fieldWidth: {},
  //     fieldMargin: "",
  //     uid: "109c94f4-476d-4ce3-9b38-45295f70fcf5",
  //   },
  //   {
  //     id: 4,
  //     type: {
  //       id: 1,
  //       name: "select",
  //     },
  //     subType: {},
  //     caption: "Adult",
  //     variable: "adult",
  //     asyncUrl: "",
  //     items: [
  //       { id: 1, name: "Yes" },
  //       { id: 2, name: "No" },
  //     ],
  //     visibilityDependOn: {},
  //     visibilitySettings: [],
  //     value: { id: 1, name: "Yes" },
  //     labelWidth: {},
  //     fieldWidth: {},
  //     fieldMargin: "",
  //     uid: "fd4ec2bc-9be5-470a-a9e7-07c84fc43bc11",
  //   },
  //   {
  //     id: 5,
  //     type: {
  //       id: 6,
  //       name: "string",
  //     },
  //     subType: {},
  //     caption: "Name1",
  //     variable: "name1",
  //     asyncUrl: "",
  //     items: [],
  //     visibilityDependOn: { variable: "adult", value: 1 },
  //     visibilitySettings: [],
  //     value: "",
  //     labelWidth: {},
  //     fieldWidth: {},
  //     fieldMargin: "",
  //     uid: "109c94f4-476d-4ce3-9b38-45295f70fcf12",
  //   },
  // ];

  const childCompRef = React.useRef(null);
  const [formData, setFormData] = React.useState([]);
  const [activeCreateMode, setactiveCreateMode] = React.useState(true);
  const saveNewData = () => {
    const formConfigData = childCompRef?.current?.formConfigData();
    console.log(formConfigData);
  };
  console.log(formData)

  return (
    <>
      <b
        style={{
          top: 0,
          position: "fixed",
          backgroundColor: "rgba(0,0,0,0.1)",
          borderRadius: "5px",
          padding: "5px",
        }}
      >
        <Form.Check
          checked={activeCreateMode}
          onChange={(e) => setactiveCreateMode(e.target?.checked)}
          type="checkbox"
          label="Active Create Mode"
        />
      </b>
      <DynamicFormCreate
        ref={childCompRef}
        formData={formData}
        setFormData={setFormData}
        activeCreateMode={activeCreateMode} // only for demo purpose
        saveNewData={() => saveNewData()}
      />
    </>
  );
}
export default App;
