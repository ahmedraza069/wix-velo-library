$w.onReady(async function () {
    try {
        // Product Page-er main product dataset ba product element theke data fetch kora
        const productData = await $w('#productPage1').getProduct(); 
        // Note: Apnar page-e product element-er ID jodi #productPage1 na hoye onno kichu hoy, tahole seta change kore diben.

        if (productData) {
            console.log("--- WIX PRODUCT PAGE DEBUG INFO ---");
            console.log("Product Name:", productData.name);
            console.log("Product ID:", productData._id);
            console.log("Price:", productData.price);
            console.log("Discounted Price:", productData.discountedPrice);
            console.log("SKU:", productData.sku);
            console.log("In Stock:", productData.inStock);
            console.log("Main Image URL:", productData.mainMedia);
            console.log("All Product Details:", productData);
        } else {
            console.log("No product found on this page.");
        }
    } catch (error) {
        console.error("Error fetching product data:", error);
    }
});