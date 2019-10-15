//$x("//div[contains(@class, 'item-tile')]/ancestor::li[contains(@class, 'slider-slide')]")
export const walmartProductViewScript = `
(
    () => {
        let pageType;

        let wrappers;

        let data = {
            payload: {},
            case: null
        };

        const elementsToSearch = [
            {
                type: "PRODUCTS_PAGE_1",
                rootElementPath: "//div[contains(@class, 'item-result-card')][a[//div[contains(@class, 'product-image')][//img[contains(@class, 'Tile-image')]]]]"
            },
            {
                type: "GENERAL_PRODUCTS_LIST_1",
                rootElementPath: "//div[contains(@class, 'item-result-card')][//a[//img[contains(@class, 'Tile-image')]]]"
            }
        ];

        const xPaths = {
            GENERAL_PRODUCTS_LIST_1: {
                rootElement: "//div[contains(@class, 'item-result-card')][//a[//img[contains(@class, 'Tile-image')]]]",
                image: "./descendant::img[contains(@class, 'Tile-image')]",
                name: "./descendant::div[contains(@class, 'product-title')]/p",
                itemUrl: "./descendant::a[//img[contains(@class, 'Tile-image')]]",
                button: "//button[@id='gw_add_btn']"
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
            setPageExperience();
        };

        const getPageType = () => {
            try {
                pageType = undefined;
                let elements;

                elementsToSearch.forEach((elem) => {
                    let result = document.evaluate(elem.rootElementPath, document);
                    elements = xPathToArray(result);
                    if(elements.length != 0) {
                        pageType = elem.type;
                    }
                })
            }catch(err) {
                alert(err);
            }
        };

        setGenProductList1Buttons = () => {
            try {
                let containerElements = xPathToArray((getXPathResult(xPaths[pageType].rootElement)));
                
                // We store this to verify the same number of elements after page change
                wrappers = containerElements;

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

        const setPageExperience = () => {
            switch(pageType) {
                case "PRODUCTS_PAGE_1":
                    // setListButtonElements();
                    break;
                case "GENERAL_PRODUCTS_LIST_1":
                    wrappers = null;
                    setGenProductList1Buttons();
                    setPaginatorButtonEvents();
                    break;
            }
        }
        setPaginatorButtonEvents = () => {
            var nextButton = document.querySelector("button.paginator-btn-next");
            var prevButton = document.querySelector("button.paginator-btn-prev");

            // Listen for page changes and just reload the page as this is a SPA
            if(nextButton != null) {
                nextButton.addEventListener('click', () => {
                    // Give the site time to change the url.
                    setTimeout(() => {
                        window.location = window.location.href;
                    }, 500)
                });
            }

            if(prevButton != null) {
                prevButton.addEventListener('click', () => {
                    // Give the site time to change the url.
                    setTimeout(() => {
                        window.location = window.location.href;
                    }, 500)
                });
            }
           
        }
        // GENERAL_PRODUCTS_LIST_1 Data collector
        const getGenProduct1SelectedItemData = (button) => {
            try {
                let root = document.evaluate(xPaths[pageType].rootElement, document).iterateNext();
                alert(root);
                let image = document.evaluate(xPaths[pageType].image, root).iterateNext();
                alert(image);
                let name = document.evaluate(xPaths[pageType].name, root).iterateNext();
                let itemUrl = document.evaluate(xPaths[pageType].itemUrl, root).iterateNext();

                data.payload.name = name.textContent.trim();
                data.payload.image = image.src.trim();
                data.payload.url = itemUrl.href;

                return true;

            }catch(err) {
                alert("Error " + err);
                // window.ReactNativeWebView.postMessage(JSON.stringify({debug: e}));
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
                case "GENERAL_PRODUCTS_LIST_1":
                    containerStyle = "height: 40px; width: 40px; position: absolute; z-index: 199; top: 0px; ";
                    btnStyle = "box-shadow: 3px 3px 10px grey; height: 40px; width: 40px; border-radius: 5px; background: white url('https://gwresourceblob.blob.core.windows.net/images/gw_tm.png') no-repeat fixed center; background-size: 40px 40px;";
                break;
            }
            
            gw_btn_container.style = containerStyle;

            let gw_btn = document.createElement("button");
            gw_btn.addEventListener("click", (e) => {
                e.stopImmediatePropagation();
                let button = e.currentTarget;
                switch(pageType) {
                    case "GENERAL_PRODUCTS_LIST_1":
                        try {
                            getGenProduct1SelectedItemData(button);
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
                setupNewPage();
            }
        }
    }
)().init();`;