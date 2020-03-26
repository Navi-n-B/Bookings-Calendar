import React from 'react';
import Bookings from './Bookings.jsx';
import Calendar from './Calendar.jsx';
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
    $.ajax({
      method: 'GET',
      url: `http://localhost:6660/api/Calendar/${this.id}`})
      .done((data) => {
        if (data) {
          this.setState({
            reservations: data
          });
          // console.log(data);
        } else {
          console.log('error retrieving data');
        }
      })
  }

  getListingInfo() {
    $.ajax({
      method: 'GET',
      url: `/api/Bookings/${this.id}`})
      .done((data) => {
        if (data) {
          this.setState({
            listing: data[0]
          });
          // console.log(data);
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

export default AppCalendar;