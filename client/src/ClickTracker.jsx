import React from 'react';

// import ClickTracker
// export default ClickTracker(originalComponent)


 class WithClickTracker extends React.Component {

  state = { clicks: 0 };

  incrementCount() {
    console.log(this);

    // this.setState( prevState => {
    //   return {clicks: prevState.clicks + 1}
    // })
    // Maybe should be sending this info to the API here?
  }

  // Map through the children of whatever is wrapped in Counter, and add incremenetCount as props
  render() {

    return (
      <React.Fragment>
        {React.Children.map(this.props.children, (child) => {
          // console.log(this.incrementCount);

          return React.cloneElement(child, { onClick: () => {
            alert("CLICKED!!!")
          } })
        })}

      </React.Fragment>
    );
  }
}



export default WithClickTracker;

// this function takes a component


// function ClickTracker(originalComponent) {
//   // and returns another component
//   return class extends React.Component {
//     constructor(props) {
//       super(props);
//       this.state = {
//         clicks: 0
//       }
//     }

//     incrementCount = () => {
//       this.setState( prevState => {
//         return {clicks: prevState.clicks + 1}
//       })
//       console.log(this);
//       // Maybe should be sending this info to the API here?
//     }

//     // ... and renders the wrapped component with the fresh data!
//     // Notice that we pass through any additional props
//     render() {
//       return (
//         <React.Fragment>
//           <originalComponent count={this.state.clicks} onClick={this.incrementCount}/>
//         </React.Fragment>
//       );
//     }
//   }
// }

// export default ClickTracker;


// in all other files:
