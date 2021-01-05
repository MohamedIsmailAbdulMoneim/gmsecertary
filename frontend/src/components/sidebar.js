import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getInt, getPost, testTry } from "../actions/Actions";


class Sidebar extends React.Component {
  state = {};

  

  render() {
    console.log(this.props.static);

    return (
      <div>
        <div class="sidebar">
          {/* <header>
            Dashboard
          </header> */}
          <ul>
            {/* <li><a href="#"><i class="fas fa-qrcode"></i>Dashboard</a></li> */}
            <Link to={`/galary`}>
            <li ><a name="egas" href="/galary" onClick={ (e) => {this.props.testTry(e); this.props.getPost(e);}} ><i className="fas fa-link"></i>خطابات خارجية</a></li>
          </Link>
          <Link to={`/galary`}>
          <li onClick={this.props.getInt}><a name="memos" href="/galary" onClick={ (e) => {this.props.testTry(e); this.props.getInt(e);}} ><i className="fas fa-stream"></i>مذكرات داخلية</a></li>
          </Link>

          <Link to={`/galary`}>
          <li><a name="pending" href="/galary" onClick={this.props.testTry} ><i className="fas fa-stream"></i>مهمات غير تامة</a></li>
          </Link>

          <Link to={`/galary`}>
          <li><a name="memos" href="/galary" onClick={this.props.testTry} ><i className="fas fa-stream"></i>link 2</a></li>
          </Link>
          
            {/* <li><a href="#"><i class="fas fa-calendar-week"></i>Events</a></li>
            <li><a href="#"><i class="fas fa-question-circle"></i>About</a></li>
            <li><a href="#"><i class="fas fa-sliders-h"></i>Services</a></li>
            <li><a href="#"><i class="fas fa-envelope"></i>Contact</a></li> */}


          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { posts: state.posts.items, length: state.posts.length, static: state.posts.static, sliced: state.posts.sliced };
};

export default connect(mapStateToProps , { getInt, getPost, testTry })(Sidebar);