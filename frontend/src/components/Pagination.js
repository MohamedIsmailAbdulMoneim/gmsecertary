import React from "react";
import { sliceEPost, sliceIPost, sliceWaiting } from "../actions/Actions";
import { connect } from "react-redux";

const Pagination = (props) => {
  const pageLinks = [];  for (let i = 1; i <= props.pages; i++) {
    ;
    // let active = props.currentPage === i ? 'activ' : '';
    pageLinks.push(
      <li
        // className={`page-item ${active}`}
        key={i}
        onClick={() => props.static === "egas" ? props.sliceEPost(i, props.sort) : props.static === "memos" ? props.sliceIPost(i, props.sort) : props.static ==="pending" ? props.sliceWaiting(i) : null
        }
        
      >
        <a className="page-link" href="#">
          {i}
        </a>
      </li>
    );
  }

  return (
    <div className="row">
      <ul className="pagination">{pageLinks}</ul>
    </div>
  );
};

const mapStateToProps = (state) => {
  return { posts: state.posts.items, length: state.posts.length, static: state.posts.static, sliced: state.posts.sliced };
};

export default connect(mapStateToProps , { sliceEPost, sliceIPost, sliceWaiting })(Pagination);