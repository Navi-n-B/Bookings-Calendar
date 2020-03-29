import React from 'react';
import Bookings from './Bookings.jsx';
import Calendar from './Calendar.jsx';
import axios from 'axios';
import $ from 'jquery';

class AppCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reservations: [],
      listing: {}
    };
    this.id = location.pathname.split('rooms/')[1];
  }

  componentDidMount() {
    this.getReservations();
    // this.getListingInfo();
  }

  componentDidUpdate(prevState) {
    if (this.state.reservations !== prevState.reservations) {
      this.render();
    }
  }

  getReservations() {
    axios.get(`/api/Calendar/${this.id}`)
      .then((response) => {
        this.setState({
          reservations: response.data
        });
        // console.log(response.data);
      })
      .catch(() => {
        console.log('error retrieving Reservation data');
      });
  }

  getListingInfo() {
    axios.get(`/api/Bookings/${this.id}`)
      .then((response) => {
        this.setState({
          listing: response.data
        });
      })
      .catch(() => {
        console.log('error retrieving Listing data');
      });
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

export default AppCalendar;