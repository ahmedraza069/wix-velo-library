import wixData from 'wix-data';

$w.onReady(function () {

    $w("#form1").onSubmit((event) => {
        console.log("Full event object: ", event);

        const dataToSave = {
            "firstName": event.first_name,
            "lastName": event.last_name,
            "phone": event.phone,
            "email": event.email,
            "message": event.message,
        };

        console.log("Data to save: ", dataToSave);

        wixData.insert("Info", dataToSave)
            .then((results) => {
                console.log("Data saved", results);
            })
            .catch((err) => {
                console.error(err);
            });
    });

});