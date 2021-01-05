import React from "react";
import axios from "axios";
const CancelToken = axios.CancelToken;
const source = CancelToken.source();

class Insert extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subject: "",
      type: "",
      giver: "",
      doc: "",
      required: "",
      summary: "",
      imageSelected: null,
      posttype: null,
      newpostid: null,
      newCreatedData: null,
    };
  }

  componentDidMount() {
    this.refs.subject.value = null;
    this.refs.doc.value = null;
    this.refs.status.value = null;
    this.refs.type.value = null;
    this.refs.giver.value = null;
    this.refs.image.value = null;
    this.refs.required.value = null;
  }

  handlePostType = (e) => {
    this.setState({
      posttype: e.target.value,
    });
  };

  fileSelectedHandler = (event) => {
    const arrOfImg = [];
    for (let i = 0; i < 100; i++) {
      if (event.target.files[i]) {
        arrOfImg.push(event.target.files[i]);
      }
    }
    this.setState({ imageSelected: arrOfImg });
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = (e) => {
    e.preventDefault();

    const fd = {
      subject: this.state.subject,
      type: this.state.type,
      giver: this.state.giver,
      state: this.state.status,
      creationdate: this.state.doc,
      required: this.state.required,
      summary: this.state.summary,
      bais: this.state.posttype,
    };

    if (this.state.posttype === "outdocs") {
      axios({
        method: "POST",
        data: fd,
        withCredentials: true,
        url: "http://localhost:3000/outdocspost",
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => {
          axios
          .get(`http://localhost:3000/newCreatedpost/${res.data.insertId}/${this.state.posttype}`)
          .then((data) => {
            let newdata;
            data.data[0].length > 0 ? newdata = data.data[0] : newdata = data.data[1]
            console.log(newdata);
            this.setState({
              newCreatedData: newdata[0]
            })
          });
          return res.data.insertId;
        })
        .then((data) => {
          this.setState({
            newpostid: data,
          });
          const img = new FormData();
          img.append("data", data);
          console.log(data);

          // for(let i = 0; i < this.state.imageSelected; i++){
          //   img.append(`image`, this.state.imageSelected, `default`);

          // }
          for (let i = 0; i < this.state.imageSelected.length; i++) {
            img.append("image", this.state.imageSelected[i], `default${i}`);
          }

          axios({
            method: "POST",
            data: img,
            url: "http://localhost:3000/outdocsimage",
            headers: { "Content-Type": "multipart/form-data" },
            cancelToken: source.token,
          }).then((res) => {
            console.log(res);
            this.componentDidMount()
          });
        });
    } else if (this.state.posttype === "intdocs") {
      axios({
        method: "POST",
        data: fd,
        withCredentials: true,
        url: "http://localhost:3000/intdocspost",
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => {
          axios
            .get(`http://localhost:3000/newCreatedpost/${res.data.insertId}/${this.state.posttype}`)
            .then((data) => {
              let newdata;
              data.data[0].length > 0 ? newdata = data.data[0] : newdata = data.data[1]
              console.log(newdata);
              this.setState({
                newCreatedData: newdata[0]
              })
            });
          return res.data.insertId;
        })
        .then((data) => {
          const img = new FormData();
          img.append("data", data);
          for (let i = 0; i < this.state.imageSelected.length; i++) {
            img.append("image", this.state.imageSelected[i], `default${i}`);
          }
          axios({
            method: "POST",
            data: img,
            url: "http://localhost:3000/intdocsimage",
            headers: { "Content-Type": "multipart/form-data" },
          }).then((res) => {});
          this.componentDidMount()

        });
    }
    this.componentDidMount();
  };

  render() {

    console.log(this.state.newCreatedData);
    return (
      <div className="insert-wrap">
        <form ref="form" className="father" onSubmit={this.onSubmit}>
          <input
            onClick={this.handlePostType}
            type="radio"
            name="posttype"
            value="outdocs"
            ref="memossubject"
            onChange={this.onChange}
          />
          <label for="egas">خطابات خارجية</label>

          <input
            onClick={this.handlePostType}
            type="radio"
            name="posttype"
            value="intdocs"
            ref="subject"
            onChange={this.onChange}
          />
          <label for="memos">مذكرات داخلية</label>

          <input
            type="text"
            name="subject"
            ref="subject"
            placeholder="الموضوع"
            className="form-control"
            value={this.state.subject}
            onChange={this.onChange}
          />
          <input
            type="date"
            name="doc"
            ref="doc"
            className="form-control"
            value={this.state.doc}
            onChange={this.onChange}
          />
          <input
            type="text"
            name="status"
            ref="status"
            placeholder="حالة الخطاب"
            className="form-control"
            value={this.state.status}
            onChange={this.onChange}
          />
          <input
            type="text"
            name="type"
            ref="type"
            placeholder="التصنيف"
            className="form-control"
            value={this.state.type}
            onChange={this.onChange}
          />
          <input
            type="text"
            name="giver"
            ref="giver"
            placeholder="المرسل"
            className="form-control"
            value={this.state.giver}
            onChange={this.onChange}
          />
          <input
            type="text"
            name="required"
            ref="required"
            placeholder="المطلوب"
            className="form-control"
            value={this.state.required}
            onChange={this.onChange}
          />
          <textarea
            name="summary"
            ref="summary"
            placeholder="الملخص"
            className="form-control"
            value={this.state.summary}
            onChange={this.onChange}
          ></textarea>

          <input
            type="file"
            name="image"
            ref="image"
            placeholder="الصورة"
            className="form-control-file"
            onChange={this.fileSelectedHandler}
            multiple
          />
          <button className="btn btn-light" type="submit">
            submit
          </button>
        </form>
          {this.state.newCreatedData ? <p> تم إضافة موضوع : {this.state.newCreatedData.subject}</p> : <p></p>}
      </div>
    );
  }
}

export default Insert;
