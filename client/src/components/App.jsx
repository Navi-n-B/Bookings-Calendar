import React from 'react';
import Bookings from './Bookings.jsx';
import Calendar from './Calendar.jsx';
import $ from 'jquery';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reservations: []
    };
  }


  componentDidMount() {
    $.ajax({
      method: 'GET',
      url: '/rooms'})
      .done((err, data) => {
        if (data) {
          this.setState({
            reservations: data
          });
          console.log(data);
        } else {
          console.log('error retrieving data');
        }
      })
  }


  render() {
    return (
      <div>
        <Calendar />
        <Bookings />
      </div>
    )
  }
}

export default App;