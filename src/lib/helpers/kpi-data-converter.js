import infoService from '../services/info.service';
export default ({rows, columns}) => _.map(columns, (name, idx) => {
  const [value, mtd] = rows[idx];
  return _.assign(_.get(infoService, ['metrics', name], {}), {
    value: rows[idx][0],
    body: [
      {value},
      {prefix: 'MTD', value: mtd}
    ]
  });
});
