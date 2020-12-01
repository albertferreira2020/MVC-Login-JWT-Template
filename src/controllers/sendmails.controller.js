const fileconfig = require("../config.js"); 
const email = fileconfig.email 

module.exports = {

  post:(req, res, next) => {

  
    var clientes =  req.body.clients
    var content =  req.body.texto 
 
    function transformdataextenso(d){
      d= new Date(d);
      var dia = ("0" + (d.getUTCDate())).substr(-2);
      var mes = (d.getUTCMonth()) 
      var ano = d.getUTCFullYear();
  
      var meses = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro']
  
      return [dia, meses[mes],  ano ].join(' de ');
    }
  

    content = content.replace('{<span style="color: rgb(51, 51, 51); font-family: Arial, sans-serif; font-size: 13px; text-align: right; white-space: normal;">data_por_extenso</span>}', transformdataextenso(Date.now())) 
    var relatorio = ''


    return new Promise((resolve, reject) => {
    

    for(var i=0;i<clientes.length;i++){

      (function loop(i) {
        setTimeout(function() {


          relatorio += clientes[i].NOMECLIENTE + ' - ' + clientes[i].EMAIL + ' - ' + clientes[i].VALOR + '<br>'

          if (i+1 == clientes.length){
            resolve(relatorio);
          }
               
                var message = {
                  from: 'sistemas@unimedgm.coop.br',  
                  to: clientes[i].EMAIL,  
                  subject: 'Sistema de Cobrança Unimed Gerais de Minas',  
                  html: content.replace('{cliente}', clientes[i].NOMECLIENTE) + ` <br> <a href='http://www.unimedgm.com.br'>www.unimedgm.coop.br</a> <br> <img src="https://intranet.unimedgm.coop.br/assinatura2.jpg">`
                }
                email.sendMail(message, function(err, info){if(err){
                
                relatorio += 'IMPORTANTE: ERRO NO CLIENTE ' + clientes[i].NOMECLIENTE + ' - ' + clientes[i].EMAIL + ' - ' + clientes[i].VALOR + ' NÃO ENVIADO! <br>'
                  
                }else{} }); 
    
    
        }, 5000*i)
        })(i);
    }


  }).then((relatorio) => { 
    //console.log('Send Email Relatório: ' + relatorio)

 
    var emailreport = {
        from: 'sistemas@unimedgm.coop.br', // Quem enviou este e-mail
        to: 'helen@unimedgm.coop.br, bruno@unimedgm.coop.br', // Quem receberá

        subject: ' Relatório de Disparo de E-mails de Cobrança' + transformdataextenso(Date.now()),  

        html: `
        Este é um e-mail automático, favor não responda, segue abaixo relação de e-mails enviados: <br><br>
        <b>${relatorio}</b> 
        Atenciosamente, <br>  
        <a href='http://www.unimedgm.com.br'>www.unimedgm.coop.br</a> <br> 
        <img src="https://intranet.unimedgm.coop.br/assinatura2.jpg"> `
        };

            email.sendMail(emailreport, function(err, info){
            if(err){
            console.log('Erro: ', info);
            }else{
            
              var JS_Script = `
              $('.loading').hide(); 
              alert('Emails processados, favor confira o relatório enviado no e-mail') 
           `
           res.status(200).send(JS_Script);            
           console.log('Emails enviados com sucesso!')
                 
            }
        
        });



    }) 

    
      
 

 
 

    }



  


}