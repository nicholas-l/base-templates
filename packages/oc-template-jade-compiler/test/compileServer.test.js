jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;

const path = require('path');
const fs = require('fs-extra');
const compileServer = require('../lib/compileServer.js');

const componentPath = path.join(__dirname, '../../../mocks/jade-component');
const publishPath = path.join(componentPath, '_package');
const publishFileName = 'server.js';

const options = {
  componentPackage: fs.readJsonSync(componentPath + '/package.json'),
  componentPath,
  publishPath,
  publishFileName
};

test('Should correctly compile the server', done => {
  compileServer(options, (err, compiledServerInfo) => {
    expect(err).toBeNull();
    expect(compiledServerInfo).toMatchSnapshot();
    expect(
      fs.readFileSync(path.join(publishPath, publishFileName), 'UTF8')
    ).toMatchSnapshot();
    fs.removeSync(path.join(publishPath, publishFileName));
    done();
  });
});