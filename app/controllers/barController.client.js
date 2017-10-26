'use strict';

(function () {

    var locationText = document.querySelector('.location-text') || null,
        searchButton = document.querySelector('.btn-search'),
        apiUrl = appUrl + '/api/bars';

    searchButton.addEventListener('click', function () {

        var location;
        if (!!locationText) {
            location = locationText.value;
        }

        console.log('locationText.value = ', locationText.value);
        console.log('location = ', location);

        ajaxFunctions.ajaxRequest('POST', apiUrl, function () {
        }, location);

    }, false);

})();
