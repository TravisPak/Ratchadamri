import React from 'react';


class ProductBreakdown extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    if(!this.props.characteristics){
      return null;
    }
    return(<div>
      {Object.keys(this.props.characteristics).map((characteristic,id)=>{
        return <div key={id}>{characteristic}
        <br></br>
        <span>{this.props.selections[characteristic][0]}</span>
        <span>{this.props.selections[characteristic][2]}</span>
        <span>{this.props.selections[characteristic][4]}</span>
        </div>
      })}
    </div>)
  }
}

export default ProductBreakdown;