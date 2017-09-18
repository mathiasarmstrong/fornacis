import React from 'react';
import ReactDom from 'react-dom';
import ReactHighCharts from 'react-highcharts';
import ReactHighMaps from 'react-highcharts/ReactHighmaps.src';
import * as lines from '../../testing/mocks/graph-config';
const Title = ({item}) => <h2>{item}</h2>;
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {lines, newGraph: ''};
    this.onChangeInput = this.onChangeInput.bind(this);
    this.addGraph = this.addGraph.bind(this);
  }

  componentDidMount() {
    console.log(this.refs);
  }

  addGraph() {
    lines[this.state.newGraph] = _.cloneDeep(lines.line);
    this.setState({lines});
    this.state.newGraph = '';
  }

  onChangeInput(e) {
    this.setState({newGraph: e.target.value});
  }

  render() {
    return (
      <div>
        {_.map(this.state.lines, (config, key) => key === 'heatmap'
          ? <div key= {key}>
            <Title item={key}></Title>
            <ReactHighMaps ref = {key} config = {config}></ReactHighMaps>
          </div>
          : <div key= {key}>
            <Title item={key}></Title>
            <ReactHighCharts ref = {key} config = {config}></ReactHighCharts>
          </div>)
        }
        <input onBlur = {this.onChangeInput}></input>
        <button onClick ={this.addGraph}>Add Graph</button>
      </div>);
  }
}
ReactDom.render(<App></App>, document.querySelector('#main'));
