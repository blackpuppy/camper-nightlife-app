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

            var bars = JSON.parse(result);

            // console.log('search API succeeded: bars = ', bars);

            var barList = document.querySelector('.bar-list') || null,
                barTemplate = document.querySelector('.bar') || null;

            // console.log('barList = ', barList);
            // console.log('barTemplate = ', barTemplate);

            for (var i = 0; i < bars.length; i++) {
                var bar  = bars[i];

                var barFragment = barTemplate.cloneNode(true),
                    photo = barFragment.querySelector('.bar-photo'),
                    name = barFragment.querySelector('.bar-name'),
                    attendance = barFragment.querySelector('.bar-toggle-attendance'),
                    desc = barFragment.querySelector('.bar-desc'),
                    apiUrl = appUrl + '/api/bars/:id/toggle';
                barFragment.classList.remove('hidden');
                photo.src = bar.imageUrl;
                name.innerHTML = bar.name;
                name.href = bar.url;
                desc.innerHTML = bar.desc;
                attendance.innerHTML = bar.attendeeCount + ' GOING';

               attendance.addEventListener('click', function () {
                  ajaxFunctions.ajaxRequest('POST', apiUrl, function () {
                  });
               }, false);

                barList.appendChild(barFragment);
            }
        }, JSON.stringify(data));

    }, false);

})();
