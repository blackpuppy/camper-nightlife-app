'use strict';

(function () {

    var profileId = document.querySelector('#profile-id') || null;
    var profileUsername = document.querySelector('#profile-username') || null;
    var profileRepos = document.querySelector('#profile-repos') || null;
    var displayName = document.querySelectorAll('.display-name');
    var apiUrl = appUrl + '/api/:id';

    function updateHtmlElement (data, element, userProperty) {
        // console.log('updateHtmlElement(): element = ', element);
        element.innerHTML = data[userProperty];
    }

    function updateHtmlElements (data, elements, userProperty) {
        // console.log('updateHtmlElements(): elements = ', elements);
        for (var i = 0, len = elements.length; i < len; i++) {
            updateHtmlElement(data, elements[i], userProperty);
        }
    }

    // ajaxFunctions.ready(ajaxFunctions.ajaxRequest('GET', apiUrl, function (data) {
    //     var userObject = JSON.parse(data);

    //     if (userObject.displayName !== null) {
    //         updateHtmlElements(userObject, displayName, 'displayName');
    //     } else {
    //         updateHtmlElements(userObject, displayName, 'username');
    //     }

    //     if (profileId !== null) {
    //         updateHtmlElement(userObject, profileId, 'id');
    //     }

    //     if (profileUsername !== null) {
    //         updateHtmlElement(userObject, profileUsername, 'username');
    //     }

    //     if (profileRepos !== null) {
    //         updateHtmlElement(userObject, profileRepos, 'publicRepos');
    //     }

    // }));
})();
