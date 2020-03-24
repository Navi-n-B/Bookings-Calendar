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
      console.log(this.props.listing.price)
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
          <div className='bookings-dates'>
            <span>dates</span>
            <input id='checkin'></input>
            <input id='checkout'></input>
          </div>
          <div className='bookings-guests'>
            <span>Guests</span>
            <input id='guests'></input>
          </div>
          <div className='bookings-submit'>
            <button className='submit-reservation'>Reserve</button>
            <span>You won't be charged yet</span>
          </div>
        </div>
        <span>Report this listing</span>
      </div>
    )
  }
}

export default Bookings;