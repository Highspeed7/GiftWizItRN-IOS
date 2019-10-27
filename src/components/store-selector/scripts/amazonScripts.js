export const amazonProductView1Script = `
(
    () => {
        let pageType = undefined;
        let pageAlertSet;
        let pageTypeTimer;
        let pageSetupTicker = 0;
        let data = {
            payload: {},
            case: null
        };

        const elementsToSearch = [
            {
                type: "LIST_PAGE_1",
                rootElementPath: "//div[contains(@class, 's-include-content-margin')][//div[contains(@class, 's-list-image-container')]][//span[contains(@class, 'a-text-normal')]][not(descendant::span[contains(@data-component-type, 'carousel')])]"
            },
            {
                type: "LIST_PAGE_2",
                rootElementPath: "//div[contains(@class, 'sc-')][./figure[contains(@data-test, 'product')][./descendant::img]]"
            },
            {
                type: "LIST_PAGE_3",
                rootElementPath: "//li[contains(@class, 'sx-table-item')][./descendant::a[contains(@class, 'sx-table-product')]][./descendant::div[contains(@class, 'sx-table-image-holder')][./img[contains(@class, 'sx-product-image')]]]"
            },
            {
                type: "DETAIL_PAGE_1",
                rootElementPath: "//div[contains(@id, 'productTitleGroupAnchor')][./descendant::div[contains(@id, 'title_feature_div')][./descendant::span[@id='title']]][//img[@data-a-image-name='mainImage']]"
            },
            {
                type: "DETAIL_PAGE_2",
                rootElementPath: "//div[contains(@id, 'imageBlock_feature_div')][//div[contains(@class, 'image-size-wrapper')][//img[contains(@data-a-image-name, 'mainImage')]]]"
            }
        ];

        const xPaths = {
            DETAIL_PAGE_1: {
                rootElement: "//div[contains(@id, 'productTitleGroupAnchor')][./descendant::div[contains(@id, 'title_feature_div')][./descendant::span[@id='title']]][//img[@data-a-image-name='mainImage']]",
                image: "./descendant::div[@id='image-block-row']/descendant::img",
                name: "./descendant::span[@id='title']",
                button: "//button[@id='gw_add_btn']"
            },
            DETAIL_PAGE_2: {
                rootElement: "//div[contains(@id, 'imageBlock_feature_div')][//div[contains(@class, 'image-size-wrapper')][//img[contains(@data-a-image-name, 'mainImage')]]]",
                image: "./descendant::img[contains(@data-a-image-name, 'mainImage')]",
                name: "//span[@id='titleExpanderContent']/descendant::h1/span",
                button: "//button[@id='gw_add_btn']"
            },
            LIST_PAGE_1: {
                rootElement: "//div[contains(@class, 's-include-content-margin')][//div[contains(@class, 's-list-image-container')]][//span[contains(@class, 'a-text-normal')]][not(descendant::span[contains(@data-component-type, 'carousel')])]",
                image: "./descendant::img",
                name: "./descendant::span[contains(@class, 'a-text-normal')]",
                itemUrl: "./descendant::a[contains(@class, 'a-link-normal')]"
            },
            LIST_PAGE_2: {
                rootElement: "//div[contains(@class, 'sc-')][./figure/descendant::img]",
                image: "./figure/descendant::img",
                name: "./figure[@data-test='product']/a/div/div[2]/div/div/span",
                itemUrl: "./figure[@data-test='product']/a"
            },
            LIST_PAGE_3: {
                rootElement: "//li[contains(@class, 'sx-table-item')][./descendant::a[contains(@class, 'sx-table-product')]][./descendant::div[contains(@class, 'sx-table-image-holder')][./img[contains(@class, 'sx-product-image')]]]",
                image: "./descendant::div[contains(@class, 'sx-table-image-holder')]/img[contains(@class, 'sx-product-image')]",
                name: "./div/div[contains(@class, 'sx-table-detail')]/descendant::h5[contains(@class, 'sx-title')]",
                itemUrl: "./div/div[contains(@class, 'sx-table-detail')]/descendant::a"
            }
        }

        const getSingleXPathElement = (xPathResult) => {
            return xPathResult.iterateNext();
        }

        const xPathToArray = (xPathResult) => {
            let node, nodes = []
            while(node = xPathResult.iterateNext()) {
                nodes.push(node);
            }
            return nodes;
        }

        let getXPathResult = (xpath) => {
            return document.evaluate(xpath, document);
        }
        
        const setupNewPage = () => {
            getPageType();
            if(pageType == null) {
                if(pageSetupTicker < 6) {
                    setTimeout(() => {
                        setupNewPage();
                        pageSetupTicker++;
                    }, 1000)
                }else {
                    window.ReactNativeWebView.postMessage(JSON.stringify({stopSpinner: true}));
                }
            }else {
                setPageExperience();
            }
        }
        
        const getPageType = () => {
            try {
                let elements;
                elementsToSearch.forEach((elem) => {
                    let result = document.evaluate(elem.rootElementPath, document);
                    elements = xPathToArray(result);
                    if(elements.length != 0) {
                        pageType = elem.type;
                        // window.ReactNativeWebView.postMessage(JSON.stringify({startSpinner: true}));
                    }
                })
            }catch(err) {
                alert(err);
            }
        };

        const setPageExperience = () => {
            switch(pageType) {
                case "LIST_PAGE_2":
                    if(pageAlertSet == null) {
                        window.ReactNativeWebView.postMessage(JSON.stringify({stopSpinner: true}));
                        window.ReactNativeWebView.postMessage(JSON.stringify({pageMessage: "For items on this page, please click through to the item to add it to your list"}));
                        pageAlertSet = true;
                    } 
                    break;
                case "LIST_PAGE_3":
                case "LIST_PAGE_1":
                    setListButtonElements();
                    window.ReactNativeWebView.postMessage(JSON.stringify({stopSpinner: true}));
                    break;
                case "DETAIL_PAGE_1":
                    setDetailButtonElements();
                    window.ReactNativeWebView.postMessage(JSON.stringify({stopSpinner: true}));
                    break;
                case "DETAIL_PAGE_2":
                    window.onhashchange = () => {
                        var hash = location.hash;
                        if(hash.length == 0) {
                            window.ReactNativeWebView.postMessage(JSON.stringify({startSpinner: true}));
                            var timer;
                            // Check for the next 3 seconds for button removal
                            timer = setTimeout(() => {
                                if(!isButtonStillVisible()) {
                                    location.href = location.href;
                                }
                            }, 3000)
                        }else {
                            window.ReactNativeWebView.postMessage(JSON.stringify({stopSpinner: true}));
                        }
                    }
                    setDetailButtonElements();
                    window.ReactNativeWebView.postMessage(JSON.stringify({stopSpinner: true}));
                    break;
            }
        }
        const isButtonStillVisible = () => {
            let button = getSingleXPathElement((getXPathResult(xPaths[pageType].button)));
            return button != null;
        }
        const setDetailButtonElements = () => {
            try {
                let containerElement = getSingleXPathElement((getXPathResult(xPaths[pageType].rootElement)));
                containerElement.style.position = "relative";

                // Check if button already exists
                let buttons = xPathToArray((getXPathResult(xPaths[pageType].button)));

                if(buttons.length == 0) {
                    containerElement.append(getButton());
                }
            }catch(e) {
                alert("Error " + e);
            }
        }
        const setListButtonElements = () => {
            try {
                let containerElements = xPathToArray((getXPathResult(xPaths[pageType].rootElement)));
                if(containerElements.length > 0) {
                    containerElements.forEach((elem, i) => {
                        elem.style.position = "relative";
                        elem.prepend(getButton());
                    });
                }
            }catch(e) {
                alert("Error " + e);
            }
        }

        const getListPageSelectedItemData = (button) => {
            try {
                let root = document.evaluate("./ancestor-or-self::div[contains(@class, 's-include-content-margin')]", button).iterateNext();
                let image = document.evaluate(xPaths[pageType].image, root).iterateNext();
                let name = document.evaluate(xPaths[pageType].name, root).iterateNext();
                let itemUrl = document.evaluate(xPaths[pageType].itemUrl, root).iterateNext();

                data.payload.name = name.textContent;
                data.payload.image = image.src;
                data.payload.url = itemUrl.href;

                return true;

            }catch(err) {
                alert("Error " + err);
                // window.ReactNativeWebView.postMessage(JSON.stringify({debug: e}));
            }
        }

        const getListPage3SelectedItemData = (button) => {
            try {
                let root = document.evaluate("./ancestor-or-self::div/ancestor-or-self::li", button).iterateNext();
                let image = document.evaluate(xPaths[pageType].image, root).iterateNext();
                let name = document.evaluate(xPaths[pageType].name, root).iterateNext();
                let itemUrl = document.evaluate(xPaths[pageType].itemUrl, root).iterateNext();

                data.payload.name = name.textContent;
                data.payload.image = image.src;
                data.payload.url = itemUrl.href;

                return true;
            }catch(err) {
                alert("Error " + err);
            }
        }

        const getListPage2SelectedItemData = (button) => {
            try{
                let root = document.evaluate("./ancestor-or-self::div[2]", button).iterateNext();
                alert(root.classList);
                let image = document.evaluate(xPaths[pageType].image, root).iterateNext();
                let name = document.evaluate(xPaths[pageType].name, root).iterateNext();
                let itemUrl = document.evaluate(xPaths[pageType].itemUrl, root).iterateNext();

                data.payload.name = name.textContent;
                data.payload.image = image.src;
                data.payload.url = itemUrl.href;

                return true;
            }catch(err) {
                alert("Error " + err);
            }
        }

        const getDetailPage2SelectedItemData = (button) => {
            try {
                let root = document.evaluate("./ancestor-or-self::div[2]", button).iterateNext();
                let image = document.evaluate(xPaths[pageType].image, root).iterateNext();
                let name = document.evaluate(xPaths[pageType].name, root).iterateNext();
    
                data.payload.name = name.textContent.trim();
                data.payload.image = image.src;

                return true;
                
            }catch(err) {
                alert("Error " + err);
            }
        }
        const getDetailPageSelectedItemData = (button) => {
            try {
                let root = document.evaluate("./ancestor-or-self::div[contains(@id, 'productTitleGroupAnchor')]", button).iterateNext();
                let image = document.evaluate(xPaths[pageType].image, root).iterateNext();
                let name = document.evaluate(xPaths[pageType].name, root).iterateNext();

                data.payload.name = name.textContent.trim();
                data.payload.image = image.src;

                return true;

            }catch(err) {
                alert("Error " + err);
            }
        }

        let doAddItemCall = () => {
            data.case = "add_item";

            // If the url is not set, set it to the page url.
            if(data.payload.url == null) {
                data.payload.url = window.location.href;
            }

            data.payload.domain = window.location.origin;

            window.ReactNativeWebView.postMessage(JSON.stringify(data));
        }

        const getButton = () => {
            let gw_btn_container = document.createElement("div")
            let containerStyle = null;
            let btnStyle = null;

            switch(pageType) {
                case "LIST_PAGE_3":
                case "LIST_PAGE_2":
                case "LIST_PAGE_1":
                    containerStyle = "height: 40px; width: 40px; position: absolute; z-index: 9999; bottom: 5px; right: 5px;";
                    btnStyle = "box-shadow: 3px 3px 10px grey; height: 40px; width: 40px; border-radius: 5px; background: white url('https://gwresourceblob.blob.core.windows.net/images/gw_tm.png') no-repeat fixed center; background-size: 40px 40px;";
                break;
                case "DETAIL_PAGE_1":
                    containerStyle = "height: 40px; width: 40px; position: absolute; z-index: 9999; top: 45px; right: 5px;";
                    btnStyle = "box-shadow: 1px 1px 15px skyblue; height: 40px; width: 40px; border-radius: 5px; background: white url('https://gwresourceblob.blob.core.windows.net/images/gw_tm.png') no-repeat fixed center; background-size: 40px 40px;";
                break;
                case "DETAIL_PAGE_2":
                    containerStyle = "height: 40px; width: 40px; position: absolute; z-index: 9999; top: 45px; right: 5px;";
                    btnStyle = "box-shadow: 1px 1px 15px skyblue; height: 40px; width: 40px; border-radius: 5px; background: white url('https://gwresourceblob.blob.core.windows.net/images/gw_tm.png') no-repeat fixed center; background-size: 40px 40px;";
                break;
            }
            
            gw_btn_container.style = containerStyle;

            let gw_btn = document.createElement("button");
            gw_btn.addEventListener("click", (e) => {
                e.stopImmediatePropagation();
                let button = e.currentTarget;
                switch(pageType) {
                    case "LIST_PAGE_3":
                        try {
                            getListPage3SelectedItemData(button);
                            doAddItemCall();
                        }catch(err) {
                            alert(err);
                        }
                        break;
                    case "LIST_PAGE_2":
                        try {
                            getListPage2SelectedItemData(button);
                            doAddItemCall();
                        }catch(err) {
                            alert(err);
                        }
                        break;
                    case "LIST_PAGE_1":
                        try {
                            getListPageSelectedItemData(button);
                            doAddItemCall();
                        }catch(err) {
                            alert(err);
                        }
                        break;
                    case "DETAIL_PAGE_1":
                        try {
                            getDetailPageSelectedItemData(button);
                            doAddItemCall()
                        }catch(err) {
                            alert(err);
                        }
                        break;
                    case "DETAIL_PAGE_2":
                        try {
                            getDetailPage2SelectedItemData(button);
                            doAddItemCall();
                        }catch(err) {
                            alert(err);
                        }
                        break;
                }
            });

            gw_btn.id = "gw_add_btn";
            gw_btn.style = btnStyle;

            gw_btn_container.append(gw_btn);

            return gw_btn_container;
        };

        return {
            init: () => {
                try {
                    setupNewPage();
                    // window.ReactNativeWebView.postMessage(window.location.href);
                    // setButton()
                    // setHeartBeat();
                    window.addEventListener('contextmenu', (event) => {
                        alert(JSON.stringify(event.target));
                    })
                }catch(err) {
                    alert(err);
                }
            }
        }
    }
)().init();`;