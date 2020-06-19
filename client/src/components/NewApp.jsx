import React from 'react';
import SelectContainer from './SelectContainer.jsx';
import Bookings from './Bookings.jsx';
import axios from 'axios';

class AppCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reservations: [],
      listing: {},
      discounts: [null, null],
      selection: []
    };
    this.id = location.pathname.split('rooms/')[1];
    this.updateSelection = this.updateSelection.bind(this);
  }

  componentDidMount() {
    this.getReservations();
    this.getListingInfo();
  }

  componentDidUpdate(prevState) {
    if (this.state.reservations !== prevState.reservations) {
      this.render();
    }
    if (this.state.listing !== prevState.listing) {
      this.render();
    }
  }

  getReservations() {
    axios.get(`http://localhost:3003/api/Calendar/${this.id}`)
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
    axios.get(`http://localhost:3003/api/Bookings/${this.id}`)
      .then((response) => {
        var discounts = [response.data[0].discount_week, response.data[0].discount_month]
        this.setState({
          listing: response.data[0],
          discounts: discounts
        });
        // console.log(response.data[0]);
      })
      .catch(() => {
        console.log('error retrieving Listing data');
      });
  }

  updateSelection(selection) {
    this.setState({
      selection: selection
    });
  }


  render() {
    return (
      <div>
        <div className='cal-listing'>
          <h2 className='cal-div-title'>Select Dates</h2>
          <span className='cal-discounts'>
            {(this.state.discounts[0] && !this.state.discounts[1]) ? `This host offers ${this.state.discounts[0]}% off if you stay a week.` : ``}
            {(!this.state.discounts[0] && this.state.discounts[1]) ? `This host offers ${this.state.discounts[1]}% off if you stay a month.` : ``}
            {(this.state.discounts[0] && this.state.discounts[1]) ? `This host offers ${this.state.discounts[0]}% off if you stay a week and a ${this.state.discounts[1]}% monthly discount.` : ''}
            </span>
        </div>
        <SelectContainer reservations={this.state.reservations} listing={this.state.listing} selection={this.selection}/>
        {/* <Bookings listing={this.state.listing}/> */}
      </div>
    )
  }
}

export default AppCalendar;