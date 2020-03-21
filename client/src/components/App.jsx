import React from 'react';
import Bookings from './Bookings.jsx';
import Calendar from './Calendar.jsx';
import $ from 'jquery';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reservations: []
    };

  }

  componentWillMount() {
    this.getRoomData();
  }

  componentDidUpdate(prevState) {
    // this.getRoomData();
    console.log(prevState)
    console.log(this.state.reservations)
    if (this.state.reservations !== prevState.reservations) {
      this.render();
    }
  }

  getRoomData() {
    $.ajax({
      method: 'GET',
      url: '/api'})
      .done((data) => {
        if (data) {
          this.setState({
            reservations: data
          });
          console.log(data);
        } else {
          console.log('error retrieving data');
        }
      })
  }


  render() {
    return (
      <div>
        <Calendar reservations={this.state.reservations}/>
        <Bookings />
        <button onClick={this.getRoomData.bind(this)}>TEST</button>
      </div>
    )
  }
}

export default App;