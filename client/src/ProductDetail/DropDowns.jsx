import React from "react";

class DropDowns extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedSku: {size: "SELECT SIZE", quantity: "-"},
    };
    this.handleSizeChange = this.handleSizeChange.bind(this);
    this.handleQtyChange = this.handleQtyChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  createQuantityOptions(qty) {
    var options = [<option value="-">-</option>];

    for (var i = 1; (i <= this.state.selectedSku.quantity && i <= 15); i++) {
      options.push(<option value={null} key={i}>{i}</option>)
    }

    return options;
  }

  handleSizeChange(event) {
    this.setState({ selectedSku: this.props.currentStyle.skus[event.target.value] })
  }

  handleQtyChange(event) { }

  handleSubmit(event) {}

  render() {
    console.log(this.state);
    var skus = this.props.currentStyle.skus;
    var qty = this.state.selectedSku.quantity;
    console.log(qty);
    return (
      <form onSubmit={this.handleSubmit} className="drop-downs">
        <select className="size-drop-down" value={this.state.sizeValue} onChange={this.handleSizeChange}>
          <option>{this.state.selectedSku.size}</option>
          {skus
            ? Object.keys(skus).map((skuNumber, key) => {
                if (skus[skuNumber].quantity > 0) {
                  return (
                    <option value={skuNumber} key={key}>
                      {skus[skuNumber].size}
                    </option>
                  );
                }
              })
            : ""}
        </select>
        <select className="qty-drop-down">
          {this.createQuantityOptions(qty)}
        </select>
      </form>
    );
  }
}

export default DropDowns;
