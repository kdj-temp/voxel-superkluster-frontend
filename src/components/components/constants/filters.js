import Swal from 'sweetalert2' ;

export const categories = [
    {
        value: 'art',
        label: 'Art',
    },
    {
        value: 'music',
        label: 'Music'
    },
    {
        value: 'domain_names',
        label: 'Domain Names'
    },
    {
        value: 'virtual_world',
        label: 'Virtual World'
    },
    {
        value: 'trading_cards',
        label: 'Trading Cards'
    },
    {
        value: 'collectibles',
        label: 'Collectibles'
    },
    {
        value: 'sports',
        label: 'Sports'
    },
    {
        value: 'utility',
        label: 'Utility'
    }
];

export const status = [
    {
        value: 'on_auction',
        label: 'On Auction'
    },
    {
        value: 'has_offers',
        label: 'Has Offers'
    },
];

export const itemsType = [
    {
        value: 'single_items',
        label: 'Single Items'
    },
    {
        value: 'bundles',
        label: 'Bundles'
    }
];

export const collections = [
    {
        value: 'abstraction',
        label: 'Abstraction'
    },
    {
        value: 'patternlicious',
        label: 'Patternlicious'
    },
    {
        value: 'skecthify',
        label: 'Skecthify'
    },
    {
        value: 'cartoonism',
        label: 'Cartoonism'
    },
    {
        value: 'virtuland',
        label: 'Virtuland'
    },
    {
        value: 'papercut',
        label: 'Papercut'
    }
];

export const filterImageFile = (imageInput) => {
    if (imageInput.file) {
        const file = imageInput.file;
        var pattern = /image-*/;

        if (!file.type.match(pattern)) {
            Swal.fire({
                title: 'File type error',
                text: "Please check the type of the image you are trying to upload.",
                icon: 'warning',
                confirmButtonText: 'Close',
                timer: 5000,
                customClass: 'swal-height'
              });
            return false;
        }
        return true;
    } else {
        Swal.fire({
            title: 'File type error',
            text: "Please check the type of the image you are trying to upload.",
            icon: 'warning',
            confirmButtonText: 'Close',
            timer: 5000,
            customClass: 'swal-height'
          });
        return false;
    }
};

export const filterCollectionImageFile = (imageInput) => {
    if (imageInput) {
        const file = imageInput;
        var pattern = /image-*/;

        if (!file.type.match(pattern)) {
            Swal.fire({
                title: 'File type error',
                text: "Please check the type of the image you are trying to upload.",
                icon: 'warning',
                confirmButtonText: 'Close',
                timer: 5000,
                customClass: 'swal-height'
              });
            return false;
        }
        return true;
    } else {
        Swal.fire({
            title: 'File type error',
            text: "Please check the type of the image you are trying to upload.",
            icon: 'warning',
            confirmButtonText: 'Close',
            timer: 5000,
            customClass: 'swal-height'
          });
        return false;
    }
};

export const filterKycFile = (imageInput) => {
    const enableExtensions = ["pdf", "doc", "docx", "jpg", "png", "jpeg", "gif", "bmp", "tif",];
    if (imageInput.file) {
        const fileExtension = imageInput.file.name.split('.').pop();

        if (!enableExtensions.includes(fileExtension)) {
            Swal.fire({
                title: 'File type error',
                text: "Please check the type of the KYC document you are trying to upload.",
                icon: 'warning',
                confirmButtonText: 'Close',
                timer: 5000,
                customClass: 'swal-height'
              });
            return false;
        }
        return true;
    } else {
        Swal.fire({
            title: 'File type error',
            text: "Please check the type of the KYC document you are trying to upload.",
            icon: 'warning',
            confirmButtonText: 'Close',
            timer: 5000,
            customClass: 'swal-height'
          });
        return false;
    }
};
