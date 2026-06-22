import { currentMember } from 'wix-members-frontend';

$w.onReady(function () {


    $w("#startFreeTrailButton").expand();

    currentMember.getMember()
        .then((member) => {
            if (member) {
 
                $w("#startFreeTrailButton").collapse();
            }
        })
        .catch((error) => {
            console.error(error);
        });
});