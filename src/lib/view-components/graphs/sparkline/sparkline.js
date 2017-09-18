import ReactHighcharts from 'react-highcharts';
import defaultOptions from './sparkline-options';

export default class SparkLine extends React.Component {
  componentWillUnmount() {
    this.chart.destroy();
  }

  render() {
    const options = _.merge(defaultOptions, this.props.options);
    return <ReactHighcharts config = {options}></ReactHighcharts>;
  }
}
