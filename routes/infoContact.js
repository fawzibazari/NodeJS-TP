var express = require('express');
var router = express.Router();
var test = require('../cont');
var vCardsJS = require('vcards-js')
const { jsPDF } = require("jspdf")
/* GET home page. */
router.get('/:id', function(req, res, next) {
    id = req.params.id 

    // var vcard= {
    //   str_start:'BEGIN:VCARD\nVERSION:3.0\n',
    //   str_vcard:'BEGIN:VCARD\nVERSION:3.0\n',
    //   str_end:'\nEND:VCARD',
    //   goog_chart:'http://chart.googleapis.com/chart?cht=qr&chs=200x200&chl=',
    //   teste : "test",
    //   form:[],
    //   get_field: function(field){
    //       for(var i in vcard.form){
    //           if(vcard.form[i].name === field){ 
    //               return vcard.form[i].value.replace(/^\s+|\s+$/g,"");
    //           } 
    //       }
    //   },
    //   add_you: function(){
    //       var first_name = vcard.teste,
    //           last_name = vcard.teste;
          
    //       vcard.str_vcard += 'N:'+last_name+';'+first_name+'\n'+
    //                           'FN:'+first_name+' '+last_name;
    //       // TODO convert date to american format
  
    //   },
    //   required_check: function(){
    //       var first_name = vcard.get_field("first_name"),
    //           last_name = vcard.get_field("last_name"),
    //           msg = 'Field%FIELD% %NAME% %VERB% required.',
    //           fields = [];
          
    //       if(first_name === ''){ fields.push('First name'); }
          
    //       if(last_name === ''){ fields.push('Last name'); }
          
    //       if(fields.length === 0){ return ''; }
          
    //       msg = msg.replace('%NAME%',fields.join(', '));
          
    //       msg = msg.replace('%FIELD%',(fields.length === 1) ? '' : 's');
          
    //       msg = msg.replace('%VERB%',(fields.length === 1) ? 'is' : 'are'); 
              
    //       return msg;
    //   },
    //   save: function(){
    //       // vcard.form = $('form').serializeArray();
          
    //       var required_check_output = vcard.required_check();
          
    //       vcard.add_you();
          
    //       vcard.str_vcard += vcard.str_end;
       
    //       document.getElementById('#qr').attr('src',vcard.goog_chart+vcard.str_vcard.replace(/\n/g,'%0A'));
    //       vcard.str_vcard = vcard.str_start;
    //       console.log(JSON.stringify(vcard))
  
    //   },
  // };
    res.render('pages/Home/infoContact', { title: 'Express',id:id,test:test});
});

module.exports = router;
