import gulp from 'gulp'
import gutil from 'gulp-util'
import eslint from 'gulp-eslint'
import babel from 'gulp-babel'
import gls from 'gulp-live-server'
import mocha from 'gulp-mocha'
import { Server } from 'karma'
import { protractor } from 'gulp-protractor'

gulp.task('lint', () => {
	return gulp.src(['src/**/*.js', 'test/**/*.js', '!node_modules/**'])
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError())
})

gulp.task('transpile', () => {
	return gulp.src(['src/backend/**/*.js'])
		.pipe(babel())
		.pipe(gulp.dest('dist/backend/'))
})

gulp.task('start:watch', ['transpile'], () => {
	const server = gls.new('dist/backend/server.js')
	server.start()

	gulp.watch('src/**/*.js', ['transpile', () => {		
		server.start()
	}])
})

gulp.task('backend', () => {
	gulp.src('test/backend/**/*.js', {read: false})
		.pipe(mocha({
			compilers: 'js:babel-core/register',
			timeout: 120000,
			globals: ['recursive'],
			require: ['babel-polyfill']
		}))
})

gulp.task('frontend-components', function(done) {
	new Server({
		configFile: __dirname + '/karma.conf.js',
		singleRun: true
	}, done).start()
})

gulp.task('frontend-e2e', () => {
	return gulp.src(['test/e2e/*.test.js'])
		.pipe(protractor({
			configFile: "protractor.conf.js"
		}))
})

gulp.task('frontend-all', ['frontend-components', 'frontend-e2e'])

gulp.task('all', ['backend', 'frontend-all'])

gulp.task('all-non-e2e', ['backend', 'frontend-components'])