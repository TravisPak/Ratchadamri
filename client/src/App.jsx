import React from 'react';
import ProductDetail from './ProductDetail/index.jsx';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
  super(props);
  this.state = {
    currentProduct: ''
  }
  //BIND FUNCTIONS IN HERE
  }

  // set default start up productId
  componentDidMount() {
    this.setState({
      // can randomize product ID later?
      currentProduct: '37311'
    })
    //for testing purposes
    axios.get('/reviews/meta',{params:{product_id:'37311'}})
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
      <ProductDetail product={this.state.currentProduct}/>
    </div>
    <div>
    CARDS HERE
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