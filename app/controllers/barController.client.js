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

        var data = {
            location: location
        }

        ajaxFunctions.ajaxRequest('POST', apiUrl, function (result) {
            // console.log('search API succeeded: result has ', result, ' businesses');

            var data = JSON.parse(result);

            // console.log('search API succeeded: data.businesses = ', data.businesses);
            // console.log('search API succeeded: data.businesses.length = ', data.businesses.length);

            var barList = document.querySelector('.bar-list') || null,
                barTemplate = document.querySelector('.bar') || null;

            console.log('barList = ', barList);
            console.log('barTemplate = ', barTemplate);

            for (var i = 0; i < data.businesses.length; i++) {
                var business  = data.businesses[i];

                var barFragment = barTemplate.cloneNode(true);
                barFragment.classList.remove('hidden');
                barFragment.childNodes[0].src = business.image_url;
                barFragment.childNodes[1].childNodes[0].innerHTML = business.name;

                barList.appendChild(barFragment);
            }
        }, JSON.stringify(data));

    }, false);

})();
