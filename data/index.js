let map;

async function initMap() {
    const { Map } = await google.maps.importLibrary("maps");
    let center = new google.maps.LatLng(43.4716212, -80.5352349);

    map = new Map(document.getElementById("map"), {
        center: center,
        zoom: 10,
        mapId: "DEMO_MAP_ID",
    });


    nearbySearch();
}

async function nearbySearch() {
    const { Place, SearchNearbyRankPreference } =
        await google.maps.importLibrary("places");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

    let total = [];
    for (let lat = 43.4516212; lat < 43.4916212; lat += 0.003) {
        for (let long = -80.5552349; long < -80.5152349; long += 0.003) {
            let center = new google.maps.LatLng(lat, long);
            const request = {
                fields: [
                    "accessibilityOptions",
                    "location",
                    "displayName",
                    "formattedAddress",
                    "regularOpeningHours",
                    "nationalPhoneNumber",
                    "priceLevel",
                    "rating",
                    "userRatingCount",
                    "websiteURI",
                    "hasDelivery",
                    "hasDineIn",
                    "editorialSummary",
                    "parkingOptions",
                    "paymentOptions",
                    "servesVegetarianFood",
                    "hasTakeout",
                    "types",
                    "photos",
                    "businessStatus",
                ],
                locationRestriction: {
                    center: center,
                    radius: 500,
                },
                // optional parameters
                includedPrimaryTypes: ["restaurant"],
                maxResultCount: 20,
                rankPreference: SearchNearbyRankPreference.POPULARITY,
                language: "en-US",
                region: "us",
            };

            const { places } = await Place.searchNearby(request);
            places.forEach((place) => {
                if (!total.some((totalPlace) => totalPlace.id === place.id)) {
                    total.push(place)
                }
            })
            // break;
        }
        // break;
    }
    
    // console.log(total)



    if (total.length) {
        const { LatLngBounds } = await google.maps.importLibrary("core");
        const bounds = new LatLngBounds();

        total.forEach(async (place, i) => {
            // console.log(await place.fetchFields("googleMapsURI"))

            new AdvancedMarkerElement({
                map,
                position: place.location,
                title: place.displayName,
            });

            bounds.extend(place.location);

            const flatten = (obj, roots=[], sep='.') => Object.keys(obj).reduce((memo, prop) => Object.assign({}, memo, Object.prototype.toString.call(obj[prop]) === '[object Object]' ? flatten(obj[prop], roots.concat([prop]), sep) : {[roots.concat([roots.length == 1 ? prop.charAt(0).toUpperCase() + prop.slice(1) : prop]).join(sep)]: obj[prop]}), {})
            let stringed = JSON.parse(JSON.stringify(place))
            stringed["regularOpeningHours"] = stringed["regularOpeningHours"] ? stringed["regularOpeningHours"]["weekdayDescriptions"]: []
            let updated = flatten(stringed,[],'');
            updated["photoLink"] = place.photos[0] && place.photos[0].getURI();
            delete updated["photos"];
            delete updated["parkingOptions"]
            delete updated["accessibilityOptions"]
            delete updated["paymentOptions"]
            total[i] = updated;
        });
        map.fitBounds(bounds);

    } else {
        console.log("No results");
    }
    total = total.filter((place) => place.photoLink);
    console.log(total)
}

initMap();
