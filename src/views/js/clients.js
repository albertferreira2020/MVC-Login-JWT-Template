var lisclients = []

function CreateTableFromJSON(nodejson) {

  localStorage.setItem('Objectclients', JSON.stringify(nodejson));
 
          var col = [];
          for (var i = 0; i < nodejson.length; i++) {
              for (var key in nodejson[i]) {
                  if (col.indexOf(key) === -1) {
                      col.push(key);
                  }
              }
          }
  
          var table = document.createElement("table");
          table.setAttribute('class','table table-striped table-condensed table-hover sortable')
          var tr = table.insertRow(-1); 
  
          for (var i = 0; i < col.length; i++) {
              var th = document.createElement("th");
               th.innerHTML = col[i].toUpperCase();
              tr.appendChild(th);
           }

           for (var i = 0; i < nodejson.length; i++) {
  
              tr = table.insertRow(-1);
   
              for (var j = 0; j < col.length; j++) {
                  var tabCell = tr.insertCell(-1);
                 
                  var valor =  nodejson[i][col[j]]

                   if(j == 0){
                    tabCell.innerHTML = `<input type="checkbox" checked onchange="countselected(this.value)" id="${valor}"  value="${valor}">`;
                    lisclients.push(valor)      
                    var idcliente = valor             
                  }else if(j == 1){
                     tabCell.innerHTML = `<a style="cursor:pointer;color:blue" onclick="ModalClientes(${idcliente},'${valor}')">${valor}</a>`;
                   }else{
                      tabCell.innerHTML = valor;
                   }
                   
               
                  }
          }
  
          $('#ligridclient').empty(); 
          $('#ligridclient').append(table)

          localStorage.setItem('gridclients', $('#ligridclient').html());
          $('#registros').html('Quantidade Selecionada: ' + $('input:checkbox:checked').length)
          localStorage.setItem('lisclients', lisclients); 
      }



   function checkedinputs(){
   if(JSON.parse(localStorage.getItem('Arrayclients')) != null){
    var arraychecks = JSON.parse(localStorage.getItem('Arrayclients'))

     for(x=0;x<arraychecks.length;x++){
      $('#'+arraychecks[x]).prop('checked',true)
     }      

   }else{
     $('input:checkbox').removeAttr('checked');
   }

  }
  
 

    function countselected(id) {

      lisclients = [localStorage.getItem('lisclients')] 

      $('#registros').html('Quantidade Selecionada: ' + $('input:checkbox:checked').length)
      localStorage.setItem('gridclients', $('#ligridclient').html());      
     
      if($('#'+id).prop('checked')){
        lisclients.push(id);
        localStorage.setItem('lisclients', lisclients); 
        console.log(lisclients)
      }else{

        var newArray = lisclients.filter((value)=>value!=id);
         localStorage.setItem('lisclients', newArray); 
         
      } 
      
    }  
    
    
    $( document ).ready(function() {
      $('#ligridclient').html(localStorage.getItem('gridclients'));
      $('#registros').html('Quantidade Selecionada: ' + $('input:checkbox:checked').length)
 
      $('#inicio').val(localStorage.getItem('inicio'));
      $('#fim').val(localStorage.getItem('fim'));

    });    
    
    
    function getclients(){

      $('.loading').show();

     
    var data = { 
    'inicio' : $('#inicio').val(),
    'fim':$('#fim').val(),
    'cgccpf':$('#cgccpf').val(),
    'contrato':$('#contrato').val(),
    'carteira':$('#carteira').val(),
    'dias':$('#dias').val(),
    'token':localStorage.getItem('token'),
    }


    localStorage.setItem('inicio', $('#inicio').val()); 
    localStorage.setItem('fim', $('#fim').val()); 

    
    $.ajax({
    url: 'https://'+ URLServer +':' + Porta + '/clients',
    type:'POST',
    data: data , 
    crossDomain: true,
    cache: false,
    success : function(result) {

      $('.loading').hide();
      eval(result)

    },
    error: function(xhr, resp, text) {
 
     console.log(xhr, resp, text);
    }
    })
    }
    
    $(document).keypress(function(e) {
        if(e.which == 13) {
          getclients()
        }
    });




 
    function CreateTableFromJSONTitulos(nodejson) {

      
              var col = [];
              for (var i = 0; i < nodejson.length; i++) {
                  for (var key in nodejson[i]) {
                      if (col.indexOf(key) === -1) {
                          col.push(key);
                      }
                  }
              }
      
              var table = document.createElement("table");
              table.setAttribute('class','table table-striped table-condensed table-hover sortable')
              var tr = table.insertRow(-1); 
      
              for (var i = 0; i < col.length; i++) {
                  var th = document.createElement("th");
                   th.innerHTML = col[i].toUpperCase();
                  tr.appendChild(th);
               }
    
               for (var i = 0; i < nodejson.length; i++) {
      
                  tr = table.insertRow(-1);
       
                  for (var j = 0; j < col.length; j++) {
                      var tabCell = tr.insertCell(-1);
                     
                      var valor =  nodejson[i][col[j]]
    
                           tabCell.innerHTML = valor;
 
                   
                      }
              }
      
              $('#gridtitulos').empty(); 
              $('#gridtitulos').append(table)
 
          }




          function CreateTableHistoryFromJSON(nodejson) {

      
            var col = [];
            for (var i = 0; i < nodejson.length; i++) {
                for (var key in nodejson[i]) {
                    if (col.indexOf(key) === -1) {
                        col.push(key);
                    }
                }
            }
    
            var table = document.createElement("table");
            table.setAttribute('class','table table-striped table-condensed table-hover sortable')
            var tr = table.insertRow(-1); 
    
            for (var i = 0; i < col.length; i++) {
                var th = document.createElement("th");
                 th.innerHTML = col[i].toUpperCase();
                tr.appendChild(th);
             }
  
             for (var i = 0; i < nodejson.length; i++) {
    
                tr = table.insertRow(-1);
     
                for (var j = 0; j < col.length; j++) {
                    var tabCell = tr.insertCell(-1);
                   
                    var valor =  nodejson[i][col[j]]
  
                         tabCell.innerHTML = valor;

                 
                    }
            }
    
            $('#gridhistorico').empty(); 
            $('#gridhistorico').append(table)

        }






    function ModalClientes(id,nome){

      $('.loading').show();
      $('#modalidcliente').val(id)

      var data = { 
        'id' : id,
        'inicio': localStorage.getItem('inicio'),
        'fim': localStorage.getItem('fim'),
        'token':localStorage.getItem('token'),
        }
        
        $.ajax({
        url: 'https://'+ URLServer +':' + Porta + '/descriptions',
        type:'POST',
        data: data , 
        crossDomain: true,
        cache: false,
        success : function(result) {
          $('.loading').hide();
          $(".modal").modal('show');

          $('#gridtitulos').empty();

          ModalHistorico(id)

          $('.modal-title').html(`<b> ${id} - ${nome} </b>`) 
          eval(result)
        },
        error: function(xhr, resp, text) {
         console.log(xhr, resp, text);
        }
        })
 
    }




    function ModalHistorico(id){

      $('.loading').show();
 
      var data = { 
        'id' : id,
        'token':localStorage.getItem('token'),
        }
        
        $.ajax({
        url: 'https://'+ URLServer +':' + Porta + '/history',
        type:'POST',
        data: data , 
        crossDomain: true,
        cache: false,
        success : function(result) {
          $('.loading').hide();
          eval(result)
        },
        error: function(xhr, resp, text) {
         console.log(xhr, resp, text);
        }
        })
 
    }





    function SaveHistorico(){
 
      var data = { 
        'id' : $('#modalidcliente').val(),
        'user' : localStorage.getItem('user'),
        'obs': $('#obs').val(),
        'token':localStorage.getItem('token'),
        }
        
        $.ajax({
        url: 'https://'+ URLServer +':' + Porta + '/saveobs',
        type:'POST',
        data: data , 
        crossDomain: true,
        cache: false,
        success : function(result) {
          ModalHistorico($('#modalidcliente').val())
          eval(result)
        },
        error: function(xhr, resp, text) {
         console.log(xhr, resp, text);
        }
        })
 
    }



  function SaveClients(){
    var Arrayclients = [] 
    var Objectclients = JSON.parse(localStorage.getItem('Objectclients'))
    
    $('input:checkbox:checked').each(function(){ 
      Arrayclients.push(  Objectclients.find( chave => chave.ID === parseInt($(this).val()))   )
    });
    
  localStorage.setItem('Arrayclients', JSON.stringify(Arrayclients) ); 
  top.location.href='/message'
  }