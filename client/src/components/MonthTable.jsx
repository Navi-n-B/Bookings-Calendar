import react from 'react';
import ReactDataGrid from 'react-data-grid';

class MonthTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.props.columns = [
      {key: 'sunday', name: 'Su'},
      {key: 'monday', name: 'Mo'},
      {key: 'tuesday', name: 'Tu'},
      {key: 'wednesday', name: 'We'},
      {key: 'thursday', name: 'Th'},
      {key: 'friday', name: 'Fr'},
      {key: 'saturday', name: 'Sa'},
    ];
  }


  render() {
    return (
      <td className='cal-day date-avail'>1</td>
    )
  }
}


export default MonthTable;