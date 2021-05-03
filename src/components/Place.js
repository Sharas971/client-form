import React, { useEffect, useRef, useState } from "react";

const Place = ({ parentCallback }) => {
    const placeInputRef = useRef(null);
    const [place, setPlace] = useState(null);

    useEffect(() => {
        handleAPI();
    }, []);

    useEffect(() => {
        parentCallback(place);
    }, [place]);

    //initialize google places api
    const handleAPI = () => {
        let autocomplete = new window.google.maps.places.Autocomplete(placeInputRef.current);
        new window.google.maps.event.addListener(autocomplete, "place_changed", function () {
            let place = autocomplete.getPlace();
            let postCode = "";
            let city = "";
            let country = "";
            let house = "";

            //Getting required values
            for (const component of place.address_components) {
                const componentType = component.types[0];

                switch (componentType) {
                    case "street_number": {
                        house = component.short_name;
                        break;
                    }

                    case "postal_code": {
                        postCode = component.short_name;
                        break;
                    }

                    case "locality": {
                        city = component.short_name;
                        break;
                    }

                    case "country": {
                        country = component.long_name;
                        break;
                    }
                }
            }

            //Saving required values to state
            setPlace({
                address: place.formatted_address,
                country: country,
                city: city,
                house: house,
                postCode: postCode
            });
        });
    };

    return (
        <>
            <input id="placeInput" type="text" ref={placeInputRef} />
        </>
    );
};

export default Place;