'use strict';

const Path = require('path');
const JWT = require(Path.join(__dirname, '..', 'lib', 'jwtDecoder.js'));
const util = require('util');
const axios = require('axios');
const { stringify } = require('querystring');
const https = require('https');

exports.logExecuteData = [];

function logData(req) {
    exports.logExecuteData.push({
        body: req.body,
        headers: req.headers,
        trailers: req.trailers,
        method: req.method,
        url: req.url,
        params: req.params,
        query: req.query,
        route: req.route,
        cookies: req.cookies,
        ip: req.ip,
        path: req.path,
        host: req.host,
        fresh: req.fresh,
        stale: req.stale,
        protocol: req.protocol,
        secure: req.secure,
        originalUrl: req.originalUrl
    });
    
    console.log("body: " + util.inspect(req.body));
    console.log("headers: " + util.inspect(req.headers));
    console.log("trailers: " + req.trailers);
    console.log("method: " + req.method);
    console.log("url: " + req.url);
    console.log("params: " + util.inspect(req.params));
    console.log("query: " + util.inspect(req.query));
    console.log("route: " + req.route);
    console.log("cookies: " + req.cookies);
    console.log("ip: " + req.ip);
    console.log("path: " + req.path);
    console.log("host: " + req.host);
    console.log("fresh: " + req.fresh);
    console.log("stale: " + req.stale);
    console.log("protocol: " + req.protocol);
    console.log("secure: " + req.secure);
    console.log("originalUrl: " + req.originalUrl);
}

exports.edit = function (req, res) {
    console.log('edit request');
    res.send(200, 'Edit');
};

exports.save = function (req, res) {
    console.log('save request');
    res.send(200, 'Save');
};

exports.execute = function (req, res) {
    console.log('Entrou no EXECUTE')
    logData(req);
    JWT(req.body, process.env.jwtSecret, (err, decoded) => {
        if (err) {
            console.error(err);
            return res.status(401).end();
        }

        if (decoded && decoded.inArguments && decoded.inArguments.length > 0) {
            var decodedArgs = decoded.inArguments[0];
            console.log()
            console.log('inArguments', JSON.stringify(decoded.inArguments));
            console.log('decodedArgs', JSON.stringify(decodedArgs));

            const tituloPush = decodedArgs['tituloPush'];
            const message = decodedArgs['message'];
            const matricula = decodedArgs['matricula'];
            const parameters = decodedArgs['parameters'];
            const parametersTitulo = decodedArgs['parametersTitulo'];
            var mensagem = message;
            var titulo = tituloPush;

            //Variaveis de retorno
            var toPush;
            var titlePush;
            var messagePush;
            var statusPush;
            var messageCodePush;
            var TrackingCodes;
            var dataPush;

            console.log('TemplateId', tituloPush);
            console.log('message', message);
            console.log('matricula', matricula);
            console.log('parameters', parameters);

            //var string = "Olá {1}, bem vindo ao curso {2} que começa dia {3}"; 
            var regexp = new RegExp(/{[0-9]+}/g);
            //var tokens = ['Justino','Culinária','26/02/2022'];
            //console.log(string) 

            var matches = mensagem.match(regexp);
            if(matches != null)
            {
                for(var i=0; i < matches.length; i++){
                    mensagem = mensagem.replace(matches[i],parameters[i]) 
                }
                console.log(mensagem);
            }
            
            var matchestitulo = tituloPush.match(regexp);
            if(matchestitulo != null)
            {
                for(var j=0; j < matchestitulo.length; j++){
                    titulo = titulo.replace(matchestitulo[j],parametersTitulo[j]) 
                }
                console.log(titulo);
            }

            const headers = { 
                'Authorization': 'Basic Z2lvY29uZGE6dW5pYXNzZWx2aXVodWJyZWdpc3Rlcg==', 
                'Content-Type': 'application/json'
              } 
            const data = {     
                "title": titulo,      
                "to": matricula,               
                "type": 1,                
                "message": mensagem,                
                "processor": "pushwoosh",                
                "queue_type": 1,               
                "priority": 2 
            };

            console.log(data);
        
            var url = 'https://uhub-register.uniasselvi.com.br/api/v1/push';
              
            axios.post(url, data, { headers: headers }).then((res) => {

                console.log('Success send PUSH LEOAPP' + JSON.stringify(res.data));
                
            }).catch((err) => {
                console.error('ERROR send PUSH LEOAPP' +  err)
            })

            res.send(200, 'Execute');

        } else {
            console.error('inArguments invalid.');
            return res.status(400).end();
        }
    });
};

exports.publish = function (req, res) {
    console.log('publish request');
    res.send(200, 'Publish');
};

exports.validate = function (req, res) {
    console.log('validate request');

    const headers = { 
        'Authorization': 'Basic Z2lvY29uZGE6dW5pYXNzZWx2aXVodWJyZWdpc3Rlcg==', 
        'Content-Type': 'application/json'
      } 

    res.send(200, 'Validate');
};