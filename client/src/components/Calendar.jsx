import React from 'react';
import moment from 'moment';
import Month from './Month.jsx';
// import Calendar from './Calendar';

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: moment().format('L'),
      monthL0: moment().subtract(1, 'M').format('MMMM'),
      dateL0: moment().subtract(1, 'M').format('L'),
      monthL1: moment().format('MMMM'),
      dateL1: moment().format('L'),
      monthR1: moment().add(1, 'M').format('MMMM'),
      dateR1: moment().add(1, 'M').format('L'),
      monthR2: moment().add(2, 'M').format('MMMM'),
      dateR2: moment().add(2, 'M').format('L')
    };

    this.previousMonths = this.previousMonths.bind(this);
    this.nextMonths = this.nextMonths.bind(this);
  }


  previousMonths() {
    var previous, current, next, afterNext;
    var date = this.state.currentDate;

    current = this.subtractMonth(date);
    next = date;
    afterNext = this.addMonth(date);
    previous = this.subtractMonth(current);

    this.setState({
      currentDate: current,
      monthL0: moment(previous).format('MMMM'),
      dateL0: moment(previous).format('L'),
      monthL1: moment(current).format('MMMM'),
      dateL1: moment(current).format('L'),
      monthR1: moment(next).format('MMMM'),
      dateR1: moment(next).format('L'),
      monthR2: moment(afterNext).format('MMMM'),
      dateR2: moment(afterNext).format('L')
    });
  }

  nextMonths() {
    var previous, current, next, afterNext;
    var date = this.state.currentDate;

    current = this.addMonth(date);
    next = this.addMonth(current);
    afterNext = this.addMonth(next);
    previous = date;

    this.setState({
      currentDate: current,
      monthL0: moment(previous).format('MMMM'),
      dateL0: moment(previous).format('L'),
      monthL1: moment(current).format('MMMM'),
      dateL1: moment(current).format('L'),
      monthR1: moment(next).format('MMMM'),
      dateR1: moment(next).format('L'),
      monthR2: moment(afterNext).format('MMMM'),
      dateR2: moment(afterNext).format('L')
    });
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

    var date = `${month}/01/${year}`;
    return date;
  }

  addMonth(string) {
    var array = string.split('/');
    var month = parseInt(array[0]);
    var year = parseInt(array[2]);

    if (month + 1 === 13) {
      year += 1;
      month = 1;
    } else {
      month += 1;
    }

    if (month <= 9) {
      month = `0${month}`;
    }

    var date = `${month}/01/${year}`;
    return date;
  }

  render() {
    return (
      <div className='calendar' style={{'display': 'flex'}}>
        {/* <div className='cal-previous cal-month month-overflow'>
          <div className='cal-tableheader-prev'>
            <button className='cal-prev-month' style={{'hidden': true}}></button>
            <strong>{this.state.monthL0}</strong>
          </div>
          <Month month={this.state.monthL0} />
        </div> */}
        <div className='calendar-view' style={{'display': 'flex'}}>
          <div className='cal-current cal-month'>
            <div className='cal-tableheader-prev'>
              <button className='cal-current-month' onClick={this.previousMonths}></button>
              <strong>{this.state.monthL1}</strong>
            </div>
            <Month date={this.state.dateL1} reservations={this.props.reservations}/>
          </div>
          <div className='cal-next cal-month'>
            <div className='cal-tableheader-next'>
              <strong>{this.state.monthR1}</strong>
              <button className='cal-next-month' onClick={this.nextMonths}></button>
            </div>
            <Month date={this.state.dateR1} reservations={this.props.reservations}/>
          </div>
        </div>
        {/* <div className='cal-after-next cal-month month-overflow'>
          <div className='cal-tableheader-next'>
            <strong>{this.state.monthR2}</strong>
            <button className='cal-after-next-month'></button>
          </div>
          <Month month={this.state.monthR2} />
        </div> */}
      </div>
    )
  }
}

export default Calendar;