import getFileContent from './src/get-file-content.js';
import buildDiffAST from './src/build-diff-ast.js';
import formatOutput from './src/formatters/index.js';

const genDiff = (pathOne, pathTwo, format = 'stylish') => {
  const fileOneContent = getFileContent(pathOne);
  const fileTwoContent = getFileContent(pathTwo);

  const diffAST = buildDiffAST(fileOneContent, fileTwoContent);

  return formatOutput(diffAST, format);
};

export default genDiff;
