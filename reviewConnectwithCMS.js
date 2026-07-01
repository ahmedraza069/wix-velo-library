import wixData from 'wix-data';

const COLLECTION_ID = 'Review';
const HTML_ELEMENT_ID = '#html1';

let cachedReviews = null;
let iframeReady = false;

$w.onReady(function () {
    loadReviews();
    wireHtmlComponent();
});

function wireHtmlComponent() {
    $w(HTML_ELEMENT_ID).onMessage((event) => {
        const data = event.data;
        if (data && data.type === 'CTI_READY') {
            iframeReady = true;
            if (cachedReviews) {
                sendReviewsToEmbed(cachedReviews);
            }
        }
    });
}

function loadReviews() {
    wixData.query(COLLECTION_ID)
        .limit(50)
        .find()
        .then((results) => {
            cachedReviews = results.items.map(mapReviewItem);
            if (iframeReady) {
                sendReviewsToEmbed(cachedReviews);
            }
        })
        .catch((err) => {
            console.error('Failed to load reviews:', err);
        });
}

function mapReviewItem(item) {
    return {
        title: item.title || '',
        designation: item.designation || '',
        description: item.description || '',
        image: resolveImageUrl(item.image)
    };
}


function resolveImageUrl(rawImage) {
    if (!rawImage) return '';

    if (typeof rawImage === 'string' && rawImage.indexOf('wix:image://') !== 0) {
        return rawImage;
    }

    if (typeof rawImage === 'string' && rawImage.indexOf('wix:image://') === 0) {
        try {
            const afterProtocol = rawImage.split('wix:image://v1/')[1];
            const fileId = afterProtocol.split('/')[0];
            return 'https://static.wixstatic.com/media/' + fileId;
        } catch (e) {
            console.error('Could not parse image URI:', rawImage, e);
            return '';
        }
    }
    return '';
}
function sendReviewsToEmbed(reviews) {
    $w(HTML_ELEMENT_ID).postMessage({
        type: 'CTI_REVIEWS_DATA',
        reviews: reviews
    });
}