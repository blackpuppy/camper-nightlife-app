'use strict';

(function () {

    var locationText = document.querySelector('.location-text') || null,
        searchButton = document.querySelector('.btn-search'),
        searchUrl = appUrl + '/api/bars';

    searchButton.addEventListener('click', function () {

        var location;
        if (!!locationText) {
            location = locationText.value;
        }

        // console.log('locationText.value = ', locationText.value);
        // console.log('location = ', location);

        var data = {
            location: location
        }

        ajaxFunctions.ajaxRequest('POST', searchUrl, function (result) {
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
                    toggleUrl = appUrl + '/api/bars/:id/toggle';
                barFragment.classList.remove('hidden');
                photo.src = bar.imageUrl;
                name.innerHTML = bar.name;
                name.href = bar.url;
                desc.innerHTML = bar.desc;
                attendance.innerHTML = bar.attendeeCount + ' GOING';
                attendance.dataset.id = bar.id;

                attendance.addEventListener('click', function (e) {
                    // console.log('.bar-toggle-attendance clicked: e = ', e);

                    e.preventDefault();

                    var url = toggleUrl.replace(':id', e.target.dataset.id);
                    // console.log('.bar-toggle-attendance clicked: POST to ', url);

                    ajaxFunctions.ajaxRequest('POST', url, function (data) {
                        var result = JSON.parse(data);
                        // console.log('POST to ', url, ' response: ', result);

                        e.target.innerHTML = result.bar.users.length + ' GOING';
                    }, null, function (status, res) {
                        console.log('POST to ', url, ' status: ', status, ', error: ', res);

                        if (status === 401) {
                            window.location.replace('/login');
                        }
                    });
                }, false);

                barList.appendChild(barFragment);
            }
        }, JSON.stringify(data));

    }, false);

})();
