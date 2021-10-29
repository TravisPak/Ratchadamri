import React from 'react';
import ProductDetail from './ProductDetail/ProductDetail.jsx';
import Cards from './Cards/index.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
  super(props);
  this.state = {
    currentProduct: {}
  }
  //BIND FUNCTIONS IN HERE
  }

  // set default start up productId
  componentDidMount() {

    axios.get('/products/37311')
      .then((response)=>{
        console.log(response.data);
        this.setState({currentProduct: response.data})
      })
      .catch((err)=>{
        console.log(err);
      })

    //for testing purposes
    ///qa/questions/533204/answers
    axios.get('/qa/questions/533204/answers')
      .then((data)=>{
        console.log(data);
      })
      .catch((err)=>{
        console.log(err);
      })
  }

render () {
return (
  <div>
    <div>
      {/* <ProductDetail product={this.state.currentProduct}/> */}
    </div>
    <div>
    <Cards props={this.state} />
    </div>
    <div>
    QUESTIONS ANSWERS HERE
    </div>

    <div>
    REVIEWS HERE
    </div>
  </div>
)
}


}

export default App;