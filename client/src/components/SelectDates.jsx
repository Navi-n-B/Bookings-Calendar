import React from 'react';
import moment from 'moment';
import { FixedSizeGrid as Grid } from 'react-window';

class SelectDates extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      leftCal: [],
      rightCal: [],
      cacheLeft: [],
      cacheRight: [],
      days: [],
      cacheDays: [],
      intialized: false
    };

    this.leftDate = this.props.dateL1;
    this.rightDate = this.props.dateR1;
    this.discounts = [this.props.listing.discount_week, this.props.listing.discount_month];
  }

  componentDidMount() {
  }

  generateCalendar() {
    // pass input as 'MMMM YYYY'
    var temp, output = [];
    var month1 = moment(this.props.dateL1).month('YYYY-MM');
    var month2 = moment(this.props.dateR1).month('YYYY-MM');

    var firstDay1 = moment(month1).date(1).day();
    var lastDate1 = moment(month1).daysInMonth();
    var firstDay2 = moment(month2).date(1).day();
    var lastDate2 = moment(month2).daysInMonth();
    var count = 1;

    for (var i = 0; i <= 41; i++) {
      if (i < firstDay1 || i >= (lastDate1 + firstDay1)) {
        output.push({date: null, avail: 0, class: 'date-empty'});
      }

      if (i >= firstDay1 && i < (firstDay1 + lastDate1)) {
        temp = this.generateDateObject(count, month1);
        output.push(temp);
        count++
      }
    }

    count = 1;
    for (var i = 42; i <= 83; i++) {
      if (i < firstDay2 || i >= (lastDate2 + firstDay2)) {
        output.push({date: null, avail: 0, class: 'date-empty'});
      }

      if (i >= firstDay2 && i < (firstDay2 + lastDate2)) {
        temp = this.generateDateObject(count, month2);
        output.push(temp);
        count++
      }
    }

      if (this.state.intialized) {
        this.setState({
          leftCal: output.slice(0, 42),
          rightCal: output.slice(42),
          days: output
        });
      } else {
        this.setState({
          leftCal: output.slice(0, 42),
          rightCal: output.slice(42),
          cacheLeft: output.slice(0, 42),
          cacheRight: output.slice(42),
          cacheDays: output,
          intialized: true
        });
      }
  }

  generateDateObject(day, month) {
    if (day <= 9) {
      day = '0' + day;
    }
    var dateString = month + day;
    if (moment(dateString).isBefore(Date.now())) {
      return { date: day, availability: 0 , class: `${dateString} date-unavail`};
    }
    if (this.props.reservations[Y] === undefined || this.props.reservations[Y][M] === undefined) {
      return { date: day, availability: 1, class: `${dateString} date-avail`};
    }
    if (this.props.reservations.length === 0) {
      return { date: day, availability: 1, class: `${dateString} date-avail`};
    }
    if (this.props.reservations[Y][M]) {
      if (this.props.reservations[Y][M][D]) {
        return { date: day, availability: 0 , class: `${dateString} date-unavail`};
      } else {
        return { date: day, availability: 1, class: `${dateString} date-avail`};
      }
    }
  }

  getKey(index) {
    if (index < 42) {
      var M = moment(this.leftDate).format('MM')
    }
    if (index >= 43) {
      var M = moment(this.rightDate).format('MM');
    }
    return (`${M}-${index}`);
  }

  getGrindIndexes(index) {
    var row = Math.floow(index/7);
    var col = index - (row * 7);
    return [row, col];
  }



  render() {
    if (!this.props.modal) {
      if (this.discounts.length > 0) {
        const left = this.state.days.slice(0, 42);
        const right = this.state.days.slice(42);
        const leftGrid =
        return (
          <div className='calendar-container'>
            <h2 className='cal-div-title'>Select Dates</h2>
            <span class='cal-discounts'>This hose offers {this.discounts[0]}% off if you stay a week and a {this.discounts[1]}% monthly discount.</span>
            <div className='calendar-view' style={{'display': 'flex', 'flex-direction': 'row'}}>
              <div className='cal-left'>
                <Grid
                  columnCount={7}
                  rowCount={7}
                >

                </Grid>
              </div>
              <div className='cal-right'>

              </div>

            </div>
          </div>
        )
      }
    }
  }















}