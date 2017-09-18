export default ({head, body, footer, className, keyName: key}) =>
  <div className = {className} key = {key}>
    <span>{head}</span>
    <span>{body}</span>
    <span>{footer}</span>
  </div>;
