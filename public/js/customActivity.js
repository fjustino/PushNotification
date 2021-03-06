'use strict';

define(function (require) {
    var Postmonger = require('postmonger');
    var connection = new Postmonger.Session();

    var payload = {};
    var authTokens = {};

    var eventDefinitionKey = null;
    var tituloPush = null;
    var parametrosTituloPush = null
    var message = null;
    var matricula = null;
    var parameterList = null;

    $(window).ready(onRender);

    connection.on('initActivity', initialize);
    connection.on('requestedTokens', onGetTokens);
    connection.on('requestedEndpoints', onGetEndpoints);
    connection.on('requestedInteraction', requestedInteractionHandler);
    connection.on('clickedNext', save);

    /* [ Form Validate ] ================================================================== */

    $('.validate-form .input100').each(function () {
        $(this).focus(function () {
            hideValidate(this);
        });
    });

    function showValidate(input) {
        var thisAlert = $(input).parent();
        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();
        $(thisAlert).removeClass('alert-validate');
    }

    function validate_field(input) {
        if ($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if ($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }
        else {
            if ($(input).val().trim() == '' || $(input).val().trim() == 'conta de envio*') {
                return false;
            }
        }
    }

    function validate() {
        var input = $('.validate-input .input100');
        var check = true;
        for (var i = 0; i < input.length; i++) {
            if (validate_field(input[i]) == false) {
                showValidate(input[i]);
                check = false;
            }
        }
        return check;
    }

    /* ![ Form Validate ] ================================================================== */

    function onRender() {
        connection.trigger('ready');
        connection.trigger('requestTokens');
        connection.trigger('requestEndpoints');
        connection.trigger('requestInteraction');

        $('#toggleActive').click(function (evt) {
            evt.preventDefault();

            if (validate()) {
                document.getElementById('tituloPush').disabled = true;
                tituloPush = $('#tituloPush').val();

                document.getElementById('parametrosTituloPush').disabled = true;
                parametrosTituloPush = $('#parametrosTituloPush').val();

                document.getElementById('message').disabled = true;
                message = $('#message').val();

                document.getElementById('matricula').disabled = true;
                matricula = $('#matricula').val();

                document.getElementById('parameterList').disabled = true;
                parameterList = $('#parameterList').val();

                document.getElementById('toggleActive').disabled = true;
                document.getElementById('toggleActive').innerHTML = "Ativado";
            }
        });
    }

    function initialize(data) {
        console.log("customActivity");
       
        if (data) {
            payload = data;
            console.log(payload);
        }

        message = payload['arguments'].message;

        if (message) {

            document.getElementById('tituloPush').disabled = true;
            document.getElementById('tituloPush').value = tituloPush;

            document.getElementById('parametrosTituloPush').disabled = true;
            document.getElementById('parametrosTituloPush').value = parametrosTituloPush;

            document.getElementById('message').disabled = true;
            document.getElementById('message').value = message;

            document.getElementById('matricula').disabled = true;
            document.getElementById('matricula').value = matricula;

            document.getElementById('parameterList').disabled = true;
            document.getElementById('parameterList').value = parameterList;

            document.getElementById('toggleActive').disabled = true;
            document.getElementById('toggleActive').innerHTML = "Ativado";
        }
    }

    function onGetTokens(tokens) {
        console.log(tokens);
        authTokens = tokens;
    }

    function onGetEndpoints(endpoints) {
        console.log(endpoints);
    }

    function requestedInteractionHandler(settings) {
        try {
            eventDefinitionKey = settings.triggers[0].metaData.eventDefinitionKey;
            document.getElementById('select-entryevent-defkey').value = eventDefinitionKey;
            console.log("eventDefinitionKey" + eventDefinitionKey);
        } catch (err) {
            console.error(err);
        }
    }

    function save() {
        var parameters = parameterList.split(',');
        parameters = parameters.map(parameterNameTitulo => `{{Event.${eventDefinitionKey}.\"${parameterNameTitulo}\"}}`);

        var parametersTitulo = parametrosTituloPush.split(',');
        parametersTitulo = parametersTitulo.map(parameterNameTitulo => `{{Event.${eventDefinitionKey}.\"${parameterNameTitulo}\"}}`);

        payload['arguments'].execute.inArguments = [{
            "tokens": authTokens,
            "contactIdentifier": "{{Contact.Key}}",
            "tituloPush": tituloPush,
            "parametersTitulo": parametersTitulo,
            "matricula": `{{Event.${eventDefinitionKey}.\"${matricula}\"}}`,
            "message": message,
            "parameters": parameters
 
        }];

        payload['metaData'].isConfigured = true;

        connection.trigger('updateActivity', payload);
    }
});