import { customPurchaseFlow } from "wix-pricing-plans-frontend";

$w.onReady(() => {
    $w("#button50").onClick(() => {
        customPurchaseFlow.navigateToCheckout({
            planId: "5cf07c27-4091-41b2-8ee9-7da0d790883b",
        });
    });
});
