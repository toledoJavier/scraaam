import gulp from 'gulp'
import gutil from 'gulp-util'
import babel from 'gulp-babel'
import gls from 'gulp-live-server'
import mocha from 'gulp-mocha'

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