import React from "react";
import { MdAdd, MdClear } from "react-icons/md";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import InputGroup from "react-bootstrap/InputGroup";
import Select from "react-select";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const CustomPopupComponent = ({
  formData,
  subtypeData,
  labelWidthData,
  setFormData,
  selectedRow,
  setSelectedRow,
  selectBoxData,
  setSelectBoxData,
  guideModalShow,
  setGuideModalShow,
  visibilitySettingsModalShow,
  setVisibilitySettingsModalShow,
  itemsCreateModalShow,
  setItemsCreateModalShow,
  listOfEleNames,
  setListOfEleNames,
  visibilitySettingsData,
  setVisibilitySettingsData,
  othersSettingsModalShow,
  setOthersSettingsModalShow,
}) => {
  const dltItemsData = (itemIdForDlt) => {
    setFormData((pre) =>
      pre.map((itm) =>
        itm?.id === selectedRow?.id
          ? {
              ...itm,
              items: itm.items
                .filter((obj) => obj?.id !== itemIdForDlt)
                .map((mapobj, i) => ({
                  id: i + 1,
                  name: mapobj?.name,
                })),
            }
          : itm
      )
    );
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
        position:
          guideModalShow ||
          itemsCreateModalShow ||
          visibilitySettingsModalShow ||
          othersSettingsModalShow
            ? "fixed"
            : "",
        top: 0,
        left: 0,
        backgroundColor: "rgba(97, 97, 97, 0.3)",
      }}
    >
      <div
        style={{
          display:
            guideModalShow ||
            itemsCreateModalShow ||
            visibilitySettingsModalShow ||
            othersSettingsModalShow
              ? "block"
              : "none",
          backgroundColor: "white",
          zIndex: 9,
          border: "1px solid #f7f7f7",
          width: "40vw",
          height: "auto",
          borderRadius: "10px",
        }}
      >
        {/* popup header  */}
        <div style={{ display: "flex", width: "100%", padding: "10px" }}>
          <span style={{ width: "90%" }} className="text-start">
            {itemsCreateModalShow && (
              <InputGroup>
                <Form.Control
                  size="sm"
                  type="text"
                  value={selectBoxData}
                  onChange={(e) => setSelectBoxData(e?.target?.value)}
                />
                <Button
                  size="sm"
                  onClick={() => {
                    setFormData((pre) =>
                      pre.map((itm) =>
                        itm?.id === selectedRow?.id
                          ? {
                              ...itm,
                              items: [
                                ...itm.items,
                                {
                                  id: itm.items.length + 1,
                                  name: selectBoxData,
                                },
                              ],
                            }
                          : itm
                      )
                    );
                    setSelectBoxData("");
                  }}
                >
                  Add
                </Button>
              </InputGroup>
            )}
            {visibilitySettingsModalShow && (
              <h6>Create Visible Dependency Data</h6>
            )}
            {othersSettingsModalShow && <h6>Set Other Settings</h6>}
            {guideModalShow && <h6>User Guide Step By Step</h6>}
          </span>
          <span
            style={{ width: "10%" }}
            className="text-end"
            onClick={() => {
              setGuideModalShow(false);
              setItemsCreateModalShow(false);
              setVisibilitySettingsModalShow(false);
              setOthersSettingsModalShow(false);
              setSelectBoxData("");
              setSelectedRow({});
            }}
          >
            <MdClear color="red" fontSize="1.2em" />
          </span>
        </div>
        <hr style={{ margin: "0px" }} />
        {/* popup body  */}
        <div
          style={{
            padding: "10px",
            maxHeight: "300px",
            overflowY: "scroll",
            overflowX: "hidden",
          }}
        >
          {visibilitySettingsModalShow && (
            <>
              <span>Select Element Name</span>
              <Select
                className="m-0"
                isClearable
                closeMenuOnSelect
                openMenuOnFocus
                options={listOfEleNames.map((loe) => ({
                  value: loe?.id,
                  label: loe?.name,
                }))}
                value={{
                  value: formData.find((dd) => dd.id === selectedRow?.id)
                    ?.visibilityDependOn?.variable,
                  label: formData.find((dd) => dd.id === selectedRow?.id)
                    ?.visibilityDependOn?.variable,
                }}
                onChange={(e) => {
                  setFormData((pre) =>
                    pre.map((itm) =>
                      itm?.id === selectedRow?.id
                        ? {
                            ...itm,
                            visibilityDependOn: {
                              ...itm.visibilityDependOn,
                              variable: e?.value,
                            },
                          }
                        : itm
                    )
                  );
                  // setVisibilitySettingsData(
                  //   formData.find((dd) => dd.variable === e?.label).items
                  // );
                }}
              />
              <p></p>
              <span>Enter Value</span>
              <Form.Control
                placeholder=""
                type="string"
                value={
                  formData.find((dd) => dd.id === selectedRow?.id)
                    ?.visibilityDependOn?.value
                }
                onChange={(e) => {
                  setFormData((pre) =>
                    pre.map((itm) =>
                      itm?.id === selectedRow?.id
                        ? {
                            ...itm,
                            visibilityDependOn: {
                              ...itm.visibilityDependOn,
                              value: e?.target?.value,
                            },
                          }
                        : itm
                    )
                  );
                }}
              />
              {/* <span>Select Value</span>
              <Select
                className="m-0"
                isClearable
                isMulti
                closeMenuOnSelect
                openMenuOnFocus
                options={visibilitySettingsData.map((loe) => ({
                  value: loe?.id,
                  label: loe?.name,
                }))}
                value={formData
                  .find((dd) => dd.id === selectedRow?.id)
                  ?.visibilitySettings.map((obj) => ({
                    value: obj?.id,
                    label: obj?.name,
                  }))}
                onChange={(e) => {
                  setFormData((pre) =>
                    pre.map((itm) =>
                      itm?.id === selectedRow?.id
                        ? {
                            ...itm,
                            visibilitySettings: [
                              ...e.map((obj) => ({
                                id: obj?.value,
                                name: obj?.label,
                              })),
                            ],
                          }
                        : itm
                    )
                  );
                }}
              /> */}
            </>
          )}
          {itemsCreateModalShow && (
            <Table striped bordered hover>
              <tbody>
                {formData.map(
                  (dd) =>
                    dd.id === selectedRow?.id &&
                    dd?.items.map((itm, index) => (
                      <tr key={index}>
                        <td style={{ width: "20%" }}>{itm?.id}</td>
                        <td style={{ width: "80%" }}>{itm?.name}</td>
                        <td>
                          <MdClear onClick={() => dltItemsData(itm?.id)} />
                        </td>
                      </tr>
                    ))
                )}
              </tbody>
            </Table>
          )}
          {othersSettingsModalShow && (
            <>
              <Row className="mb-2">
                <Col sm={6}>
                  <Form.Label column>Select Label Width</Form.Label>
                </Col>
                <Col sm={6}>
                  <Select
                    className="m-0"
                    isClearable
                    closeMenuOnSelect
                    openMenuOnFocus
                    options={labelWidthData.map((loe) => ({
                      value: loe?.id,
                      label: loe?.name,
                      fieldvalue: loe?.fieldId,
                      fieldlabel: loe?.fieldName,
                    }))}
                    value={{
                      value: formData.find((dd) => dd.id === selectedRow?.id)
                        ?.labelWidth?.id,
                      label: formData.find((dd) => dd.id === selectedRow?.id)
                        ?.labelWidth?.name,
                    }}
                    onChange={(e) => {
                      setFormData((pre) =>
                        pre.map((itm) =>
                          itm?.id === selectedRow?.id
                            ? {
                                ...itm,
                                labelWidth: {
                                  id: e?.value,
                                  name: e?.label,
                                },
                                fieldWidth: {
                                  id: e?.fieldvalue,
                                  name: e?.fieldlabel,
                                },
                              }
                            : itm
                        )
                      );
                    }}
                  />
                </Col>
              </Row>
              <Row className="mb-2">
                <Col sm={6}>
                  <Form.Label column>Field Width</Form.Label>
                </Col>
                <Col sm={6}>
                  <Select
                    isDisabled
                    className="m-0"
                    isClearable
                    closeMenuOnSelect
                    openMenuOnFocus
                    options={labelWidthData.map((loe) => ({
                      value: loe?.id,
                      label: loe?.name,
                    }))}
                    value={{
                      value: formData.find((dd) => dd.id === selectedRow?.id)
                        ?.fieldWidth?.id,
                      label: formData.find((dd) => dd.id === selectedRow?.id)
                        ?.fieldWidth?.name,
                    }}
                  />
                </Col>
              </Row>
              <Row className="mb-2">
                <Col sm={8}>
                  <Form.Label column>
                    Vertical gape between two fields
                  </Form.Label>
                </Col>
                <Col sm={4}>
                  <Form.Control
                    max={5}
                    min={0}
                    type="number"
                    value={
                      formData.find((dd) => dd.id === selectedRow?.id)
                        ?.fieldMargin
                    }
                    onChange={(e) =>
                      setFormData((pre) =>
                        pre.map((itm) =>
                          itm?.id === selectedRow?.id
                            ? {
                                ...itm,
                                fieldMargin: e?.target?.value,
                              }
                            : itm
                        )
                      )
                    }
                  />
                </Col>
              </Row>
            </>
          )}
          {guideModalShow && (
            <>
              <p>
                1. By this component you can ctreate fields like 'Textbox',
                'Numberbox', 'Checkbox', 'Datebox', 'Selectbox',
                'AsyncSelectbox' as many as you wants and can handle visibilty
                of fields depends on other fields.
              </p>
              <p>
                2. Change Form Height, No. of fields in a single row, fields
                positon- from the top fields.
              </p>
              <p>
                3. Click on
                <MdAdd color="green" fontSize="1em" />
                to start creating fields.
              </p>
              <p>4. Select fields Type from 'Type' Selecbox of datagrid.</p>
              <p>
                5. After select 'Boolean' as field type, you can select 'Checkbox /
                Radiobox' from 'Sub Type'.
              </p>
              <p>6. Enter Field Label name.</p>
              <p>7. Enter Element Name of this field.</p>
              <p>
                8. If you select 'Selectbox', enter 'API' to get the data Or can
                create Selectbox data from 'Items'(click to open popup and
                create data).
              </p>
              <p>
                9. In the case of 'Asyncselect', just enter your 'API' to get the
                data.
              </p>
              <p>
                10. Visibily of field can handle from 'Visible' settings (Click to
                open popup, select 'element name' and 'value' from list for
                which field visibility depend).
              </p>
              <p>
                11. From 'Others' settings, you can change label-field width and
                gape between two fields.
              </p>
              <p>
                12. You can check preview by clicking 'Preview' button. Here you get
                'JSON preview' button to see the data you create, can change the
                data directly from here(Dont forget to 'save' the changes){" "}
              </p>
              <p>
                13. After complete, don't forget to click on 'SAVE' button to get
                data and 'activeCreateMode' props send as 'false' to view
                created forms directly.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomPopupComponent;
