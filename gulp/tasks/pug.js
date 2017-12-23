'use strict';

module.exports = function() {
  $.gulp.task('pug', function() {
    //let locals = require('../../content.json');
    
    return $.gulp.src('./source/template/pages/*.pug')
      .pipe($.gp.pug({ 
        locals : JSON.parse($.fs.readFileSync('./content.json', 'utf8')),        
        pretty: true 
      }))
      .on('error', $.gp.notify.onError(function(error) {
        return {
          title: 'Pug',
          message:  error.message
        }
       }))
      .pipe($.gulp.dest($.config.root));
  });
};
