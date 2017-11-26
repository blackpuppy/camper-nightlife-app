'use strict';

var appUrl = window.location.origin;
var ajaxFunctions = {
    ready: function ready (fn) {
        if (typeof fn !== 'function') {
            return;
        }

        if (document.readyState === 'complete') {
            return fn();
        }

        document.addEventListener('DOMContentLoaded', fn, false);
    },

    ajaxRequest: function ajaxRequest (method, url, callback, data, onError) {
        var xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState === 4) {
                if (xmlhttp.status === 200) {
                    callback(xmlhttp.response);
                } else {
                    onError(xmlhttp.status, xmlhttp.response);
                }
            }
        };

        xmlhttp.open(method, url, true);
        xmlhttp.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
        if (data) {
            // console.log('data not empty, send data = ', data);
            xmlhttp.send(data);
        } else {
            // console.log('data empty, send request only');
            xmlhttp.send();
        }
    }
};
