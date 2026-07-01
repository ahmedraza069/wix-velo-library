import wixData from 'wix-data';

$w.onReady(async () => {

    $w("#repeater1").onItemReady(($item, itemData) => {
        
        $item("#text4").text = itemData.title  itemData.productName  "No Title"; 
        $item("#text2").text = itemData.price ? String(itemData.price) : "$0.00";

        // Set the placeholder text globally for this dropdown
        $item("#catalog-dropdown").placeholder = "See your products";

        if (itemData.refcategories && Array.isArray(itemData.refcategories)) {
            
            const dropdownOptions = itemData.refcategories.map(c => {
                return {
                    "label": c.productName, 
                    "value": c._id          
                };
            });

            $item("#catalog-dropdown").options = dropdownOptions;
            
            // CRITICAL: Clear the value so the placeholder text shows by default
            $item("#catalog-dropdown").value = undefined;

        } else {
            // Fallback if no categories exist
            $item("#catalog-dropdown").options = [];
        }
    });

    try {
        const res = await wixData
            .query("Catelog-new")
            .include("refcategories")
            .find();

        if (res.items.length > 0) {
            $w("#repeater1").data = res.items;
        } else {
            console.log("No data found in Catelog-new");
        }
    } catch (err) {
        console.log("Error fetching data:", err);
    }
});