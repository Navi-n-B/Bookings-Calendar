import React from 'react';
import moment from 'moment';

class Month extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      days: []
    };
  }

  componentDidMount() {
    var month = this.props.month;
    var date = moment().year(2020).month(month).date(1).day();
    var lastDate = moment().year(2020).month(month).daysInMonth();
    var dateArray = [];
    var count = 1;

    for (var i = 0; i < 41; i++) {
      if (i < date || i >= (lastDate + date)) {
        dateArray.push(null);
      }
      if (i >= date && i < (date + lastDate)) {
        dateArray.push(count);
        count++;
      }
    }

    this.setState({
      days: dateArray
    });

  }



  render() {
    return (
      <div>
          <table>
            <tbody>
              <tr>
                <td className='cal-day date-avail'>{this.state.days[0]}</td>
                <td className='cal-day date-avail'>{this.state.days[1]}</td>
                <td className='cal-day date-avail'>{this.state.days[2]}</td>
                <td className='cal-day date-avail'>{this.state.days[3]}</td>
                <td className='cal-day date-avail'>{this.state.days[4]}</td>
                <td className='cal-day date-avail'>{this.state.days[5]}</td>
                <td className='cal-day date-avail'>{this.state.days[6]}</td>
              </tr>
              <tr>
                <td className='cal-day date-avail'>{this.state.days[7]}</td>
                <td className='cal-day date-avail'>{this.state.days[8]}</td>
                <td className='cal-day date-avail'>{this.state.days[9]}</td>
                <td className='cal-day date-avail'>{this.state.days[10]}</td>
                <td className='cal-day date-avail'>{this.state.days[11]}</td>
                <td className='cal-day date-avail'>{this.state.days[12]}</td>
                <td className='cal-day date-avail'>{this.state.days[13]}</td>
              </tr>
              <tr>
                <td className='cal-day date-avail'>{this.state.days[14]}</td>
                <td className='cal-day date-avail'>{this.state.days[15]}</td>
                <td className='cal-day date-avail'>{this.state.days[16]}</td>
                <td className='cal-day date-avail'>{this.state.days[17]}</td>
                <td className='cal-day date-avail'>{this.state.days[18]}</td>
                <td className='cal-day date-avail'>{this.state.days[19]}</td>
                <td className='cal-day date-avail'>{this.state.days[20]}</td>
              </tr>
              <tr>
                <td className='cal-day date-avail'>{this.state.days[21]}</td>
                <td className='cal-day date-avail'>{this.state.days[22]}</td>
                <td className='cal-day date-avail'>{this.state.days[23]}</td>
                <td className='cal-day date-avail'>{this.state.days[24]}</td>
                <td className='cal-day date-avail'>{this.state.days[25]}</td>
                <td className='cal-day date-avail'>{this.state.days[26]}</td>
                <td className='cal-day date-avail'>{this.state.days[27]}</td>
              </tr>
              <tr>
                <td className='cal-day date-avail'>{this.state.days[28]}</td>
                <td className='cal-day date-avail'>{this.state.days[29]}</td>
                <td className='cal-day date-avail'>{this.state.days[30]}</td>
                <td className='cal-day date-avail'>{this.state.days[31]}</td>
                <td className='cal-day date-avail'>{this.state.days[32]}</td>
                <td className='cal-day date-avail'>{this.state.days[33]}</td>
                <td className='cal-day date-avail'>{this.state.days[34]}</td>
              </tr>
              <tr>
                <td className='cal-day date-avail'>{this.state.days[35]}</td>
                <td className='cal-day date-avail'>{this.state.days[36]}</td>
                <td className='cal-day date-avail'>{this.state.days[37]}</td>
                <td className='cal-day date-avail'>{this.state.days[38]}</td>
                <td className='cal-day date-avail'>{this.state.days[39]}</td>
                <td className='cal-day date-avail'>{this.state.days[40]}</td>
                <td className='cal-day date-avail'>{this.state.days[41]}</td>
              </tr>
            </tbody>
          </table>
      </div>
    )
  }
}

export default Month;