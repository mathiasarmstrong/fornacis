import ReactDom from 'react-dom';
import KpiContainer from './view-components/kpi/kpi-container';
import {data, infoObjects} from '../../testing/mocks/kpi.mock';
import infoService from './services/info.service';
import kpiDataConverter from './helpers/kpi-data-converter';
infoService.add('metrics', infoObjects);
const kpis = kpiDataConverter(data);

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    return (
      <div>
        <KpiContainer kpis = {kpis}></KpiContainer>

      </div>);
  }
}
ReactDom.render(<App></App>, document.querySelector('#main'));
const views = {
  dodDash: [
    'dual Axis line and column',
    'fixed place columns',
    'stacked columns'
  ],
  audiencePerformance: [
    'heatmap',
    'heatmap',
    'heatmap'
  ],
  audienceTypePerformance: [
    'heatmap',
    'heatmap',
    'heatmap'
  ],
  pNL: [
    KpiContainer
  ],
  prospectingVsRetargeting: [
    'multipleAxes',
    'stacked columns',
    'stacked columns',
    'stacked columns',
    'stacked columns',
    'stacked columns',
    'stacked columns',
    'stacked columns',
    'stacked columns'
  ]
};
