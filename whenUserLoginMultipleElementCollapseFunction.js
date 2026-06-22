import { currentMember, authentication } from 'wix-members-frontend';

const memberOnlyElements = [
    "#startFreeTrailButton",
    "#button4",
    "#button12",
];

function collapseForMembers() {
    memberOnlyElements.forEach(id => $w(id).collapse());
}

function expandForGuests() {
    memberOnlyElements.forEach(id => $w(id).expand());
}

$w.onReady(function () {


    expandForGuests();

    currentMember.getMember()
        .then((member) => {
            if (member) {
                collapseForMembers();
            }
        })
        .catch((error) => {
            console.error(error);
        });

    authentication.onLogin(() => {
        collapseForMembers();
    });

});