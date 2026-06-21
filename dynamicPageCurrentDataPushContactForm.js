import wixLocation from 'wix-location';
import wixData from 'wix-data';
import wixWindowFrontend from 'wix-window-frontend';

$w.onReady(function () {

    $w("#dynamicDataset").onReady(() => {

        const currentItem = $w("#dynamicDataset").getCurrentItem();
        const venueTitle = currentItem?.title;

        if (venueTitle) {
            $w("#form1").setFieldValues({
                "venue_name": venueTitle,
            });
        }

    });

});