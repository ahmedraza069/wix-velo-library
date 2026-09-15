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


