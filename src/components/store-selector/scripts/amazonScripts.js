export const amazonProductView1Script = `
(
    () => {
        let pageType;

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
                type: "DETAIL_PAGE_1",
                rootElementPath: "//div[contains(@id, 'productTitleGroupAnchor')][./descendant::div[contains(@id, 'title_feature_div')][./descendant::span[@id='title']]][//img[@data-a-image-name='mainImage']]"
            }
        ];

        const xPaths = {
            DETAIL_PAGE_1: {
                rootElement: "//div[contains(@id, 'productTitleGroupAnchor')][./descendant::div[contains(@id, 'title_feature_div')][./descendant::span[@id='title']]][//img[@data-a-image-name='mainImage']]",
                image: "./descendant::div[@id='image-block-row']/descendant::img",
                name: "./descendant::span[@id='title']",
                button: "//button[@id='gw_add_btn']"
            },
            LIST_PAGE_1: {
                rootElement: "//div[contains(@class, 's-include-content-margin')][//div[contains(@class, 's-list-image-container')]][//span[contains(@class, 'a-text-normal')]][not(descendant::span[contains(@data-component-type, 'carousel')])]",
                image: "./descendant::img",
                name: "./descendant::span[contains(@class, 'a-text-normal')]",
                itemUrl: "./descendant::a[contains(@class, 'a-link-normal')]"
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
        }
        
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

        const setPageExperience = () => {
            switch(pageType) {
                case "LIST_PAGE_1":
                    setListButtonElements();
                    break;
                case "DETAIL_PAGE_1":
                    setDetailButtonElements();
                    break;
            }
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
                case "LIST_PAGE_1":
                    containerStyle = "height: 40px; width: 40px; position: absolute; z-index: 9999; bottom: 5px; right: 5px;";
                    btnStyle = "box-shadow: 3px 3px 10px grey; height: 40px; width: 40px; border-radius: 5px; background: white url('https://gwresourceblob.blob.core.windows.net/images/gw_tm.png') no-repeat fixed center; background-size: 40px 40px;";
                break;
                case "DETAIL_PAGE_1":
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
                }
                // // Define the data object
                // let data = {
                //     payload: {},
                //     case: null
                // };

                // data.case = "add_item";
                // data.payload = getItemDetails();
                // try {
                //     data.payload.name = data.payload.name.textContent.trim();
                //     alert(data.payload.name);
                //     data.payload.image = data.payload.image.src;
                // }catch(error) {
                //     alert(error);
                // }
                
                // data.payload.url = window.location.href;
                // data.payload.domain = window.location.origin;
                // alert(JSON.stringify(data));
                // window.ReactNativeWebView.postMessage(JSON.stringify(data));
            });

            gw_btn.id = "gw_add_btn";
            gw_btn.style = btnStyle;

            gw_btn_container.append(gw_btn);

            return gw_btn_container;
        };


        // const itemElementsToSearch = [
        //     { 
        //         name: "span#title",
        //         image: "img#main-image"
        //     },
        //     {
        //         name: "h1#title",
        //         image: null
        //     }
        // ];

        // let getItemDetails = () => {
        //     var itemDetails = {
        //         name: null,
        //         image: null
        //     };

        //     itemElementsToSearch.forEach((elem, i) => {
        //         (Object.keys(elem)).forEach((key) => {
        //             // Should all be ids; and therefore not repeated on the page.
        //             var elementOnPage = document.querySelector(itemElementsToSearch[i][key]);

        //             if(elementOnPage != null) {
        //                 itemDetails[key] = elementOnPage;
        //             }
        //         })
        //     });
        //     return itemDetails;
        // };

        

        // let setHeartBeat = () => {
        //     var interval = setInterval(() => {
        //         // Set a timer to check for the existence of the add button
        //         var gw_add_btn = document.querySelector("button#gw_add_btn");
        //         if(gw_add_btn == null ) {
        //            setButton();
        //         }
        //     }, 1000);
        // }

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