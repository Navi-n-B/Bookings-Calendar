import React from 'react';
import Month from './Month.jsx';

class Bookings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      price: null
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.setState({
        price: this.props.listing.price
      })
    }
  }


  render() {
    return (
      <div className='bookings'>
        <div className='bookings-cont'>
          <div className='bookings-price'>$ {this.state.price} per night</div>
          <div className='bookings-reviews'></div>
          <span>Dates</span>
          <div className='bookings-dates'>
            <input id='checkin'></input>
            <input id='checkout'></input>
          </div>
          <span>Guests</span>
          <div className='bookings-guests'>
            <input id='guests'></input>
          </div>
            <button className='submit-reservation'>Reserve</button>
        </div>
        <span>Report this listing</span>
      </div>
    )
  }
}

export default Bookings;