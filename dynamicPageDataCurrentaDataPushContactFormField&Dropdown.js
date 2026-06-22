import wixLocation from 'wix-location';
import wixData from 'wix-data';
import wixWindowFrontend from 'wix-window-frontend';

$w.onReady(function () {

    $w("#dynamicDataset").onReady(() => {

        const currentItem = $w("#dynamicDataset").getCurrentItem();
        const projectTitle = currentItem?.title;
        const projectType = currentItem?.category?.[0];

        // Breadcrumb
        $w("#text933").text = "Home > Projects > " + projectTitle;

        // Form fields
        setTimeout(() => {
            if (projectTitle && projectType) {
                $w("#form1").setFieldValues({
                    "short_answer_9df9": projectTitle,
                    "dropdown_c537": projectType,
                });
            }
        }, 1500);

    });

    // Next / Previous Navigation
    try {
        $w('#dynamicDataset').onReady(async () => {
            const currentItem = $w('#dynamicDataset').getCurrentItem();

            if (!currentItem) return;

      
            // console.log("Current Item Keys:", Object.keys(currentItem));
            // console.log("Current Item Full:", JSON.stringify(currentItem));

            const results = await wixData.query('Services')
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

            const nextIndex = (currentIndex + 1) % totalItems;
            const nextItem = allItems[nextIndex];

            const prevIndex = (currentIndex - 1 + totalItems) % totalItems;
            const prevItem = allItems[prevIndex];

     
            // console.log("Next Item Keys:", Object.keys(nextItem));
            // console.log("Next Item Full:", JSON.stringify(nextItem));

            $w('#next').label = "Next";
            $w('#next').onClick(() => {
                wixLocation.to(`/project-details/${nextItem.slug || nextItem.title}`);
            });

            $w('#previous').label = "Previous";
            $w('#previous').onClick(() => {
                wixLocation.to(`/project-details/${prevItem.slug || prevItem.title}`);
            });

        });

    } catch (error) {
        console.error('Navigation Error:', error);
    }

});