import React from "react";
import axios from "axios";

class HelpfulReport extends React.Component {
  constructor(props) {
    super(props);

    this.state = { count: this.props.helpfulCount };

    this.clickYes = this.clickYes.bind(this);
    this.clickReport = this.clickReport.bind(this);
  }

  clickYes() {
    console.log("Yes");
    axios
      .put(`/reviews/${this.props.id}/helpful`)
      .then((data) => {
        console.log(data);
        this.props.updateHelpfulness(this.props.id);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  clickReport() {
    console.log("Report");
    axios
      .put(`/reviews/${this.props.id}/report`)
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    return (
      <div className="helpful-report-container">
        Helpful?
        <span className="helpful-report-yes"onClick={this.clickYes}>
          {" "}
          Yes {this.props.helpfulCount}
        </span> | <span className="helpful-report-no"onClick={this.clickReport}>Report</span>
      </div>
    );
  }
}

export default HelpfulReport;
