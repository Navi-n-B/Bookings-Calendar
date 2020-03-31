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
          <div className='bookings-reviews'></div>
          <div className='bookings-dates'>
            <input id='checkin'></input>
            <input id='checkout'></input>
          </div>
          <div className='bookings-guests'>
            <input id='guests'></input>
          </div>
        </div>
      </div>
    )
  }
}

export default Bookings;