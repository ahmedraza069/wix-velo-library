$w.onReady(async function () {
    try {
        // Fetch product data from the product page element
        const productData = await $w('#productPage1').getProduct(); 

        if (productData) {
            console.log("--- PRODUCT DATA LOADED ---", productData);

            // 1. Set Name and Description
            if (productData.name) {
                $w('#text27').text = productData.name;
            }

            if (productData.description) {
                $w('#text26').html = productData.description;
            }

            // 2. Extract media items safely
            const mediaArray = productData["mediaItems"];
            let imageSourceToSet = null;

            if (Array.isArray(mediaArray) && mediaArray.length > 0) {
                // Find the first item where type is Image
                const firstImage = mediaArray.find(item => item.type === "Image" || item.type === "image");

                if (firstImage && firstImage.src) {
                    console.log("Original Image URL Found:", firstImage.src);
                    imageSourceToSet = firstImage.src;
                } else if (productData.mainMedia) {
                    imageSourceToSet = productData.mainMedia;
                }
            } else if (productData.mainMedia) {
                imageSourceToSet = productData.mainMedia;
            }

            // 3. === FIX: CONVERT TO DIRECT HTTPS URL ===
            if (imageSourceToSet && imageSourceToSet.startsWith("wix:image://")) {
                
                let cleanUrl = imageSourceToSet.replace("wix:image://v1/https:/", "wix:image://v1/");
                
                let idPart = cleanUrl.split('v1/')[1].split('/')[0].split('#')[0];
                
                imageSourceToSet = `https://static.wixstatic.com/media/${idPart}`;
                console.log("Converted Direct HTTPS URL:", imageSourceToSet);
            }

            if (imageSourceToSet) {
                $w('#section2').background.src = imageSourceToSet; 
            }

        } else {
            console.log("No product data found on this page.");
        }
    } catch (error) {
        console.error("Error setting product details:", error);
    }
});