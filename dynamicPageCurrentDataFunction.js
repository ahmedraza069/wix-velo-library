import wixLocation from 'wix-location';
import wixData from 'wix-data';


$w.onReady(function () {

    $w("#dynamicDataset").onReady(() => {

        const currentItem = $w("#dynamicDataset").getCurrentItem();
        const venueTitle = currentItem.title;

        $w("#text933").text = "Home > Venues > " + venueTitle;
    });

try {
        $w('#dynamicDataset').onReady(async () => {
            const currentItem = $w('#dynamicDataset').getCurrentItem();
            
            if (!currentItem) return;

            const results = await wixData.query('VenuesListing') 
                .ascending('title')
                .limit(1000)
                .find();
            
            const allItems = results.items;
            const totalItems = allItems.length;
            const currentIndex = allItems.findIndex(item => item._id === currentItem._id);

            if (totalItems <= 1) {
                $w('#next').hide();
                $w('#previous').hide();
                return;
            }

            // --- NEXT BUTTON ---
            const nextIndex = (currentIndex + 1) % totalItems;
            const nextItem = allItems[nextIndex];

            $w('#next').label = "Next Venue"; 
            $w('#next').onClick(() => {
                wixLocation.to(nextItem['title']); 
            });

            // --- PREVIOUS BUTTON ---
            const prevIndex = (currentIndex - 1 + totalItems) % totalItems;
            const prevItem = allItems[prevIndex];

            $w('#previous').label = "Previous Venue";
            $w('#previous').onClick(() => {
                wixLocation.to(prevItem['title']);
            });
        });

    } catch (error) {
        console.error('Navigation Error:', error);
    }


});


