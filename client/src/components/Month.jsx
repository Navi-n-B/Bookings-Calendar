import React from 'react';
import moment from 'moment';
import example from '../example.js';
import $ from 'jquery';

class Month extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      days: [],
      cacheDays: [],
      r1: [],
      r2: [],
      r3: [],
      r4: [],
      r5: [],
      r6: [],
      selectedStart: null,
      selectedEnd: null,
      selectedRes: this.props.selectedRes,
      maxPossibleEnd: null,
      selection: false,
      initialzed: false,
      month: moment(this.props.date).format('MMMM'),
      year: moment(this.props.date).format('YYYY')
    };

    this.month = moment(this.props.date).format('MMMM');
    this.clickHandler = this.clickHandler.bind(this);
    this.clearSelected = this.clearSelected.bind(this);
    this.linkStyle = {hidden: this.state.selection};
  }

  // need to pivot to a 2 month render to handle reservations spanning different months
  componentDidMount() {
   this.generateDays();
  }

  componentDidUpdate(prevProps) {
    if (this.props.reservations !== prevProps.reservations) {
      this.generateDays();
    }
    if (this.props.date !== prevProps.date) {
      var month = moment(this.props.date).format('MMMM');
      var year = moment(this.props.date).format('YYYY');

      this.setState({
        month: month,
        year: year
      })
      this.generateDays();
    }
   }


  generateDays() {
    var temp, r1, r2, r3, r4, r5, r6;
    var date = moment(this.props.date).date(1).day();
    var lastDate = moment(this.props.date).daysInMonth();
    var dateArray = [];
    var count = 1;

    for (var i = 0; i <= 41; i++) {
      if (i < date || i >= (lastDate + date)) {
        dateArray.push({date: null, availability: 0, class: 'date-empty'});
      }
      if (i >= date && i < (date + lastDate)) {
        temp = this.generateDateObject(count);
        dateArray.push(temp);
        count++;
      }
    }
  this.parseRows(dateArray);
  if (!this.state.initialzed) {
    this.setState({
      initialzed: true,
      cacheDays: dateArray
    })
  }
  }

  parseRows(dateArray) {
    var r1, r2, r3, r4, r5, r6;
    r1 = dateArray.slice(0, 7);
    r2 = dateArray.slice(7, 14);
    r3 = dateArray.slice(14, 21);
    r4 = dateArray.slice(21, 28);
    r5 = dateArray.slice(28, 35);
    r6 = dateArray.slice(35, 42);

    this.setState({
      r1: r1,
      r2: r2,
      r3: r3,
      r4: r4,
      r5: r5,
      r6: r6,
      days: dateArray
    });
  }

  generateDateObject(D) {
    var M = this.props.month;
    var Y = this.state.year;
    var dateString = `${M} ${D} ${Y}`;
    if (moment(dateString).isBefore(Date.now())) {
      return { date: D, availability: 0 , class: `${M}-${D}-${Y} date-unavail`};
    }
    if (!this.props.reservations || this.props.reservations === 0 || !this.props.reservations[Y]) {
      return { date: D, availability: 1, class: `${M}-${D}-${Y} date-avail`};
    }
    if (this.props.reservations[Y][M]) {
      if (this.props.reservations[Y][M][D]) {
        return { date: D, availability: 0 , class: `${M}-${D}-${Y} date-unavail`};
      } else {
        return { date: D, availability: 1, class: `${M}-${D}-${Y} date-avail`};
      }
    }
}

  getKey(row, index) {
    const month = moment(this.props.date).format('MMM');
    return (`` + month + row + index);
  }

  updateSelected(resDates) {
    var start = this.state.selectedStart;
    var end = this.state.selectedEnd;
    var dates = this.state.days;
    var className;
    var month = this.state.month;
    var year = this.state.year;

    if (this.props.selectedRes.length > 1) {
      for (var i = 0; i < dates.length; i++) {
        var date;
        if (dates[i].date) {
          date = `${month}-${dates[i].date}-${year}`;
          if (date === resDates[0] || date === resDates[1]) {
            if (!dates[i].class.includes('cal-sel')) {
              dates[i].class += ' cal-sel';
            }
          }
          if (moment(date).isBefore(resDates[0])) {
            if (dates[i].class.includes('cal-sel')) {
              dates[i].class = dates[i].class.split(' ')[0] + ' ' + dates[i].class.split(' ')[1];
            }
          }
          if (moment(date).isAfter(resDates[1])) {
            if (dates[i].class.includes('cal-sel')) {
              dates[i].class = dates[i].class.split(' ')[0] + ' ' + dates[i].class.split(' ')[1];
            }
          }
          if (moment(date).isBetween(resDates[0], resDates[1])) {
            if (!dates[i].class.includes('cal-sel')) {
              dates[i].class += ' cal-sel';
            }
          }
        }
      }
    }

    this.parseRows(dates);
    this.setState({
      selection: true
    });
  }

  clickHandler(e) {
    if (e.target.className.includes('date-avail')) {
      var date = e.target.className.split(' ')[0];

      if (this.state.selectedStart === null) {
        if (this.checkAdjacent(date)) {
          var resDates = this.state.selectedRes;
          resDates[0] = date;
          var $target = $(`.${date}`);
          this.setState({
            selectedStart: date,
            selectedRes: resDates
          });

          $target.addClass('cal-sel');
          this.calculateMaxDate(date, this.toggleSelectableDates.bind(this));
          this.wasClicked();
        }
      }

      if (this.state.selectedStart  && this.state.selectedEnd === null) {
        if (moment(this.state.selectedStart).isBefore(date)) {
          var resDates = this.state.selectedRes;
          resDates[1] = date;
          var $target = $(`.${date}`);
          this.setState({
            selectedEnd: date,
            selectedRes: resDates
          });

          this.wasClicked();
        }
      }

      if (this.state.selectedStart && this.state.selectedEnd) {
        if (moment(date).isBefore(this.state.selectedStart)) {
          var resDates = this.state.selectedRes;
          resDates[0] = date;
          var $target = $(`.${date}`);
          this.setState({
            selectedStart: date,
            selectedRes: resDates
          });

          this.wasClicked();
        }

        if (moment(date).isBetween(this.state.selectedStart, this.state.selectedEnd)) {
          var resDates = this.state.selectedRes;
          resDates[1] = date;
          var $target = $(`.${date}`);
          this.setState({
            selectedEnd: date,
            selectedRes: resDates
          });

          this.wasClicked();
        }

        if (moment(this.state.selectedEnd).isBefore(date)) {
          var resDates = this.state.selectedRes;
          resDates[1] = date;
          var $target = $(`.${date}`);
          this.setState({
            selectedEnd: date,
            selectedRes: resDates
          });

          this.wasClicked();
        }
      }

      if (this.state.selectedRes.length === 2) {
        this.updateSelected(resDates);
      }
    }
  }

  calculateMaxDate(input, callback) {
    var dates = Array.from(this.state.days);
    var day = input.split('-')[1];
    var max;
    for (var i = 0; i < dates.length; i++) {
      if (!dates[i].class.includes('date-empty')) {
        if (dates[i].date < day) {
          dates[i].class.replace('date-avail', 'date-unavail');
        }
        if (dates[i].class.includes('date-unavail')) {
          break;
        }
        if (dates[i].date > day && dates[i].class.includes('date-avail')) {
          max = dates[i].class.split(' ')[0];
        }
      }
    }
    this.setState({
      maxPossibleEnd: max
    });

    callback(day, max);
  }

  toggleSelectableDates(min, max) {
    var min, max, temp;
    var dates = Array.from(this.state.days);
    if (max) {
      max = max.split('-')[1];
      for (var i = 0; i < dates.length; i++) {
        if (dates[i].date < min || dates[i].date > max) {
          if (dates[i].class.includes('date-avail')) {
            dates[i].class = dates[i].class.split(' ')[0] + ' date-unavail';
          }
        }
      }

      this.setState({
        days: dates
      })
    }
  }

  untoggleSelectableDates() {
    var dates = this.state.cacheDays;

    this.setState({
      days: dates
    });
    this.generateDays();
  }

  clearSelected() {
    var dates = Array.from(this.state.days);
    for (var i = 0; i < dates.length; i++) {
      if (dates[i].class.includes('cal-sel')) {
        dates[i].class = dates[i].class.split(' ')[0] + ' ' + dates[i].class.split(' ')[1];
      }
    }

    this.setState({
      days: dates,
      selectedStart: null,
      selectedEnd: null,
      selectedRes: [],
      selection: false
    })

    this.untoggleSelectableDates();
  }

  checkAdjacent(date) {
    var next;
    var dates = this.state.days;
    for (var i = 0; i < dates.length; i++) {
      if (dates[i].class.split(' ')[0] === date) {
        next = dates[i+1].class;
        break;
      }
    }

    if (next.includes('date-avail')) {
      return true;
    } else {
      return false;
    }
  }

  wasClicked() {
    this.setState({
      selection: true
    })
  }



  render() {
    return (
      <div>
          <table className='calendar-month' onClick={this.clickHandler}>
            <tbody>
              <tr className='day-headers'>
                <td>Su</td>
                <td>Mo</td>
                <td>Tu</td>
                <td>We</td>
                <td>Th</td>
                <td>Fr</td>
                <td>Sa</td>
              </tr>
              <tr>{this.state.r1.map((days, index) => (
                <td key={this.getKey(this.state.r1, index)} className={days.class}>{days.date}</td>))}
              </tr>
              <tr>{this.state.r2.map((days, index) => (
                <td key={this.getKey(this.state.r2, index)} className={days.class}>{days.date}</td>))}
              </tr>
              <tr>{this.state.r3.map((days, index) => (
                <td key={this.getKey(this.state.r3, index)} className={days.class}>{days.date}</td>))}
              </tr>
              <tr>{this.state.r4.map((days, index) => (
                <td key={this.getKey(this.state.r4, index)} className={days.class}>{days.date}</td>))}
              </tr>
              <tr>{this.state.r5.map((days, index) => (
                <td key={this.getKey(this.state.r5, index)} className={days.class}>{days.date}</td>))}
              </tr>
              <tr>{this.state.r6.map((days, index) => (
                <td key={this.getKey(this.state.r6, index)} className={days.class}>{days.date}</td>))}
              </tr>
            </tbody>
          </table>
          <a className='clear-dates' onClick={this.clearSelected} style={this.state.selection ? {visibility: 'visible'} : {visibility: 'hidden'}}>Clear selected dates</a>
      </div>
    )
  }
}

export default Month;