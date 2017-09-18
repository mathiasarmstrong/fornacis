import ReactDom from 'react-dom';
import KpiContainer from './view-components/kpi/kpi-container';
import {data, infoObjects} from '../../testing/mocks/kpi.mock';
import infoService from './services/info.service';
import kpiDataConverter from './helpers/kpi-data-converter';
import ReactHighcharts from 'react-highcharts';
import Button from 'material-ui/Button';
import Menu, {MenuItem} from 'material-ui/Menu';

infoService.add('metrics', infoObjects);
import * as graphs from '../../testing/mocks/graph-config';
const kpis = kpiDataConverter(data);


const views = _.mapValues(graphs, options => <ReactHighcharts config = {options}></ReactHighcharts>);
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {view: 'doubleBar', anchorEl: null, open: false};
    this.handleClick = this.handleClick.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
  }

  componentDidMount() {
  }


  handleClick(event) {
    this.setState({
      open: true,
      anchorEl: event.currentTarget
    });
    console.log(event.currentTarget);
  }

  handleRequestClose() {
    this.setState({open: false});
  }
  render() {
    return (
      <div>
        <KpiContainer kpis = {kpis}></KpiContainer>
        <div>
          <Button
            aria-owns={this.state.open ? 'simple-menu' : null}
            aria-haspopup="true"
            onClick={this.handleClick}
          >
            {this.state.view}
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={this.state.anchorEl}
            open={this.state.open}
            onRequestClose={this.handleRequestClose}
          >
            {_.map(views, (view, key) => <MenuItem onClick={this.handleRequestClose} key = {key}>{key}</MenuItem>)}
          </Menu>
        </div>
        <div>{views[this.state.view]}</div>
      </div>);
  }
}
ReactDom.render(<App></App>, document.querySelector('#main'));
// const views = {
//   dodDash: [
//     'dual Axis line and column',
//     'fixed place columns',
//     'stacked columns'
//   ],
//   audiencePerformance: [
//     'heatmap',
//     'heatmap',
//     'heatmap'
//   ],
//   audienceTypePerformance: [
//     'heatmap',
//     'heatmap',
//     'heatmap'
//   ],
//   pNL: [
//     KpiContainer
//   ],
//   prospectingVsRetargeting: [
//     'multipleAxes',
//     'stacked columns',
//     'stacked columns',
//     'stacked columns',
//     'stacked columns',
//     'stacked columns',
//     'stacked columns',
//     'stacked columns',
//     'stacked columns'
//   ]
// };
