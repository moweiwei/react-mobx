module.exports = function(grunt) {
  grunt.initConfig({
    i18next: {
      dev: {
        src: ['src/**/*.{jsx,js}'],
        dest: 'src',
        options: {
          lngs: ['en', 'zh'],
          removeUnusedKeys: true,
          // sort: true,
          keySeparator: false,
          nsSeparator: false,
          interpolation: {
            prefix: '{{',
            suffix: '}}',
          },
          resource: {
            loadPath: 'src/locales/{{lng}}.json',
            savePath: 'locales/{{lng}}.json',
          },
          func: {
            list: ['t', 't.html'],
            extensions: ['.js', '.jsx'],
          },
          defaultValue: (lng, ns, key) => {
            if (lng === 'zh') {
              return ''
            }
            return key
          },
        },
      },
    },
  })

  // Load the plugin that provides the "i18next" task.
  grunt.loadNpmTasks('i18next-scanner')

  // Default task(s).
  grunt.registerTask('default', ['i18next'])
}
