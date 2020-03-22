import React from 'react';
import moment from 'moment';
import Month from './Month.jsx';
import $ from 'jquery';
// import Calendar from './Calendar';

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: moment().format('L'),
      monthL1: moment().format('MMMM'),
      dateL1: moment().format('YYYY-MM-DD'),
      monthR1: moment().add(1, 'M').format('MMMM'),
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


  initializeDates() {
    var current = moment().format('L');
    current = current.split('/');
    current[1] = '01';
    current = current.join();

    var next = this.addMonth(current);

    this.updateState(current, next);
  }


  previousMonths() {
    var current, next;
    var date = this.state.currentDate;

    current = this.subtractMonth(date);
    next = date;

    this.updateState(current, next);
  }

  nextMonths() {
    var current, next;
    var date = this.state.currentDate;

    current = this.addMonth(date);
    next = this.addMonth(current);

    this.updateState(current, next);
  }

  updateState(current, next) {
    this.setState({
      currentDate: current,
      monthL1: moment(current).format('MMMM'),
      dateL1: moment(current).format('YYYY-MM-DD'),
      monthR1: moment(next).format('MMMM'),
      dateR1: moment(next).format('YYYY-MM-DD')
    })
  }

  subtractMonth(string) {
    var array = string.split('/');
    var month = parseInt(array[0]);
    var year = parseInt(array[2]);

    if (month - 1 === 0) {
      year -= 1;
      month = 12;
    } else {
      month -= 1;
    }

    if (month <= 9) {
      month = `0${month}`;
    }

    // return moment(string).subtract(1, 'M').format('MM/DD/YYYY');
    var date = `${month}/01/${year}`;
    return date;
  }

  addMonth(string) {
    var array = string.split('/');
    var month = parseInt(array[0]);
    var year = parseInt(array[2]);

    if (month > 12) {
      year += 1;
      month = 1;
    } else {
      month += 1;
    }

    if (month <= 9) {
      month = `0${month}`;
    }

    // return moment(string).add(1, 'M').format('MM/DD/YYYY');
    var date = `${month}/01/${year}`;
    return date;
  }

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
      <div className='calendar' style={{'display': 'flex'}}>
        <div className='calendar-view' style={{'display': 'flex'}}>
          <div className='cal-current cal-month'>
            <div className='cal-tableheader-prev'>
              <button className='cal-current-month' onClick={this.previousMonths}></button>
              <strong>{this.state.monthL1}</strong>
            </div>
            <Month date={this.state.dateL1} month={this.state.monthL1} reservations={this.props.reservations} selectedRes={this.state.selectedRes}  handleStartChange={this.handleStartChange} handleEndChange={this.handleEndChange}/>
          </div>
          <div className='cal-next cal-month'>
            <div className='cal-tableheader-next'>
              <strong>{this.state.monthR1}</strong>
              <button className='cal-next-month' onClick={this.nextMonths}></button>
            </div>
            <Month date={this.state.dateR1} month={this.state.monthR1} reservations={this.props.reservations} selectedRes={this.state.selectedRes}  handleStartChange={this.handleStartChange} handleEndChange={this.handleEndChange}/>
          </div>
        </div>
      </div>
    )
  }
}

export default Calendar;