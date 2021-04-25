import _ from 'lodash';

const getValueString = (value) => {
  if (_.isObject(value)) return '[complex value]';
  return _.isString(value) ? `'${value}'` : value;
};

const getLinePostfix = (diff) => {
  switch (diff.type) {
    case 'added':
      return ` with value: ${getValueString(diff.value)}`;
    case 'removed':
      return '';
    default:
      return `. From ${getValueString(diff.oldValue)} to ${getValueString(diff.value)}`;
  }
};

const getPlainLine = (diff, path) => `Property '${path}' was ${diff.type}${getLinePostfix(diff)}`;

const formatPlain = (diffAST) => {
  const getPlainOutput = (data, path = '') => {
    const nodesToPrint = data.filter(({ type }) => type !== 'unchanged');

    return nodesToPrint.map((diffNode) => {
      const fullPath = path === '' ? diffNode.key : `${path}.${diffNode.key}`;

      if (diffNode.type === 'nested') {
        return getPlainOutput(diffNode.children, fullPath);
      }

      return getPlainLine(diffNode, fullPath);
    }).join('\n');
  };

  return getPlainOutput(diffAST);
};

export default formatPlain;
