import React from 'react';

class Item extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      clicks:0,
      remaining:10,
    }
  }

  clickMe() {
    if (this.state.remaining > 0) {
      this.setState({
        clicks: this.state.clicks + 1,
        remaining: this.state.remaining - 1
      })
    }
  }

  render() { 
    return(
      <div>
        <h1 class="Comp" onClick={() => this.clickMe()}> This is my React Component. Click Me </h1>
        <h3>You have clicked {this.state.clicks} times.</h3>
        <h3>You have {this.state.remaining} clicks left.</h3>  
      </div>
      

    )
  }
}

export default Item;