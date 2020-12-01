function chooseColor(){
    var mycolor = document.getElementById("myColor").value;
    document.execCommand('foreColor', false, mycolor);
  }

  function changeFont(){
    var myFont = document.getElementById("input-font").value;
    document.execCommand('fontName', false, myFont);
  }

  function changeSize(){
    var mysize = document.getElementById("fontSize").value;
    document.execCommand('fontSize', false, mysize);
  }

  function checkDiv(){
    var editorText = document.getElementById("editor1").innerHTML;
    if(editorText === ''){
      document.getElementById("editor1").style.border = '5px solid red';
    }
  }

  function removeBorder(){
    document.getElementById("editor1").style.border = '1px solid transparent';
  }
 
  




  $( document ).ready(function() {
    GetModels();
  });
  




  function GetModels(){
    var data = { 
     'token':localStorage.getItem('token')
     }
    $.ajax({
     url: 'https://'+ URLServer +':' + Porta + '/getmodels',
     type:'POST',
     data: data , 
     crossDomain: true,
     cache: false,
     success : function(result) {

      $('#editor1').html( decodeURI(result[1].texto) );
      $('#editor2').html( decodeURI(result[0].texto) );

      },
     error: function(xhr, resp, text) {
      console.log(xhr, resp, text);
     }
     })
  }




  function SaveModel1(){
    var data = { 
     'modelo' : 'carta1',
     'texto': $('#editor1').html()  ,
     'token':localStorage.getItem('token')
     }
    $.ajax({
     url: 'https://'+ URLServer +':' + Porta + '/savemodels',
     type:'POST',
     data: data , 
     crossDomain: true,
     cache: false,
     success : function(result) {
     return  eval(result);
     },
     error: function(xhr, resp, text) {
      console.log(xhr, resp, text);
     }
     })
}




  function SaveModel2(){
     var data = { 
      'modelo' : 'email',
      'texto':  $('#editor2').html() ,  
      'token':localStorage.getItem('token')
      }
     $.ajax({
      url: 'https://'+ URLServer +':' + Porta + '/savemodels',
      type:'POST',
      data: data , 
      crossDomain: true,
      cache: false,
      success : function(result) {
      return  eval(result);
      },
      error: function(xhr, resp, text) {
       console.log(xhr, resp, text);
      }
      })
}
 


function print(){

  var content = $('#editor1').html()

  var Arrayclients = JSON.parse(localStorage.getItem('Arrayclients'))
  var mywindow = window.open('', 'PRINT');
 
  function transformdata(d,days){
    d= new Date(d);
    d.setDate(d.getDate() + days);
    var dia = ("0" + (d.getUTCDate())).substr(-2);
    var mes = ("0" + (d.getUTCMonth()+1)).substr(-2);
    var ano = d.getUTCFullYear();
    return [dia, mes,  ano ].join('/');
  }

  function transformdataextenso(d){
    d= new Date(d);
    var dia = ("0" + (d.getUTCDate())).substr(-2);
    var mes = (d.getUTCMonth()) 
    var ano = d.getUTCFullYear();

    var meses = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro']

    return [dia, meses[mes],  ano ].join(' de ');
  }


  function extract([beg, end]) {
    const matcher = new RegExp(`${beg}(.*?)${end}`,'gm');
    const normalise = (str) => str.slice(beg.length,end.length*-1);
    return function(str) {
        return str.match(matcher).map(normalise);
    }
  }

  const stringExtractor = extract(['{','}']);
  const arrayvariables = stringExtractor(content)
 

  for(i=0;i<arrayvariables.length;i++){
    if(arrayvariables[i] == 'data_por_extenso'){
      content = content.replace(`{${arrayvariables[i]}}`,transformdataextenso(Date.now()))
    }

    if(arrayvariables[i] == 'data'){
      content = content.replace(`{${arrayvariables[i]}}`,transformdata(Date.now(),0) )
    }

    if( arrayvariables[i].toString().substring(0,5) == 'data+'){
      content = content.replace(`{${arrayvariables[i]}}`,transformdata(Date.now(),  parseInt(arrayvariables[i].toString().replace('data+',''))  ) )     
    }
  }

 
 
  for(x=0;x<Arrayclients.length;x++){

   

  mywindow.document.write('<html><head><title>Cartas</title>');
  mywindow.document.write(`<style>
  body{font-family: Calibri, Candara, Arial, sans-serif;margin: 0px;}
  ​table, td, th {text-align: left;}
  table {border-collapse: collapse;width: 100%;}
  table tbody tr:nth-child(2n+1) {background: #f5f5f5;}    
  th, td {padding: 5px;}
  @media print {
    .pagebreak { page-break-before: always; }  
  }
  </style></head><body >`);
  mywindow.document.write('<div align="center" style="width:100%"></div>');  
  mywindow.document.write('<div style="width:100%">');
  mywindow.document.write(content.replace('{cliente}', Arrayclients[x].NOMECLIENTE));
  mywindow.document.write('</div>');
  mywindow.document.write('<div class="pagebreak"> </div></body></html>');

}


  mywindow.document.close();  
  mywindow.focus(); 

  mywindow.print();
  mywindow.close();
  return true;

 
  
}



function SendMails(){

  if (confirm('Atenção os clientes selecionados irão receber e-mail deseja continuar?')){
  
  $('.loading').show();

  var data = { 
    'clients' : JSON.parse(localStorage.getItem('Arrayclients')) ,
    'texto':  $('#editor2').html() ,  
    'token':localStorage.getItem('token')
    }
   $.ajax({
    url: 'https://'+ URLServer +':' + Porta + '/SendMails',
    type:'POST',
    data: data , 
    crossDomain: true,
    cache: false,
    success : function(result) {
    return  eval(result);
    },
    error: function(xhr, resp, text) {
     console.log(xhr, resp, text);
    }
    })

  }

}
