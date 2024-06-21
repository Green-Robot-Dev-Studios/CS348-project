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

    let center = new google.maps.LatLng(43.4716212, -80.5352349);
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

    if (places.length) {
        const { LatLngBounds } = await google.maps.importLibrary("core");
        const bounds = new LatLngBounds();

        places.forEach((place, i) => {
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
            updated["photoLink"] = place.photos[0].getURI();
            delete updated["photos"];
            places[i] = updated;
        });
        map.fitBounds(bounds);

    } else {
        console.log("No results");
    }
    console.log(places)
}

initMap();
