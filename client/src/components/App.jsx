import React from 'react';
import Bookings from './Bookings.jsx';
import Calendar from './Calendar.jsx';
import $ from 'jquery';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reservations: [],
      listing: {}
    };

  }

  componentDidMount() {
    this.getReservations();
    this.getListingInfo();
  }

  componentDidUpdate(prevState) {
    if (this.state.reservations !== prevState.reservations) {
      this.render();
    }
  }

  getReservations() {
    $.ajax({
      method: 'GET',
      url: '/api/Calendar'})
      .done((data) => {
        if (data) {
          this.setState({
            reservations: data
          });
        } else {
          console.log('error retrieving data');
        }
      })
  }

  getListingInfo() {
    $.ajax({
      method: 'GET',
      url: '/api/Booking'})
      .done((data) => {
        if (data) {
          this.setState({
            listing: data[0]
          });
        } else {
          console.log('error retrieving data');
        }
      })
  }


  render() {
    return (
      <div>
        <Calendar reservations={this.state.reservations}/>
        {/* <Bookings listing={this.state.listing} reservations={this.state.reservations}/> */}
      </div>
    )
  }
}

export default App;