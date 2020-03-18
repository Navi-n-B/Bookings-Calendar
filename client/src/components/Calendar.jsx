import React from 'react';
import moment from 'moment';
import Month from './Month.jsx';
// import Calendar from './Calendar';

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      monthL0: moment().subtract(1, 'M').format('MMMM'),
      monthL1: moment().format('MMMM'),
      monthR1: moment().add(1, 'M').format('MMMM'),
      monthR2: moment().add(2, 'M').format('MMMM')
    };
  }

  render() {
    return (
      <div className='calendar' style={{'display': 'flex'}}>
        <div className='cal-previous cal-month month-overflow'>
          <div className='cal-tableheader-prev'>
            <button className='cal-prev-month' style={{'hidden': true}}></button>
            <strong>{this.state.monthL0}</strong>
          </div>
          <Month month={this.state.monthL0} />
        </div>
        <div className='calendar-view' style={{'display': 'flex'}}>
          <div className='cal-current cal-month'>
            <div className='cal-tableheader-prev'>
              <button className='cal-current-month'></button>
              <strong>{this.state.monthL1}</strong>
            </div>
            <Month month={this.state.monthL1} />
          </div>
          <div className='cal-next cal-month'>
            <div className='cal-tableheader-next'>
              <strong>{this.state.monthR1}</strong>
              <button className='cal-next-month'></button>
            </div>
            <Month month={this.state.monthR1} />
          </div>
        </div>
        <div className='cal-after-next cal-month month-overflow'>
          <div className='cal-tableheader-next'>
            <strong>{this.state.monthR2}</strong>
            <button className='cal-after-next-month'></button>
          </div>
          <Month month={this.state.monthR2} />
        </div>
      </div>
    )
  }
}

export default Calendar;