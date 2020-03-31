import React from 'react';
import moment from 'moment';
import Month from './Month.jsx';
import $ from 'jquery';
import SelectDates from './SelectDates.jsx';
// import Bookings from './Bookings.jsx';

class SelectContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: moment().format('YYYY-MM-DD'),
      dateL1: moment().format('YYYY-MM-DD'),
      dateR1: moment().add(1, 'M').format('YYYY-MM-DD'),
      resDates: []
    };

    this.previousMonths = this.previousMonths.bind(this);
    this.nextMonths = this.nextMonths.bind(this);
    this.handleStartChange = this.handleStartChange.bind(this);
    this.handleEndChange = this.handleEndChange.bind(this);
    this.discounts = [this.props.listing.discount_week, this.props.listing.discount_month];
  }

  previousMonths() {
    var current, next;
    var date = this.state.currentDate;

    current = moment(date).subtract(1, 'M').format('YYYY-MM-DD');
    next = date;

    this.updateState(current, next);
  }

  nextMonths() {
    var current, next;
    var date = this.state.currentDate;

    current = moment(date).add(1, 'M').format();
    next = moment(date).add(2, 'M').format();

    this.updateState(current, next);
  }

  updateState(current, next) {
    this.setState({
      currentDate: current,
      dateL1: moment(current).format('YYYY-MM-DD'),
      dateR1: moment(next).format('YYYY-MM-DD')
    })
  }


  handleStartChange(date) {
    var resDates = this.state.resDates;
    resDates[0] = date;
    this.setState({
      resDates: resDates
    })
    // console.log(this.state.resDates);
  }

  handleEndChange(date) {
    var resDates = this.state.resDates;
    resDates[1] = date;
    this.setState({
      resDates: resDates
    })
    // console.log(this.state.resDates);
  }

  render() {
    return (
      <div className='calendar'>
        <div className='calendar-view'>
          <div className='cal-headers'>
            <div className='cal-tableheader-prev'>
              <button className='cal-current-month' onClick={this.previousMonths}>&#60;</button>
              <strong className='month-header-current'>{moment(this.state.dateL1).format('MMMM')}</strong>
            </div>
            <div className='cal-tableheader-next'>
              <strong className='month-header-next'>{moment(this.state.dateR1).format('MMMM')}</strong>
              <button className='cal-next-month' onClick={this.nextMonths}>&#62;</button>
            </div>
          </div>
          <div className='cal-dual'>
            <SelectDates  current={this.state.dateL1} next={this.state.dateR1} reservations={this.props.reservations} selectedRes={this.state.selectedRes}  handleStartChange={this.handleStartChange} handleEndChange={this.handleEndChange} listing={this.props.listing}/>
          </div>
        </div>
      </div>
    )
  }
}

export default SelectContainer;