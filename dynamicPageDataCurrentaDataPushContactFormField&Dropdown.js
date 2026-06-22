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

        setTimeout(() => {
            if (projectTitle && projectType) {
                $w("#form1").setFieldValues({
                    "short_answer_9df9": projectTitle,
                    "dropdown_c537": projectType,
                });
            }
            console.log("Project Title:", projectTitle);
            console.log("Project Type:", projectType);
        }, 1500);

    });

});