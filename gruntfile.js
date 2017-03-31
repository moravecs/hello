module.exports = function(grunt) {
  // configura las tareas
  grunt.initConfig({
 

copy: {
      build: {
        cwd: 'src',
        src: [ '**' ],
        dest: 'dist',
        expand: true
      },
    },
 
connect: {
  server: {
    options: {
      port: 3000,
      base: 'dist',
      hostname: '*'
    },
  },
},

watch: {
	options: {
		livereload: true,
    },
	copy: {
		files: [ 'src/**' ],
		tasks: [ 'cssmin', 'copy', 'processhtml' ]
	},
	config: {
		files: ['package.json', 'gruntfile.js'],
		tasks: ['exit']
	},
},

cssmin: {
  target: {
    files: [{
      expand: true,
      cwd: 'src/css',
      src: ['*.css', '!*.min.css'],
      dest: 'src/css',
      dest: 'src/css',
      ext: '.min.css'
    }]
  },
},
uglify: {
  build: {
    options: {
      mangle: false
    },
    files: {
      'dist/js/application.js': [ 'src/**/*.js' ]
    },
  },
},

clean: {
  build: {
    src: [ 'dist' ]
  },
  stylesheets: {
    src: [ 'dist/**/*.css', '!dist/css/style.css' ]
  },
  scripts: {
    src: [ 'dist/**/*.js', '!dist/application.js' ]
  },
},

imagemin: {
   dist: {
      options: {
        optimizationLevel: 5
      },
      files: [{
         expand: true,
         cwd: 'src/img',
         src: ['**/*.{png,jpg,gif}'],
         dest: 'dist/img'
      }]
   },
},


uncss: {
   dist: {
	   options: {
         ignore: [/js-.+/, '.special-class'],
         ignoreSheets: [/fonts.googleapis/],
      },
      files: {
         'dist/css/tidy.css': ['src/index.php']
      }
   }
},
	  
processhtml: {
  build: {
      options: {
        process: true,
        data: {
          title: 'Moravecs',
          message: 'This is production distribution'
        },
      },
    files: {
      'dist/index.php': ['src/index.php']
    },
  },
}

  });
 
grunt.registerTask(
  'default',
  'Vigila los cambios en el proyecto y automáticamente copia los archivos y lanza el servidor de prueba.',
  [ 'clean', 'imagemin', 'uglify', 'cssmin', 'uncss', 'processhtml', 'connect', 'watch' ]
);

grunt.registerTask(
	'exit', 'Just exits.', function() {
		process.exit(0);
});

  // carga las tareas
grunt.loadNpmTasks('grunt-processhtml');
grunt.loadNpmTasks('grunt-contrib-copy');
grunt.loadNpmTasks('grunt-contrib-cssmin');
grunt.loadNpmTasks('grunt-contrib-clean');
grunt.loadNpmTasks('grunt-contrib-connect');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-contrib-coffee');
grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-uncss');
grunt.loadNpmTasks('grunt-contrib-imagemin');

  // define los comandos para las tareas
};