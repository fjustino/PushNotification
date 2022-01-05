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

            const TemplateId = decodedArgs['TemplateId'];
            const platformId = decodedArgs['platformId'];
            const parameters = decodedArgs['parameters'];
           

            console.log('TemplateId', TemplateId);
            console.log('platformId', platformId);
            console.log('parameters', parameters);

            const headers = { 
                'x-api-key': 'b9HGQTH3DK2Vp07T3iHLM7DlTF9I0GL29fycQkzj', 
                'x-api-secret': 'r:72f2fab7dd737781f58deeab3988d7f0', 
                'Content-Type': 'application/json'
              } 
            const data = {
                "templateId": TemplateId,
                "platformId": platformId,
                "templateTokens": parameters
              };
        
              var url = 'https://api.omni.chat/v1/messages';
             
              
              axios.post(url, data, { headers: headers }).then((res) => {
                console.log('Success send whatsapp' + JSON.stringify(res.data));
            }).catch((err) => {
                console.error('ERROR send whatsapp to' +  err)
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

    /*const headers = { 
        'x-api-key': 'b9HGQTH3DK2Vp07T3iHLM7DlTF9I0GL29fycQkzj', 
        'x-api-secret': 'r:72f2fab7dd737781f58deeab3988d7f0', 
        'Content-Type': 'application/json'
      } 
    const data = {
        "templateId": "gaW16ESxZF",
        "platformId": "5511987654321",
        "templateTokens": [
          "Validate",
          "123",
          "Curso",
          "Cidade",
          "Rua"
        ]
      };

      var url = 'https://api.omni.chat/v1/messages';
     
      
      axios.post(url, data, { headers: headers }).then((res) => {
        console.log('Success send whatsapp' + JSON.stringify(res.data));
    }).catch((err) => {
        console.error('ERROR send whatsapp to' +  err)
    })*/

    res.send(200, 'Validate');
};