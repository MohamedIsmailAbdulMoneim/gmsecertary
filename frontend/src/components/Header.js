import React from "react";
import axios from "axios";
import { connect } from "react-redux";
import Logo from "./NGV.jpg";
import { searchPost, testTry, getPost, getInt } from "../actions/Actions";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: null };
  }

  componentDidMount() {
    this.props.getPost();
    this.props.getInt();
  }

  handleSearchVal = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  handleClick = (e) => {
    this.props.searchPost(this.state.value);
  };

  handleJsSearch = (e) => {
    let concatOut = this.props.posts[0].concat(this.props.posts[1])
    let concatIn = this.props.local[0].concat(this.props.local[1])
    let concatOutIn = concatOut.concat(concatIn)
    console.log(concatOutIn.indexOf(this.state.value))
    // for(let i = 0; i < concatOutIn.length; i++){
    //   if(concatOutIn.indexOf(this.state.value) > -1){
    //     this.props.searchPost(this.state.value);
    //   }
    // }
  }

  handleExcelFile = () => {
    const arr = []
    const data = {arr}
    for (let statedData of this.props.posts) {
        arr.push(statedData)
      };

      console.log(data)
    axios({
      method: "POST",
      data: data,
      withCredentials: true,
      url: "http://localhost:3000/createExcel",
      headers: { "Content-Type": "application/json" },
    }).then(data => {
      console.log(data);
    })
  };

  render() {
    return (
      // <nav className="nav-wrapper navbar navbar-dark bg-dark">
      //   <div className="left-side">
      //     <div className="nav-link-wrapper">
      //       <a href="/">Home</a>
      //     </div>
      //       <div className="nav-link-wrapper">
      //         <a href="/galary">Galary</a>
      //       </div>
      //     <div className="nav-link-wrapper">
      //       <a href="/insert">New</a>
      //     </div>
      //   </div>
      //   <div className="right-side">
      //   <input
      //       type="text"
      //       name="subject"
      //       ref="subject"
      //       placeholder="الموضوع"
      //       className="form-control search"
      //     />
      //     <div className="brand">
      //       <div>NGVC</div>
      //     </div>
      //   </div>
      // </nav>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <img src={Logo} />
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <a class="nav-link" href="/">
                Home <span class="sr-only">(current)</span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/insert">
                New post
              </a>
            </li>
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Dropdown
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <a class="dropdown-item" href="#">
                  Action
                </a>
                <a class="dropdown-item" href="#">
                  Another action
                </a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#">
                  Something else here
                </a>
              </div>
            </li>
            <li class="nav-item">
              <a
                onClick={this.props.testTry}
                class="nav-link"
                href="#"
                name="pending"
              >
                Pending Tasks
              </a>
            </li>
          </ul>
          <form class="form-inline my-2 my-lg-0">
            <span>Export as excel file</span>
            <i
              onClick={this.handleExcelFile}
              class="far fa-file-excel exheader"
            ></i>

            <input
              // onChange={this.handleSearchVal}
              onChange={(e) => {
                this.handleClick(e);
                this.props.testTry(e);
                this.handleSearchVal(e);
                this.handleJsSearch(e);
              }}
              name="search"
              class="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button
              class="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
          </form>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => {
  return { posts: state.posts.items, length: state.posts.length, local: state.posts.localdata };
};
export default connect(mapStateToProps, { searchPost, testTry, getPost, getInt })(Header);

// export default Header;
