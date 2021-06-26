const Gulp = require('gulp');
const execSync = require('child_process').execSync;
const { src, dest } = require('gulp');
const replace = require('gulp-replace')

function replaceType(cb) {    
    src(['dist/frontend-admin/index.html'])
        .pipe(replace('type="module"', 'type="text/javascript"'))
        .pipe(dest('dist/frontend-admin/'));
    cb();
};

function build(generateStats = false, optimize = false, prod = true) {
  execSync(
    `ng build` +
    (prod ? ' --prod' : '') +
    (generateStats ? ' --statsJson' : '') +
    (optimize ? ' --buildOptimizer' : '') +
    {stdio: 'inherit'}
  )
}

function showWebpackReport() {
  build(true);
  execSync(
    `node ./node_modules/webpack-bundle-analyzer/lib/bin/analyzer ./dist/stats.json`,
    {stdio: "inherit"}
  )
}

function serve() {
  const environment = getEnvironment();
  execSync(
    'ng serve' +
    ` --proxy-config conf/${environment.env}/proxy.conf.json`,
    {stdio: "inherit"}
  )
}

Gulp.task('start:jit', (callback) => {
  callback(serve());
});

Gulp.task('build', (callback) => {
  callback(build(false, false, false));
});

Gulp.task('build:production', (callback) => {
  callback(build(false, true), replaceType(callback));
});

Gulp.task('build:opt', (callback) => {
  callback(build(false, true));
});

Gulp.task('build:stats', (callback) => {
  callback(build(true, true));
});

Gulp.task('report', (callback) => {
  callback(showWebpackReport());
});

function getEnvironment() {
  let args = {};
  try {
    JSON.parse(process.env.npm_config_argv).original
      .filter(arg => arg.startsWith("--"))
      .map(arg => arg.substring(2))
      .map(arg => arg.split("="))
      .forEach(arg => args[arg[0]] = arg[1]);
  } catch (e) {
  }

  if (!args.env) {
    console.warn("'--env' argument isn't specified, default value 'test' will be used");
  }

  return {env: 'test', ...args};
}
