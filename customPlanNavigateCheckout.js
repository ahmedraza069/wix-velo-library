import { customPurchaseFlow } from "wix-pricing-plans-frontend";

$w.onReady(() => {
    $w("#button50").onClick(() => {
        customPurchaseFlow.navigateToCheckout({
            planId: "5cf07c27-4091-41b2-8ee9-7da0d790883b",
        });
    });
});




// Each button custom plan go to the checkout page link with custom button
import { customPurchaseFlow } from "wix-pricing-plans-frontend";

$w.onReady(() => {
    $w("#button50").onClick(async () => {
        let checkoutButton = $w("#button50");
        let originalLabel = checkoutButton.label; 

      
        checkoutButton.label = "PROCESSING...";
        checkoutButton.disable();
        try {

            await customPurchaseFlow.navigateToCheckout({
                planId: "5cf07c27-4091-41b2-8ee9-7da0d790883b",
            });
        } catch (error) {
        
            console.error("Checkout error:", error);
            checkoutButton.label = originalLabel;
            checkoutButton.enable();
        }
    });
});


// Multiple buttons pricing plan navigate checkout
import { customPurchaseFlow } from "wix-pricing-plans-frontend";

$w.onReady(() => {

    // 1. Create a list of your button IDs and their corresponding Plan IDs
    const planButtons = [
        { buttonId: "#button50", planId: "6c53c5f1-e79f-4174-911f-6e88c826cc16" }, // Plan 1
        { buttonId: "#button51", planId: "b9ea0bd8-f8c5-4b19-a8dc-a159c01c2a90" }, // Plan 2
        { buttonId: "#button52", planId: "734687c9-ec72-44c9-b222-e67adf1eee88" }, // Plan 3
        { buttonId: "#button53", planId: "531768db-7329-4d8a-ac60-70e5d5d1baeb" }, // Plan 4
        { buttonId: "#button57", planId: "f3a28bf1-ac69-4492-a66f-c6c9ce2418bb" }, // Plan 5
        { buttonId: "#button58", planId: "ecb3ea69-311c-49f3-ad69-61e17b5256b1" }, // Plan 6
        { buttonId: "#button59", planId: "ec9f65e4-d585-4e36-b6a3-b5999b4d3116" },  // Plan 7
        { buttonId: "#button62", planId: "7df98302-2e3d-4d5b-8b81-7b310d7be93d" },  // Plan 8
        { buttonId: "#button63", planId: "df7e745e-0a87-4b6a-acaa-b12ee01bfb28" }  // Plan 9
       
        // You can add more buttons and plan IDs here if needed
    ];

    // 2. Loop through the list and set the onClick event for each button
    planButtons.forEach((config) => {
        let checkoutButton = $w(config.buttonId);

        checkoutButton.onClick(async () => {
            let originalLabel = checkoutButton.label; 

            // Set the button to a processing state
            checkoutButton.label = "PROCESSING...";
            checkoutButton.disable();

            try {
                // Navigate to checkout with the specific plan ID
                await customPurchaseFlow.navigateToCheckout({
                    planId: config.planId,
                });
            } catch (error) {
                console.error(`Checkout error for ${config.buttonId}:`, error);
                
                // Revert the button to its original state if an error occurs
                checkoutButton.label = originalLabel;
                checkoutButton.enable();
            }
        });
    });
});