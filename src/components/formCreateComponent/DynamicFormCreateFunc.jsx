/* eslint-disable react/display-name */
/* eslint-disable no-unused-vars */
import React from "react";
import CheckboxComponent from "./CheckboxComponent";
import AsyncselectboxComponent from "./AsyncselectboxComponent";
import SelectboxComponent from "./SelectboxComponent";
import { v4 as uuidv4 } from "uuid";
import TextNumberDateBoxComponent from "./TextNumberDateBoxComponent";

const DynamicFormCreateFunc = ({
  dataFromApi,
  setDataFromApi,
  formConfig,
  setFormConfig,
  URI,
  visibilityControlFromOutside,
  visibilityvalue,
}) => {
  const [renderData, setRenderData] = React.useState([]);

  const handleChange = (value, id) => {
    setDataFromApi((pre) =>
      pre.map((itm) => (itm?.uid === id ? { ...itm, value: value } : itm))
    );
  };

  React.useEffect(() => {
    dataFromApi.map(
      (dfa) => !dfa?.uid && Object.assign(dfa, { uid: uuidv4() })
    );
    const filtereddata = [];
    dataFromApi?.forEach((dfa1) => {
      if (Object.keys(dfa1?.visibilityDependOn).length === 0) {
        filtereddata.push(dfa1);
      } else {
        dataFromApi?.forEach((dfa2) => {
          if (
            dfa2?.variable === dfa1?.visibilityDependOn?.variable &&
            (typeof dfa2?.value == "string" || typeof dfa2?.value == "number"
              ? dfa2?.value == dfa1?.visibilityDependOn?.value
              : dfa2?.value?.id == dfa1?.visibilityDependOn?.value)
          ) {
            filtereddata.push(dfa1);
          }
        });
      }
    });
    // console.log(filtereddata);
    setRenderData([...filtereddata]);
  }, [dataFromApi]);

  // React.useEffect(() => {
  //   dataFromApi.map(
  //     (dfa) => !dfa?.uid && Object.assign(dfa, { uid: uuidv4() })
  //   );
  //   const innerVisibilityvalue = [];
  //   dataFromApi.map((ida) => {
  //     if (ida?.type?.name === "select" && Object.keys(ida.value).length) {
  //       innerVisibilityvalue.push(ida.value);
  //     }
  //   });
  //   console.log(innerVisibilityvalue);
  //   // -------------------------------//
  //   const filtereddata = dataFromApi?.filter(
  //     (iad) =>
  //       (iad?.visibilitySettings || []).find((vs) =>
  //         (innerVisibilityvalue || []).find(
  //           (vv) => vv?.id == vs?.id && vv?.name == vs?.name
  //         )
  //       ) || !(iad?.visibilitySettings || []).length
  //   );
  //   console.log(filtereddata);
  //   //------------------------------- //
  //   // const chkboxDependentData = [];
  //   // filtereddata.map((fd) => {
  //   //   if (
  //   //     fd?.visibilitySettings.length === 0 &&
  //   //     Object.keys(fd?.visibilityDependOn).length > 0
  //   //   ) {
  //   //     filtereddata.map((fd1) => {
  //   //       if (
  //   //         fd1?.variable === fd?.visibilityDependOn?.name &&
  //   //         fd1?.value == 1
  //   //       ) {
  //   //         chkboxDependentData.push(fd);
  //   //       }
  //   //     });
  //   //   } else {
  //   //     chkboxDependentData.push(fd);
  //   //   }
  //   // });
  //   // setRenderData([...chkboxDependentData]);
  //   setRenderData([...filtereddata]);
  // }, [dataFromApi]);

  return (
    <div
      style={{
        width: "100%",
        marginTop: `${formConfig?.marginTop}px`,
        marginBottom: `${formConfig?.marginBottom}px`,
        marginLeft: `${formConfig?.marginLeft}px`,
        marginRight: `${formConfig?.marginRight}px`,
        height: formConfig?.formHeight,
        overflowX: "hidden",
        overflowY: "scroll",
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        {renderData?.map((objData, i) => (
          <div key={i} style={{ width: `calc(100%/${formConfig?.columnNo})` }}>
            {objData?.type?.name === "boolean" ? (
              <CheckboxComponent
                type={objData?.subType?.name}
                objData={objData}
                handleChange={handleChange}
              />
            ) : objData?.type?.name === "blank" ||
              objData?.type?.name === "string" ||
              objData?.type?.name === "number" ||
              objData?.type?.name === "date" ? (
              <TextNumberDateBoxComponent
                objData={objData}
                handleChange={handleChange}
              />
            ) : objData?.type?.name === "asyncSelect" ? (
              <AsyncselectboxComponent
                objData={objData}
                handleChange={handleChange}
              />
            ) : objData?.type?.name === "select" ? (
              <SelectboxComponent
                objData={objData}
                handleChange={handleChange}
              />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DynamicFormCreateFunc;
