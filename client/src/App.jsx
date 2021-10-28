import React from 'react';
import ProductDetail from './ProductDetail/index.jsx';

class App extends React.Component {
  constructor(props) {
  super(props);
  this.state = {

  }
  //BIND FUNCTIONS IN HERE
  }

render () {
return (
  <div>
    <div>
      <ProductDetail />
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