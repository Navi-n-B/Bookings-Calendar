import React from 'react';
import moment from 'moment';
import { FixedSizeGrid as Grid } from 'react-window';
import example from '../example.js';
import $ from 'jquery';

class SelectDates extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      days: [],
      cacheDays: [],
      intialized: 0,
      start: null,
      end: null,
      resDates: [null, null],
      current: this.props.current,
      next: this.props.next,
      cleared: false,
      clearRequest: this.props.clear
    };

    this.leftDate = this.props.current;
    this.rightDate = this.props.next;
    this.discounts = [this.props.listing.discount_week, this.props.listing.discount_month];
    this.clearDates = this.clearDates.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
  }

  componentDidMount() {
    this.generateCalendar();
    // console.log(this.state.days);
  }

  componentDidUpdate(prevProps) {
    if (this.props.current !== prevProps.current) {
      this.generateCalendar();
    }
    if (this.props.reservations != prevProps.reservations) {
      this.generateCalendar();
    }
    if (this.props.current != prevProps.current) {
      this.setState({
        current: this.props.current,
        next: this.props.next
      });
    }
  }

  generateCalendar() {
    // pass input as 'MMMM YYYY'
    var temp, output = [];
    var month1 = moment(this.props.current).month('YYYY-MM');
    var month2 = moment(this.props.next).month('YYYY-MM');

    var firstDay1 = moment(month1).date(1).day();
    var lastDate1 = moment(month1).daysInMonth();
    var firstDay2 = moment(month2).date(1).day();
    var lastDate2 = moment(month2).daysInMonth();
    var count = 1;

    for (var i = 0; i < 42; i++) {
      if (i < firstDay1 || i >= (lastDate1 + firstDay1)) {
        output.push({date: null, availability: 1, class: 'date-empty', i: i});
      }

      if (i >= firstDay1 && i < (firstDay1 + lastDate1)) {
        temp = this.generateDateObject(count, month1);
        temp.i = i;
        output.push(temp);
        count++
      }
    }

    count = 1;
    for (var j = 0; j < 42; j++) {
      if (j < firstDay2 || j >= (lastDate2 + firstDay2)) {
        output.push({date: null, availability: 1, class: 'date-empty', i: j + 42});
      }

      if (j >= firstDay2 && j < (firstDay2 + lastDate2)) {
        temp = this.generateDateObject(count, month2);
        temp.i = j + 42;
        output.push(temp);
        count++
      }
    }

    // console.log(output);

      if (this.state.intialized > 1) {
        this.setState({
          days: output
        });
      } else {
        this.setState({
          days: output,
          cacheDays: output,
          intialized: this.state.intialized++
        });
      }
  }

  generateDateObject(day, month) {
    var D = day;
    if (day <= 9) {
      D = '0' + day;
    }
    var Y = moment(month).format('YYYY');
    var M = moment(month).format('MMMM');
    var dateString = Y + '-' + M + '-' + day;
    // console.log(dateString);
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
      if (this.props.reservations[Y][M][day]) {
        return { date: day, availability: 0 , class: `${dateString} date-unavail`};
      } else {
        return { date: day, availability: 1, class: `${dateString} date-avail`};
      }
    }
  }

  getKey(date, index) {
    if (date < 42) {
      var M = moment(this.leftDate).format('MM')
    }
    if (date >= 43) {
      var M = moment(this.rightDate).format('MM');
    }
    return (`${index + M + date}`);
  }

  clearDates() {
    if (!this.state.start && !this.state.end) {
      return;
    }
    var start = this.state.start.i;

    if (this.state.end) {
      var end = this.state.end.i;
      this.untoggleHighlightBetween(start, end)
    }
    this.untoggleSelected();

    this.setState({
      start: null,
      end: null,
      resDates: [],
      days: this.state.cacheDays
    });
  }


  clickHandler(e) {
    if (e.target.className.includes('date-avail')) {
      var date = e.target.className.split(' ')[0];
      // first click: Select start date
      if (!this.state.start && !this.state.end) {
        var index = this.getIndex(date);

        if (this.checkAdjacent(index)) {
          $(`.${date}`).addClass('cal-sel');
          this.setState({
            start: this.state.days[index],
            resDates: [date, null]
          });
          this.props.handleStartChange(date);
          // console.log(`Start date of ${date} selected!`);
        }
      }

      // second click: Selecting a valid end date
      if (this.state.start && !this.state.end) {
        var startObj = this.state.start;
        var start = startObj.i;
        var startDate = this.state.start.class.split(' ')[0];
        if (moment(date).isAfter(startDate)) {
          var end = this.getIndex(e.target.className.split(' ')[0]);

          if (this.checkBetween(start, end)) {
            $(`.${date}`).addClass('cal-sel');
            // console.log(start, end);
            this.toggleHighlightBetween(start, end);
            this.setState({
              end: this.state.days[end],
              resDates: [startDate, date]
            });
            this.props.handleEndChange(date);
            // console.log(`End date of ${date} selected!`);
          }
        }
      }

      // extending/shortening selected stay
      if (this.state.start && this.state.end) {
        var startDate = this.state.start.class.split(' ')[0];
        var endDate = this.state.end.class.split(' ')[0];
        var dateIndex = this.getIndex(date);
        var currentStart = this.state.resDates[0];
        var currentEnd = this.state.resDates[1];

        // extending before selected start
        if (moment(date).isBefore(startDate)) {
          var startIndex = this.state.start.i;

          if (this.checkBetween(dateIndex, startIndex)) {
            var endIndex = this.state.end.i;
            $(`.${startDate}`).removeClass('cal-sel');
            $(`.${date}`).addClass('cal-sel');
            this.setState({
              start: this.state.days[dateIndex],
              resDates: [date, currentEnd]
            });
            this.props.handleStartChange(date);
            this.toggleHighlightBetween(dateIndex, endIndex);
          }
        }

        // extending after selected end
        if (moment(date).isAfter(endDate)) {
          var endIndex = this.state.end.i;

          if (this.checkBetween(endIndex, dateIndex)) {
            var startIndex = this.state.start.i;
            $(`.${endDate}`).removeClass('cal-sel');
            $(`.${date}`).addClass('cal-sel');
            this.setState({
              end: this.state.days[dateIndex],
              resDates: [currentStart, date]
            });
            this.props.handleEndChange(date);
            this.toggleHighlightBetween(startIndex, dateIndex);
          }
        }

        // short stay
        if (moment(date).isBefore(endDate) && moment(date).isAfter(startDate)) {
          if (date !== startDate) {
            var startIndex = this.state.start.i;
            var endIndex = this.state.end.i;

            if (this.checkBetween(startIndex, dateIndex)) {
              this.untoggleHighlightBetween(startIndex, endIndex);
              $(`.${endDate}`).removeClass('cal-sel');
              $(`.${date}`).addClass('cal-sel');
              this.setState({
                end: this.state.days[dateIndex],
                resDates: [currentStart, date]
              });
              this.props.handleEndChange(date);
              this.toggleHighlightBetween(startIndex, dateIndex);
            }
          }
        }
      }

      if (date === startDate) {
        this.clearDates();
      }
    }
  }

  checkAdjacent(index) {
    if (this.state.days[index++].class.includes('date-avail')) {
      return true;
    } else {
      return false;
    }
  }

  checkBetween(start, end) {
    for (var i = start; i < end; i++) {
      if (!this.state.days[i].availability) {
        return false;
      }
    }
    return true;
  }

  toggleHighlightBetween(start, end) {
    for (var i = start + 1; i < end; i++) {
      if (this.state.days[i].class.includes('date-avail')) {
        var className = this.state.days[i].class.split(' ')[0];
        var $target = $(`.${className}`);
        $target.addClass('date-highlight');
      }
    }
  }

  untoggleHighlightBetween(start, end) {
    for (var i = start + 1; i < end; i++) {
      if (this.state.days[i].class.includes('date-avail')) {
        var className = this.state.days[i].class.split(' ')[0];
        var $target = $(`.${className}`);
        $target.removeClass('date-highlight');
      }
    }
  }

  untoggleSelected() {
    var startClass = this.state.start.class.split(' ')[0];
    $(`.${startClass}`).removeClass('cal-sel');

    if (this.state.end) {
      var endClass = this.state.end.class.split(' ')[0];
      $(`.${endClass}`).removeClass('cal-sel');
    }
  }

  getIndex(date) {
    var index = parseInt(date.split('-')[2]) - 1;
    // console.log(index);
    var start = moment(date).date(1).day();
    index += start;

    if (this.state.days[index].class.split(' ')[0] === date) {
      return index;
    } else {
      return index + 42;
    }
  }


  render() {
    if (!this.props.modal) {
      const Current = ({ columnIndex, rowIndex, style }) => {
        this.state.days.slice(0, 42).map((day) => (
          <div style={style} key={this.getKey(day.date, index)} className={day.class}></div>
        ))
      }

        return (
          <div className='calendar-grid-container'>
            <div className='calendar-grid-view' style={{'display': 'flex', 'flexDirection': 'row'}}>
              <div className='cal-grid cal-left'>
              <div className='day-header'>Su</div>
              <div className='day-header'>Mo</div>
              <div className='day-header'>Tu</div>
              <div className='day-header'>We</div>
              <div className='day-header'>Th</div>
              <div className='day-header'>Fr</div>
              <div className='day-header'>Sa</div>
                {this.state.days.slice(0, 42).map((day, index) => (
                  <div key={this.getKey(day.date, index)} className={day.class} onClick={this.clickHandler}>{day.date}</div>
                ))}
              </div>
              <div className='cal-grid cal-right'>
              <div className='day-header'>Su</div>
              <div className='day-header'>Mo</div>
              <div className='day-header'>Tu</div>
              <div className='day-header'>We</div>
              <div className='day-header'>Th</div>
              <div className='day-header'>Fr</div>
              <div className='day-header'>Sa</div>
                {this.state.days.slice(42).map((day, index) => (
                  <div key={this.getKey(day.date, index)} className={day.class} onClick={this.clickHandler}>{day.date}</div>
                ))}
              </div>
            </div>
            <div className='clear-dates' style={this.state.start ? {'color': 'rgb(34, 34, 34)'} : {'color': 'rgb(190, 190, 190)', 'cursor': 'not-allowed'}} onClick={this.clearDates}>Clear dates</div>
          </div>
        )
    }
  }
}


export default SelectDates