import React from "react";
import axios from "axios";
import { getPost } from "../actions/Actions";
import { connect } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import moment from "moment";
// import "../style.css";

class EgasDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstPic: [],
      subject: [],
      details: [],
      relate: [],
      notes: [],
      newStr: [],
    };
  }

  editTriger = (e) => {

    this.refs.editval.style.display = 'inline'
    this.refs.spanEdit.style.display = 'inline'

  }

  handleEdit = () => {

    let valOfUpdate = {updateVal : this.refs.editval.value}
    // console.log(this.refs.editval);
    const url = window.location.href;
    const s = url.slice(33);
    const begainOfNum = url.slice(34)
    const endOfNum = begainOfNum.indexOf('/')
    const num = begainOfNum.slice(0, endOfNum)
    const afterSlash = endOfNum + 1
    const bais = begainOfNum.slice(afterSlash)
    console.log(bais);

    axios({
      method: "PUT",
      data: valOfUpdate,
      url: `http://localhost:3000/updatePost/${num}/${bais}`,
      headers: { "Content-Type": "application/json" },
    }).then(data => {
      console.log(data);
      console.log(num);
    })
   }

  componentDidMount() {
    const url = window.location.href;
    const s = url.slice(33);
    const begainOfNum = url.slice(34)
    const endOfNum = begainOfNum.indexOf('/')
    const num = begainOfNum.slice(0, endOfNum)
      axios
      .get(`http://localhost:3000/detailedPost${s}`)
      .then((res) => {
        this.setState({
          firstPic: res.data[0],
          subject: res.data[0],
          details: res.data,
        });
        return res.data;
      })
      .then((data) => {
        const relate = `الرد على ${data[0].subject}`;
        axios
          .get(`http://localhost:3000/relatedPost/${relate}`)
          .then((data) => {
            if (data.data[0].length > 0) {
              this.setState({ relate: data.data[0] });
            } else {
              this.setState({
                relate: data.data[1],
              });
            }
          });
      });
  }
  handelImgClick = (e) => {
    this.refs.modal.style.display = "block";
    // this.refs.img01.src = `data:image/png;base64,${this.state.details[0].image}`;
    this.refs.caption.innerHTML = this.state.details[0].subject;
  };

  handelSpanClick = (e) => {
    this.refs.modal.style.display = "none";
  };

  render() {

    return (
      <div className="detailedWrapper">
        <div class="info">
          <img
            onClick={this.handelImgClick}
            id="myImg"
            src={`data:image/png;base64,${this.state.firstPic.image}`}
          />
          <div class ="text">
            {this.state.relate.map((relatedLink) => (
              <a href={`/egasdetails/${relatedLink.id}/${relatedLink.bais}`}>
                <p name={relatedLink.subject}>{relatedLink.subject}</p>
              </a>
            ))}

            <a> الموضوع :<span>{this.state.subject.subject}</span> </a>
            <a>تاريخ التحرير :<span>{this.state.subject.creationdate}</span></a> 

            
            <h4>ملخص الخطاب</h4>
            <p>{this.state.subject.notes}</p>
            <h4>حالة الخطاب</h4>
            <span>{this.state.subject.state}</span>

            <button onClick={this.editTriger} >تعديل حالة الخطاب</button>
           <div id="editwrapper" ref="editInput"></div>
           <span ref="spanEdit" id="edit" onClick={this.handleEdit}>عدل</span>
           <input id="editinput"  type="text" ref="editval" placeholder="ادخل التعديل"></input>
          </div>
        </div>

        <div ref="modal" id="myModal" className="modal">
          <span onClick={this.handelSpanClick} className="close">
            &times;
          </span>
          {this.state.details.map((img) => (
            <div>
              <img
                style={{ height: "100%" }}
                ref="img01"
                className="modal-content"
                id={img.id}
                src={`data:image/png;base64,${img.image}`}
              />
              <br />
            </div>
          ))}
          <div ref="caption" className="caption"></div>
        </div>
      </div>
    );
  }
}

export default EgasDetails;
