import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { MdClear } from "react-icons/md";
import { Editor } from "@monaco-editor/react";

function JSONpopupComponent({
  formData,
  setFormData,
  JSONPreviewModalShow,
  setJSONPreviewModalShow,
}) {
  const [jsonData, setjsonData] = React.useState("");
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
        position: JSONPreviewModalShow ? "fixed" : "",
        top: 0,
        left: 0,
        backgroundColor: "rgba(97, 97, 97, 0.3)",
      }}
    >
      <div
        style={{
          display: JSONPreviewModalShow ? "block" : "none",
          backgroundColor: "white",
          zIndex: 9,
          border: "1px solid #f7f7f7",
          width: JSONPreviewModalShow ? "100%" : "40vw",
          height: JSONPreviewModalShow ? "100vh" : "auto",
        }}
      >
        {/* popup header  */}
        <Row className="m-2">
          <Col sm={8}></Col>
          <Col sm={4} className="text-end">
            {jsonData && (
              <span>
                <Button
                  size="sm"
                  className="mx-1"
                  onClick={() => {
                    setFormData(JSON.parse(jsonData));
                    // addToIndexDb();
                    setjsonData("");
                  }}
                >
                  Save
                </Button>
              </span>
            )}
            <span
              className="mx-1"
              onClick={() => {
                setJSONPreviewModalShow(false);
              }}
            >
              <MdClear color="red" fontSize="1.2em" />
            </span>
          </Col>
        </Row>
        <hr style={{ margin: "0px" }} />
        {/* popup body  */}
        <Editor
          defaultLanguage="json"
          height="100%"
          value={JSON.stringify(formData, null, 4)}
          onChange={(e) => setjsonData(e)}
        />
      </div>
    </div>
  );
}

export default JSONpopupComponent;
