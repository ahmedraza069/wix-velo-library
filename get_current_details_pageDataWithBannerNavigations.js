    $w.onReady(function () {

    $w("#dynamicDataset").onReady(() => {

        const currentItem = $w("#dynamicDataset").getCurrentItem();
        const venueTitle = currentItem.title;

        $w("#text933").text = "Home > Venues > " + venueTitle;
    });
});