

/////////////////////////////Login Autentication
function erro_login(){

    $('#btlogin').text('Erro na senha');
    $('#errologin').html('Erro: Falha durante a autenticação');
    
    setTimeout(() => {$('#errologin').html('');$('#btlogin').text('Login');}, 5000)    
    }
    
    function Autenticate(){
    
    $('#btlogin').text('Carregando...');
    
    let username = $('#login').val()
    let password = encodeURI($('#psswd').val())
    
     
    var data = { 
    'username' : username,
    'password':password
    }
    
    $.ajax({
    url: 'https://'+ URLServer +':' + Porta + '/login',
    type:'POST',
    data: data , 
    crossDomain: true,
    cache: false,
    success : function(result) {
    return  eval(result);
    },
    error: function(xhr, resp, text) {
    $('#btlogin').text('Erro na Conexão');
    $('#errologin').html('Erro: Falha durante a autenticação');
    setTimeout(() => {$('#errologin').html('');$('#btlogin').text('Login');}, 5000)    
    console.log(xhr, resp, text);
    }
    })
    }
    
    $(document).keypress(function(e) {
        if(e.which == 13) {
          Autenticate()
        }
    });
    
    