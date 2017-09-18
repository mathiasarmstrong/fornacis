import css from './kpi.scss';
import Kpi from './kpi';
import {numberFilter} from '../../helpers/number-filter';
import Sparkline from '../graphs/sparkline/sparkline';
export default class KpiContainer extends React.Component {
  constructor(props) {
    super(props);
    this.constructKpi = this.constructKpi.bind(this);
  }

  constructKpi(kpis) {
    return _.map(kpis, ({title = '', format = '$', body = [], footer = ''}) => {
      body = _.castArray(body);
      const series = [{data: [7, 2, 5]}];
      return {
        head: <h2>{title}</h2>,
        body: _.map(body, ({value, prefix}, idx) =>
          <div key = {`body-${title}-${idx}`}> {prefix} {numberFilter(value, format)}</div>),
        footer: <Sparkline options= {{series}}></Sparkline>
      };
    });
  }

  render() {
    return (
      <ul className = {css.container}>
        {_.map(this.constructKpi(this.props.kpis), ({head, body, footer}, i) =>
          <Kpi className = {css.kpiItem}
            key = {`kpi${i}`}
            head = {head}
            body = {body}
            footer = {footer}/>)}
      </ul>
    );
  }
}
