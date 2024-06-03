import React from "react";
import Table from "react-bootstrap/Table";
import Select from "react-select";
import Form from "react-bootstrap/Form";
import { MdAdd, MdClear } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { FaArrowsUpDown } from "react-icons/fa6";
import { MdSettings } from "react-icons/md";

const Datagrid = ({
  dgDataFlds,
  typeData,
  subtypeData,
  labelWidthData,
  formData,
  setFormData,
  selectedRow,
  setSelectedRow,
  selectBoxData,
  setSelectBoxData,
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
  previewModalShow,
  setPreviewModalShow,
}) => {
  const handleChange = (key, value, id) => {
    setFormData((pre) =>
      pre.map((itm) => (itm?.id === id ? { ...itm, [key]: value } : itm))
    );
  };

  // drag n drop
  const [dragEle, setDragEle] = React.useState({});
  var renderCount = 0;
  const onDragStart = (event, dragEle, dragEleIndex) => {
    renderCount = 0;
    event.dataTransfer.setData("dragEleIndex", dragEleIndex);
    setDragEle(dragEle);
  };
  const onDrop = (event, dropEleIndex) => {
    if (renderCount === 0) {
      renderCount++;
      let dragEleIndex = event.dataTransfer.getData("dragEleIndex");
      formData.splice(dragEleIndex, 1);
      formData.splice(dropEleIndex, 0, dragEle);
      setFormData([...formData]);
    }
  };

  return (
    <div>
      <Table size="sm">
        <thead>
          <tr style={{ fontFamily: "monospace" }} className="text-center">
            <td style={{ width: "1%", fontWeight: "bold" }}></td>
            <td style={{ width: "3%", fontWeight: "bold" }}>#</td>
            <td style={{ width: "12%", fontWeight: "bold" }}>Type</td>
            <td style={{ width: "10%", fontWeight: "bold" }}>Sub Type</td>
            <td style={{ width: "10%", fontWeight: "bold" }}>Label</td>
            <td style={{ width: "16%", fontWeight: "bold" }}>Element Name</td>
            <td style={{ width: "21%", fontWeight: "bold" }}>API</td>
            <td style={{ width: "5%", fontWeight: "bold" }}>Items</td>
            <td style={{ width: "5%", fontWeight: "bold" }}>Visible</td>
            <td style={{ width: "5%", fontWeight: "bold" }}>Others</td>
            <td style={{ width: "2%", fontWeight: "bold" }}>
              <MdAdd
                cursor="pointer"
                color="green"
                fontSize="1.5em"
                onClick={() =>
                  setFormData((pre) => [
                    ...pre,
                    { ...dgDataFlds, id: formData.length + 1 },
                  ])
                }
              />
            </td>
          </tr>
        </thead>
        <tbody>
          {formData.map((objData, index) => (
            <tr
              key={index}
              onDragOver={(ele) => ele.preventDefault()}
              onDrop={(event) => {
                onDrop(event, index);
              }}
            >
              <td
                style={{ cursor: "move" }}
                onDragStart={(event) => {
                  onDragStart(event, objData, index);
                }}
                draggable
                className="text-center pt-2"
              >
                <FaArrowsUpDown />
              </td>
              <td className="text-center pt-2">{index + 1}</td>
              <td>
                <Select
                  isClearable
                  options={typeData.map((sd) => ({
                    value: sd?.id,
                    label: sd?.name,
                  }))}
                  closeMenuOnSelect
                  openMenuOnFocus
                  placeholder="Select..."
                  value={{
                    value: objData?.type.id,
                    label: objData?.type.name,
                  }}
                  onChange={(e) => {
                    handleChange(
                      "type",
                      { id: e?.value, name: e?.label },
                      objData?.id
                    );
                    handleChange("subType", {}, objData?.id);
                  }}
                />
              </td>
              <td>
                {objData?.type?.name !== "blank" && (
                  <Select
                    isDisabled={
                      objData?.type?.name === "boolean" ? false : true
                    }
                    isClearable
                    closeMenuOnSelect
                    openMenuOnFocus
                    placeholder="Select Sub Type..."
                    options={subtypeData.map((std) => ({
                      value: std?.id,
                      label: std?.name,
                    }))}
                    value={{
                      value: objData?.subType.id,
                      label: objData?.subType.name,
                    }}
                    onChange={(e) => {
                      handleChange(
                        "subType",
                        { id: e?.value, name: e?.label },
                        objData?.id
                      );
                    }}
                  />
                )}
              </td>
              <td>
                {objData?.type?.name !== "blank" && (
                  <Form.Control
                    type="text"
                    value={objData?.caption}
                    onChange={(e) =>
                      handleChange("caption", e?.target?.value, objData?.id)
                    }
                  />
                )}
              </td>
              <td>
                {objData?.type?.name !== "blank" && (
                  <Form.Control
                    type="text"
                    value={objData?.variable}
                    onChange={(e) =>
                      handleChange("variable", e?.target?.value, objData?.id)
                    }
                  />
                )}
              </td>
              <td>
                {objData?.type?.name !== "blank" && (
                  <Form.Control
                    disabled={
                      objData?.type?.name === "select" ||
                      objData?.type?.name === "asyncSelect"
                        ? false
                        : true
                    }
                    readOnly={objData?.items.length}
                    type="text"
                    value={objData?.asyncUrl}
                    onChange={(e) =>
                      handleChange("asyncUrl", e?.target?.value, objData?.id)
                    }
                  />
                )}
              </td>
              <td className="text-center pt-2">
                {objData?.type?.name !== "blank" && (
                  //   <Button variant="light">
                  <FaEdit
                    cursor="pointer"
                    color="blue"
                    fontSize="1.2em"
                    onClick={() => {
                      if (
                        objData?.type?.name === "select" ||
                        objData?.type?.name === "asyncSelect"
                      )
                        if (!objData?.asyncUrl) {
                          setItemsCreateModalShow(true);
                          setSelectedRow(objData);
                        }
                    }}
                  />
                  //   </Button>
                )}
              </td>
              <td className="text-center pt-2">
                {objData?.type?.name !== "blank" && (
                  <MdSettings
                    cursor="pointer"
                    color="blue"
                    fontSize="1.5em"
                    onClick={() => {
                      setVisibilitySettingsModalShow(true);
                      setSelectedRow(objData);
                      setListOfEleNames(
                        formData
                          .filter((dd) => dd?.id !== objData?.id)
                          .map((mapObj, index) => ({
                            id: mapObj?.variable,
                            name: mapObj?.variable,
                          }))
                      );
                    }}
                  />
                )}
              </td>
              <td className="text-center pt-2">
                {objData?.type?.name !== "blank" && (
                  <MdSettings
                    cursor="pointer"
                    color="blue"
                    fontSize="1.5em"
                    onClick={() => {
                      setOthersSettingsModalShow(true);
                      setSelectedRow(objData);
                    }}
                  />
                )}
              </td>
              <td className="text-center pt-2">
                <MdClear
                  cursor="pointer"
                  color="red"
                  fontSize="1.2em"
                  onClick={() => {
                    setFormData((pre) =>
                      pre
                        .filter((dd) => dd.id !== objData?.id)
                        .map((obj, index) => ({ ...obj, id: index + 1 }))
                    );
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Datagrid;
