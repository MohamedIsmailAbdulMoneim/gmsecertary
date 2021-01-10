import React from "react";
import {
  getPost,
  getInt,
  sliceEPost,
  searchPost,
  waitingPost,
} from "../actions/Actions";

import { connect } from "react-redux";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Link } from "react-router-dom";
import Pagination from "./Pagination.js";
import { Component } from "react";

class Galary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputCreated: false,
      dataSliced: null,
      currentPage: 1,
      type: null,
    };
  }

  handelSort = (e) => {
    this.setState({
      type: e.target.getAttribute("name"),
    });
  };

  componentDidMount() {
    this.props.getPost();
    this.props.getInt();
    this.props.waitingPost();

  }

  render() {
    console.log(this.props.pending.map);

    let btnNum =
      this.props.static === "egas" && this.state.type === "export"
        ? Math.ceil(this.props.fLength / 15)
        : this.props.static === "egas" && this.state.type === "import"
        ? Math.ceil(this.props.sLength / 15)
        : this.props.static === "memos" && this.state.type === "export"
        ? Math.ceil(this.props.fLocallength / 15)
        : this.props.static === "memos" && this.state.type === "import"
        ? Math.ceil(this.props.sLocallength / 15)
        : this.props.static === "pending"
        ? Math.ceil(this.props.pendingLength / 15)
        : 0;

    return (
      <div>
        <h3 class="type-wrapper">
          <p name="import" onClick={this.handelSort} class="type">
            وارد
          </p>
          <p name="export" onClick={this.handelSort} class="type">
            صادر
          </p>
        </h3>
        <div className="row">
          {this.props.static === null ? (
            <p>برجاء اختيار أي من الخطابات الخارجية و المذكرات الداخلية</p>
          ) : null}

          { this.props.static === "egas" &&
              this.state.type === "export" &&
              !this.props.sliced
            ? this.props.posts[0].slice(0,15).map((post) => (
                <div className="col-lg-4 items">
                  <Link to={`/egasdetails/${post.outdocs_id}/${post.bais}`}>
                    <img
                      key={post.id}
                      name="img"
                      id="myImage"
                      style={{ height: "300px", width: "300px" }}
                      className="img-thumbnail"
                      src={`data:image/png;base64,${post.image}`}
                    />
                  </Link>
                  <Link to={`/egasdetails/${post.outdocs_id}/${post.bais}`}>
                    <p style={{ width: "400px" }} name={post.subject}>
                      {post.subject}
                    </p>
                  </Link>
                </div>
              )) :
          this.props.static === "egas" &&
          this.state.type === "export" &&
          this.props.sliced
            ? this.props.outSliced.map((post) => (
                <div className="col-lg-4 items">
                  <Link to={`/egasdetails/${post.outdocs_id}/${post.bais}`}>
                    <img
                      key={post.id}
                      name="img"
                      id="myImage"
                      style={{ height: "300px", width: "300px" }}
                      className="img-thumbnail"
                      src={`data:image/png;base64,${post.image}`}
                    />
                  </Link>
                  <Link to={`/egasdetails/${post.outdocs_id}/${post.bais}`}>
                    <p style={{ width: "400px" }} name={post.subject}>
                      {post.subject}
                    </p>
                  </Link>
                </div>
              ))
              : this.props.static === "egas" &&
              this.state.type === "import" &&
              !this.props.sliced
            ? this.props.posts[1].slice(0,15).map((post) => (
                <div className="col-lg-4 items">
                  <Link to={`/egasdetails/${post.outdocs_id}/${post.bais}`}>
                    <img
                      key={post.id}
                      name="img"
                      id="myImage"
                      style={{ height: "300px", width: "300px" }}
                      className="img-thumbnail"
                      src={`data:image/png;base64,${post.image}`}
                    />
                  </Link>
                  <Link to={`/egasdetails/${post.outdocs_id}/${post.bais}`}>
                    <p style={{ width: "400px" }} name={post.subject}>
                      {post.subject}
                    </p>
                  </Link>
                </div>
              ))
            : this.props.static === "egas" &&
              this.state.type === "import" &&
              this.props.sliced
              ? this.props.outSliced.map((post) => (
                <div className="col-lg-4 items">
                  <Link to={`/egasdetails/${post.outdocs_id}/${post.bais}`}>
                    <img
                      key={post.id}
                      name="img"
                      id="myImage"
                      style={{ height: "300px", width: "300px" }}
                      className="img-thumbnail"
                      src={`data:image/png;base64,${post.image}`}
                    />
                  </Link>
                  <Link to={`/egasdetails/${post.outdocs_id}/${post.bais}`}>
                    <p style={{ width: "400px" }} name={post.subject}>
                      {post.subject}
                    </p>
                  </Link>
                </div>
              ))
            : this.props.static === "memos" &&
              this.state.type === "export" &&
              this.props.sliced
               ? this.props.localSliced.map((post) => (
                <div className="col-lg-4 items">
                  <Link to={`/egasdetails/${post.intdocs_id}/${post.bais}`}>
                    <img
                      name="img"
                      id="myImage"
                      style={{ height: "300px", width: "300px" }}
                      className="img-thumbnail"
                      src={`data:image/png;base64,${post.image}`}
                    />
                  </Link>
                  <Link to={`/egasdetails/${post.intdocs_id}/${post.bais}`}>
                    <p name={post.subject}>{post.subject}</p>
                  </Link>
                </div>
              ))
            : this.props.static === "memos" &&
              this.state.type === "export" &&
              !this.props.sliced
            ? this.props.localdata[0].slice(0, 15).map((post) => (
                <div className="col-lg-4 items">
                  <Link to={`/egasdetails/${post.intdocs_id}/${post.bais}`}>
                    <img
                      name="img"
                      id="myImage"
                      style={{ height: "300px", width: "300px" }}
                      className="img-thumbnail"
                      src={`data:image/png;base64,${post.image}`}
                    />
                  </Link>
                  <Link to={`/egasdetails/${post.intdocs_id}/${post.bais}`}>
                    <p name={post.subject}>{post.subject}</p>
                  </Link>
                </div>
              ))
            : this.props.static === "memos" &&
              this.state.type === "import" &&
              this.props.sliced
            ? this.props.localSliced.slice(0, 15).map((post) => (
                <div className="col-lg-4 items">
                  <Link to={`/egasdetails/${post.intdocs_id}/${post.bais}`}>
                    <img
                      name="img"
                      id="myImage"
                      style={{ height: "300px", width: "300px" }}
                      className="img-thumbnail"
                      src={`data:image/png;base64,${post.image}`}
                    />
                  </Link>
                  <Link to={`/egasdetails/${post.intdocs_id}/${post.bais}`}>
                    <p name={post.subject}>{post.subject}</p>
                  </Link>
                </div>
              ))
            : this.props.static === "memos" &&
              this.state.type === "import" &&
              !this.props.sliced
              ? this.props.localdata[1].slice(0, 15).map((post) => (
                <div className="col-lg-4 items">
                  <Link to={`/egasdetails/${post.intdocs_id}/${post.bais}`}>
                    <img
                      name="img"
                      id="myImage"
                      style={{ height: "300px", width: "300px" }}
                      className="img-thumbnail"
                      src={`data:image/png;base64,${post.image}`}
                    />
                  </Link>
                  <Link to={`/egasdetails/${post.intdocs_id}/${post.bais}`}>
                    <p name={post.subject}>{post.subject}</p>
                  </Link>
                </div>
              ))
            : this.props.static === "search" &&
              this.props.searchEData.length > 0
            ? this.props.searchEData.map((post) => (
                <div className="col-lg-4 items">
                  <Link to={`/egasdetails/${post.outdocs_id}/${post.bais}`}>
                    <img
                      name="img"
                      id={post.subject}
                      style={{ height: "300px", width: "300px" }}
                      className="img-thumbnail"
                      src={`data:image/png;base64,${post.image}`}
                    />
                  </Link>
                  <Link
                    to={`/egasdetails/${post.outdocs_id || post.intdocs_id}/${
                      post.bais
                    }`}
                  >
                    <p style={{ width: "250px" }} name={post.subject}>
                      {post.subject}
                    </p>
                  </Link>
                  <div></div>
                </div>
              ))
            : this.props.static === "pending"
            ? this.props.pending.slice(0, 15).map((post) => (
                <div className="col-lg-4 items">
                  <Link
                    to={`/egasdetails/${post.intdocs_id || post.outdocs_id}/${
                      post.bais
                    }`}
                  >
                    <img
                      key={post.id}
                      name="img"
                      id="myImage"
                      style={{ height: "300px", width: "300px" }}
                      className="img-thumbnail"
                      src={`data:image/png;base64,${post.image}`}
                    />
                  </Link>
                  <Link to={`/egasdetails/${post.intdocs_id || post.outdocs_id}/${post.bais}`}>
                    <p style={{ width: "400px" }} name={post.subject}>
                      {post.subject}
                    </p>
                  </Link>
                </div>
              ))
            : null}
        </div>
        <Pagination
          sort={this.state.type}
          pages={btnNum}
          currentPage={this.state.currentPage}
        ></Pagination>
      </div>
    );
  }
}

// const mapStateToProps = (state) => ({ posts: state.posts.items });
const mapStateToProps = (state) => {
  return {
    posts: state.posts.items,
    fLength: state.posts.Flength,
    sLength: state.posts.sLength,
    static: state.posts.static,
    localdata: state.posts.localdata,
    fLocallength: state.posts.fLocallength,
    sLocallength: state.posts.sLocallength,
    searchEData: state.posts.searchEData,
    searchIData: state.posts.searchIData,
    pending: state.posts.pendingPost,
    pendingLength: state.posts.pendingLength,
    localSliced: state.posts.localSliced,
    outSliced: state.posts.outSliced,
    sliced: state.posts.sliced,
 
  };
};
export default connect(mapStateToProps, {
  sliceEPost,
  getPost,
  getInt,
  searchPost,
  waitingPost,
})(Galary);

// export default Egas
