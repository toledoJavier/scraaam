import gulp from 'gulp'
import gutil from 'gulp-util'
import babel from 'gulp-babel'
import gls from 'gulp-live-server'

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