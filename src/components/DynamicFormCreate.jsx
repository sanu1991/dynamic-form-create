import React from "react";
import Datagrid from "./Datagrid";
import Button from "react-bootstrap/Button";
import CustomPopupComponent from "./CustomPopupComponent";
import FormConfig from "./FormConfig";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import JSONpopupComponent from "./JSONpopupComponent";
import DynamicFormCreateFunc from "./formCreateComponent/DynamicFormCreateFunc";
import "bootstrap/dist/css/bootstrap.min.css";
const DynamicFormCreate = React.forwardRef(
  ({ formData, setFormData, activeCreateMode, saveNewData }, ref) => {
    const dgDataFlds = {
      id: 0,
      type: {},
      subType: {},
      caption: "",
      variable: "",
      asyncUrl: "",
      items: [],
      visibilityDependOn: {},
      visibilitySettings: [],
      value: "",
      // ----------
      labelWidth: {},
      fieldWidth: {},
      fieldMargin: "",
    };
    const formConfigFlds = {
      id: 0,
      formHeight: "100vh",
      columnNo: 2,
      marginTop: 20,
      marginBottom: 20,
      marginLeft: 20,
      marginRight: 20,
    };
    // -----------------------------------------------------------------
    const [formConfig, setFormConfig] = React.useState({ ...formConfigFlds });
    const [selectedRow, setSelectedRow] = React.useState({});
    const [listOfEleNames, setListOfEleNames] = React.useState([]);
    const [visibilitySettingsData, setVisibilitySettingsData] = React.useState(
      []
    );
    const [selectBoxData, setSelectBoxData] = React.useState("");
    const [guideModalShow, setGuideModalShow] = React.useState(false);
    const [JSONPreviewModalShow, setJSONPreviewModalShow] =
      React.useState(false);
    const [previewModalShow, setPreviewModalShow] = React.useState(false);
    const [itemsCreateModalShow, setItemsCreateModalShow] =
      React.useState(false);
    const [visibilitySettingsModalShow, setVisibilitySettingsModalShow] =
      React.useState(false);
    const [othersSettingsModalShow, setOthersSettingsModalShow] =
      React.useState(false);

    const typeData = [
      { id: 1, name: "select" },
      { id: 2, name: "asyncSelect" },
      { id: 3, name: "number" },
      { id: 4, name: "date" },
      { id: 5, name: "boolean" },
      { id: 6, name: "string" },
      { id: 7, name: "blank" },
    ];
    const subtypeData = [
      { id: 1, name: "checkbox" },
      { id: 2, name: "radio" },
      { id: 3, name: "switch" },
    ];
    const labelWidthData = [
      { id: 1, name: "0%", fieldId: 11, fieldName: "100%" },
      { id: 2, name: "10%", fieldId: 10, fieldName: "90%" },
      { id: 3, name: "20%", fieldId: 9, fieldName: "80%" },
      { id: 4, name: "30%", fieldId: 8, fieldName: "70%" },
      { id: 5, name: "40%", fieldId: 7, fieldName: "60%" },
      { id: 6, name: "50%", fieldId: 6, fieldName: "50%" },
      { id: 7, name: "60%", fieldId: 5, fieldName: "40%" },
      { id: 8, name: "70%", fieldId: 4, fieldName: "30%" },
      { id: 9, name: "80%", fieldId: 3, fieldName: "20%" },
      { id: 10, name: "90%", fieldId: 2, fieldName: "10%" },
      { id: 11, name: "100%", fieldId: 1, fieldName: "0%" },
    ];
    // send states to parent
    React.useImperativeHandle(ref, () => ({
      formConfigData: () => {
        return formConfig;
      },
    }));

    return (
      <div style={{ padding: "0px 10px" }}>
        {!activeCreateMode ? (
          <DynamicFormCreateFunc
            dataFromApi={formData}
            setDataFromApi={setFormData}
            formConfig={formConfig}
            setFormConfig={setFormConfig}
          />
        ) : previewModalShow ? (
          <div style={{ padding: "30px 10px" }}>
            <Row className="my-2">
              <Col sm={8}>
                <Button
                  size="sm"
                  onClick={() => {
                    setPreviewModalShow(false);
                  }}
                >
                  Back
                </Button>
              </Col>
              <Col sm={4} className="text-end">
                <span>
                  <Button
                    size="sm"
                    className="mx-1"
                    onClick={() => setJSONPreviewModalShow(true)}
                  >
                    JSON Preview
                  </Button>
                </span>
              </Col>
            </Row>
            <DynamicFormCreateFunc
              dataFromApi={formData}
              setDataFromApi={setFormData}
              formConfig={formConfig}
              setFormConfig={setFormConfig}
            />
            <JSONpopupComponent
              formData={formData}
              setFormData={setFormData}
              JSONPreviewModalShow={JSONPreviewModalShow}
              setJSONPreviewModalShow={setJSONPreviewModalShow}
            />
          </div>
        ) : (
          <>
            <Row className="my-2">
              <Col sm={4}></Col>
              <Col sm={4} className="text-center">
                <span>
                  <b style={{ fontFamily: "sans-serif" }}>
                    Create Dynamic Form
                  </b>
                </span>
              </Col>
              <Col sm={4} className="text-end">
                <span>
                  <Button
                    variant="success"
                    size="sm"
                    className="mx-1"
                    onClick={() => saveNewData()}
                  >
                    SAVE
                  </Button>
                </span>
                <span>
                  <Button
                    size="sm"
                    className="mx-1"
                    onClick={() => setPreviewModalShow(true)}
                  >
                    Preview
                  </Button>
                </span>
                <span>
                  <Button
                    size="sm"
                    className="mx-1"
                    onClick={() => setGuideModalShow(true)}
                  >
                    User Guide
                  </Button>
                </span>
              </Col>
            </Row>
            <FormConfig formConfig={formConfig} setFormConfig={setFormConfig} />
            <Datagrid
              dgDataFlds={dgDataFlds}
              typeData={typeData}
              subtypeData={subtypeData}
              labelWidthData={labelWidthData}
              formData={formData}
              setFormData={setFormData}
              selectedRow={selectedRow}
              setSelectedRow={setSelectedRow}
              selectBoxData={selectBoxData}
              setSelectBoxData={setSelectBoxData}
              visibilitySettingsModalShow={visibilitySettingsModalShow}
              setVisibilitySettingsModalShow={setVisibilitySettingsModalShow}
              itemsCreateModalShow={itemsCreateModalShow}
              setItemsCreateModalShow={setItemsCreateModalShow}
              listOfEleNames={listOfEleNames}
              setListOfEleNames={setListOfEleNames}
              visibilitySettingsData={visibilitySettingsData}
              setVisibilitySettingsData={setVisibilitySettingsData}
              othersSettingsModalShow={othersSettingsModalShow}
              setOthersSettingsModalShow={setOthersSettingsModalShow}
              previewModalShow={previewModalShow}
              setPreviewModalShow={setPreviewModalShow}
            />
            <CustomPopupComponent
              formData={formData}
              subtypeData={subtypeData}
              labelWidthData={labelWidthData}
              setFormData={setFormData}
              selectedRow={selectedRow}
              setSelectedRow={setSelectedRow}
              selectBoxData={selectBoxData}
              setSelectBoxData={setSelectBoxData}
              guideModalShow={guideModalShow}
              setGuideModalShow={setGuideModalShow}
              visibilitySettingsModalShow={visibilitySettingsModalShow}
              setVisibilitySettingsModalShow={setVisibilitySettingsModalShow}
              itemsCreateModalShow={itemsCreateModalShow}
              setItemsCreateModalShow={setItemsCreateModalShow}
              listOfEleNames={listOfEleNames}
              setListOfEleNames={setListOfEleNames}
              visibilitySettingsData={visibilitySettingsData}
              setVisibilitySettingsData={setVisibilitySettingsData}
              othersSettingsModalShow={othersSettingsModalShow}
              setOthersSettingsModalShow={setOthersSettingsModalShow}
              JSONPreviewModalShow={JSONPreviewModalShow}
              setJSONPreviewModalShow={setJSONPreviewModalShow}
            />
          </>
        )}
      </div>
    );
  }
);
export default DynamicFormCreate;
