import React, { Component } from "react";
import { convertToRaw, convertFromRaw, EditorState, Editor } from "draft-js";
import { convertToHTML, convertFromHTML } from "draft-convert";
import {
  AiFillHtml5,
  AiFillFileText,
  AiTwotoneReconciliation,
  AiOutlineHistory,
} from "react-icons/ai";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editorState: EditorState.createEmpty(),
    };
  }

  onChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  exportHTML = () => {
    this.setState({
      convertedContent: convertToHTML(
        this.state.editorState.getCurrentContent()
      ),
    });
  };

  updateHTML = (e) => {
    e.preventDefault();
    this.setState({ convertedContent: e.target.value });
  };

  importHTML = () => {
    const { editorState } = this.state;
    this.onChange(
      EditorState.push(
        editorState,
        convertFromHTML(this.state.convertedContent)
      )
    );
  };

  emptyState = () => {
    this.setState({
      editorState: EditorState.createEmpty(),
      convertedContent: "",
    });
  };
  emptyDoc = () => {
    this.setState({
      editorState: EditorState.createEmpty(),
    });
  };
  emptyHtml = () => {
    this.setState({
      convertedContent: "",
    });
  };

  copyItem = (type, e) => {
    if (type === "html") {
      navigator.clipboard.writeText(this.state.convertedContent);
    }
    if (type === "doc") {
      navigator.clipboard.writeText(
        this.state.editorState.getCurrentContent().getPlainText()
      );
      console.log(this.state.editorState.getCurrentContent().getPlainText());
    }
  };

  render() {
    return (
      <div className="main m-5">
        <h3 className=" text-center">
          <strong> Html to Doc | Doc to Html</strong>
        </h3>
        <div className="row">
          <div className="col-md-5">
            <div className="d-flex justify-content-between">
              <p p className="text-center">
                Place Html
              </p>
              <AiOutlineHistory
                className="copy-icon"
                onClick={this.emptyHtml}
              />
              <AiTwotoneReconciliation
                className="copy-icon"
                onClick={() => this.copyItem("html")}
              />
            </div>
            <textarea
              className="form-control"
              onChange={this.updateHTML}
              value={this.state.convertedContent}
              style={{ height: "80vh" }}
            />
          </div>
          <div className="col-md-2 text-center">
            <div>
              <button
                onClick={this.emptyState}
                className="btn btn-warning text-white m-2"
              >
                {" "}
                <AiOutlineHistory /> Clear All{" "}
              </button>
              <button onClick={this.exportHTML} className="btn btn-primary m-2">
                {" "}
                <AiFillHtml5 /> Export HTML{" "}
              </button>
              <button onClick={this.importHTML} className="btn btn-success m-2">
                {" "}
                <AiFillFileText /> Import HTML{" "}
              </button>
            </div>
          </div>

          <div className="col-md-5">
            <div className="d-flex justify-content-between">
              <p className=" text-center">Place Doc</p>
              <AiOutlineHistory className="copy-icon" onClick={this.emptyDoc} />
              <AiTwotoneReconciliation
                className="copy-icon"
                onClick={() => this.copyItem("doc")}
              />
            </div>
            <Editor
              editorState={this.state.editorState}
              onChange={this.onChange}
            />
          </div>
        </div>
        <div className="text-center my-4">
          <small>
            Created{" "}
            <a target="_blank" href="https://shahsajib.me/">
              shahasjib
            </a>{" "}
          </small>
        </div>
      </div>
    );
  }
}

export default App;
