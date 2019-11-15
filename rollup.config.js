import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'

export default {
  input: 'src/index.js',
  output: {
    file: 'index.min.js',
    format: 'umd',
    name: 'reunx',
  },
  plugins: [
    babel({
      exclude: 'node_modules/**',
    }),
    process.env.NODE_ENV === 'production' && uglify(),
  ],
}
