module.exports = function(grunt) {

  // let do not repeat the css paths twice
  var cssPaths = ["components/bootstrap/less", "components/font-awesome/less", "assets/css"];

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      dist: {
        src: ['components/jquery/jquery.js','components/bootstrap/js/*.js', 'assets/js/*.js'],
        dest: 'public/js/main.js'
      }
    },
    watch: {
      src: {
        files: ['assets/**', 'components/**', 'Gruntfile.js'],
        tasks: ['default']
      },
      options: {
        // otherwise my smart express
        // setup won't work
        nospawn: true
      }
    },
    uglify: {
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: 'public/js/main.js'
      }
    },
    jshint: {
      all: ['assets/js/**/*.js'],
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {
          console: true
        }
      }
    },
    less: {
      development: {
        options: {
          paths: cssPaths
        },
        files: {
          "public/css/main.css": "assets/css/main.less"
        }
      },
      production: {
        options: {
          paths: cssPaths,
          yuicompress: true
        },
        files: {
          "public/css/main.css": "assets/css/main.less"
        }
      }
    },
    copy: {
      main: {
        files: [{ 
          expand: true,
          flatten: true,
          src: ['components/font-awesome/font/*'],
          dest: 'public/font/'
        }]
      }
    }
  });

  // Load from NPM packages
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Default task(s).
  grunt.registerTask('default', ['concat', 'jshint', 'less:development', 'copy']);

  // Production task
  grunt.registerTask('production', ['default', 'uglify', 'less:production']);
};
