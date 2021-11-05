import React from 'react';
import ProductDetail from './ProductDetail/ProductDetail.jsx';
import Cards from './Cards/index.jsx';
import ReviewsSection from './Reviews&Ratings/ReviewsSection.jsx';
import axios from 'axios';
import QuestionsList from './QandA/QuestionsList.jsx';

class App extends React.Component {
  constructor(props) {
  super(props);
  this.state = {
    currentProduct: {
      "id": 37315,
      "campus": "hr-rfe",
      "name": "Camo Onesie",
      "slogan": "Blend in to your crowd",
      "description": "The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.",
      "category": "Jackets",
      "default_price": "140.00",
      "created_at": "2021-08-13T14:37:33.145Z",
      "updated_at": "2021-08-13T14:37:33.145Z",
      "features": [
          {
              "feature": "Fabric",
              "value": "Canvas"
          },
          {
              "feature": "Buttons",
              "value": "Brass"
          }
      ]
  },

  }
  //BIND FUNCTIONS IN HERE
  }

  // set default start up productId
  // componentDidMount() {

  //   axios.get('/products/37311')
  //     .then((response)=>{
  //      // console.log('response.data: ', response.data);
  //       this.setState({currentProduct: response.data});
  //       console.log('currentProduct: ', this.state.currentProduct);
  //     })
  //     .catch((err)=>{
  //       console.log(err);
  //     })
  // }

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
    <QuestionsList currentProductID={this.state.currentProduct.id} />
    </div>

    <div>
    REVIEWS HERE
    <ReviewsSection product={this.state.currentProduct}/>
    </div>
  </div>
)
}


}

export default App;