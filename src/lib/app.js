import React from 'react';
import ReactDom from 'react-dom';
import ReactHighCharts from 'react-highcharts';
import * as lines from '../../testing/mocks/graph-config';

setTimeout(() => {
  lines.heatGraph = _.cloneDeep(lines.line);
  console.log(lines);
}, 100);
// const graphs = ;
export default class App extends React.Component {
  componentDidMount() {
    console.log(this.refs);
  }

  render() {
    return (
      <div>
        {_.map(lines, (config, key) =>
          <ReactHighCharts key = {key} ref = {key} config = {config}></ReactHighCharts>)}
      </div>
    );
  }
}
ReactDom.render(<App></App>, document.querySelector('#main'));
