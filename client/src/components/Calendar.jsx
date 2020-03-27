import React from 'react';
import moment from 'moment';
import Month from './Month.jsx';
import $ from 'jquery';
// import Calendar from './Calendar';

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: moment().format('YYYY-MM-DD'),
      dateL1: moment().format('YYYY-MM-DD'),
      dateR1: moment().add(1, 'M').format('YYYY-MM-DD'),
      selectedRes: []
    };

    this.previousMonths = this.previousMonths.bind(this);
    this.nextMonths = this.nextMonths.bind(this);
    this.handleStartChange = this.handleStartChange.bind(this);
    this.handleEndChange = this.handleEndChange.bind(this);
  }


  componenetDidMount() {
    this.initializeDates();
  }

  componenetDidMount() {
    if (this.state.selectedRes.length > 1) {
      this.render();
    }
  }


  // year crossover is bugged
  initializeDates() {
    var current = moment().format('YYYY-MM-DD');

    var next = moment(current).add(1, 'M').format('YYYY-MM-DD');

    this.updateState(current, next);
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

  // subtractMonth(string) {
  //   var array = string.split('/');
  //   var month = parseInt(array[0]);
  //   var year = parseInt(array[2]);

  //   if (month - 1 === 0) {
  //     year -= 1;
  //     month = 12;
  //   } else {
  //     month -= 1;
  //   }

  //   if (month <= 9) {
  //     month = `0${month}`;
  //   }

  //   return moment(string).subtract(1, 'M').format('MM/DD/YYYY');
  //   var date = `${month}/01/${year}`;
  //   return date;
  // }

  // addMonth(string) {
  //   var array = string.split('/');
  //   var month = parseInt(array[0]);
  //   var year = parseInt(array[2]);

  //   if (month > 12) {
  //     year += 1;
  //     month = 1;
  //   } else {
  //     month += 1;
  //   }

  //   if (month <= 9) {
  //     month = `0${month}`;
  //   }

  //   // console.log(moment(string).add(1, 'M').format('MM/DD/YYYY'));
  //   // return moment(string).add(1, 'M').format('MM/DD/YYYY');
  //   // console.log(date);
  //   var date = `${month}/01/${year}`;
  //   // console.log(date);
  //   return date;
  // }

  handleStartChange(date) {
    var resDates = this.state.resDates;
    resDates[0] = date;
    this.setState({
      resDates: resDates
    })
  }

  handleEndChange(date) {
    var resDates = this.state.resDates;
    resDates[1] = date;
    this.setState({
      resDates: resDates
    })
  }


  render() {
    return (
      <div className='calendar'>
        <div className='calendar-view'>
            <div className='cal-tableheader-prev'>
              <button className='cal-current-month' onClick={this.previousMonths}>&#8592;</button>
              <strong className='month-header'>{moment(this.state.dateL1).format('MMMM YYYY')}</strong>
            </div>
            <div className='cal-tableheader-next'>
              <strong className='month-header'>{moment(this.state.dateR1).format('MMMM YYYY')}</strong>
              <button className='cal-next-month' onClick={this.nextMonths}>&#8594;</button>
            </div>
            <div className='cal-current'>
              <Month  date={this.state.dateL1} month={moment(this.state.dateL1).format('MMMM')} reservations={this.props.reservations} selectedRes={this.state.selectedRes}  handleStartChange={this.handleStartChange} handleEndChange={this.handleEndChange} clearRes={this.clearRes}/>
            </div>
            <div className='cal-next'>
              <Month date={this.state.dateR1} month={moment(this.state.dateR1).format('MMMM')} reservations={this.props.reservations} selectedRes={this.state.selectedRes}  handleStartChange={this.handleStartChange} handleEndChange={this.handleEndChange} clearRes={this.clearRes}/>
            </div>
        </div>
      </div>
    )
  }
}

export default Calendar;