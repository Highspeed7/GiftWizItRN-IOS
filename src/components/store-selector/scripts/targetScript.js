export const targetProductViewScript = `(
    () => { 
        let timeout;
        let pageType;

        // List page variables
        let wrappers;

        let data = {
            payload: {},
            case: null
        };        
        const xPaths = {
            "DETAIL_PAGE": {
                carouselWrapper: "//div[contains(@class, 'CarouselStageGridWrapper')][//div[@class='slide--active']]",
                productTitle: "//h1[@data-test='product-title']/span",
                productImage: "//div[contains(@class, 'slide--active')]//img"
            },
            "LIST_PAGE": {

            }
        }
        const elementsToSearch = [
            {
                type: "LIST_PAGE",
                selector: "div.styles__StyledProductCardRow-e5kry1-1"
            },
            {
                type: "DETAIL_PAGE",
                selector: "styles__CarouselWrapper-sc-1cf0wdc-6"
            }
        ];
        let getSingleXPathElement = (xPathResult) => {
            return xPathResult.iterateNext();
        }
        let xPathToArray = (xPathResult) => {
            let node, nodes = []
            while(node = xPathResult.iterateNext()) {
                nodes.push(node);
            }
            return nodes;
        }
        let setupNewPage = () => {
            getPageType();
            setPageExperience();
        }
        let setPageExperience = () => {
            switch(pageType) {
                case "LIST_PAGE":
                    wrappers = null;
                    setListButtonElements();
                    setListPageScrollEvent();
                    break;
                case "DETAIL_PAGE":
                    setDetailButtonElement();
                    break;
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
        let setListPageScrollEvent = () => {
            if(timeout) {
                window.cancelAnimationFrame(timeout);
            }

            try {
                window.addEventListener('scroll', listScrollHandler);
            }catch(e) {
                alert(e);
            }
        }
        let getListPageSelectedItemData = (button) => {
            let parentContainer = button.parentElement.parentElement;
            let name = parentContainer.querySelector("a[data-test='product-title']").textContent.trim();
            let image = parentContainer.querySelector("picture > source[media='(min-width: 415px)']").srcset.trim();
            let itemUrl = parentContainer.querySelector("a[data-test='product-title']").href.trim();

            data.payload.name = name;
            data.payload.image = image;
            data.payload.url = itemUrl;

            return true;
        }
        let getDetailPageSelectedItemData = (button) => {
            try {
                let root = document.evaluate("./ancestor-or-self::div", button).iterateNext();
                let name = document.evaluate(xPaths[pageType].productTitle, document).iterateNext();
                let image = document.evaluate(xPaths[pageType].productImage, root).iterateNext();
                
                data.payload.name = name.textContent;
                data.payload.image = image.src;
            }
            catch(e) {
                window.ReactNativeWebView.postMessage(JSON.stringify({debug: e}));
            }
            return true;
        }
        let listScrollHandler = () => {
            try {
                timeout = window.requestAnimationFrame(() => {
                    let prevWrapperArr = [...wrappers];
                    wrappers = document.querySelectorAll("div.styles__StyledProductCardRow-e5kry1-1");
                    prevWrapperLen = prevWrapperArr.length;
                    if(prevWrapperLen < wrappers.length) {
                        newElemArr = (Array.from(wrappers)).slice(prevWrapperLen);
                        newElemArr.forEach((elem) => {
                            if(elem.querySelectorAll("button#gw_add_btn").length == 0) {
                                elem.append(getButton());
                            }
                        });
                    }
                });
            }catch(e) {
                alert(e);
            }
        }
        let getXPathResult = (xpath) => {
            return document.evaluate(xpath, document);
        }
        let setDetailButtonElement = () => {
            let containerElement = getSingleXPathElement((getXPathResult(xPaths[pageType].carouselWrapper)));
            containerElement.append(getButton());
        }
        let setListButtonElements = () => {
            wrappers = document.querySelectorAll("div.styles__StyledProductCardRow-e5kry1-1");
            try {
                wrappers.forEach((wrapper) => {
                    wrapper.append(getButton());
                });
            }catch(e) {
                alert(e);
            }
        }
        let getPageType = () => {
            try {
                alert("getting page type");
                pageType = undefined;
                let elements;
                elementsToSearch.forEach((elem) => {
                    if(elem.type == "DETAIL_PAGE") {
                        let result = document.evaluate("//div[contains(@class, 'CarouselStageGridWrapper')][//div[@class='slide--active']]", document);
                        elements = xPathToArray(result);
                    }else {
                        elements = document.querySelectorAll(elem.selector);
                    }

                    if(elements.length != 0) {
                        pageType = elem.type;
                    }
                })
            }catch(err) {
                alert(err);
            }
        }
        let setPageHeartBeat = () => {
            let promise = new Promise((resolve, reject) => {
                this.currentUrl = location.href;
                setInterval(() => {
                    if(this.currentUrl != location.href) {
                        // Force site not to be SPA
                        location.href = location.href
                    }
                }, 100)
                resolve();
            })
            return promise;
        }
        let getButton = () => {
            let gw_btn_container = document.createElement("div");
            gw_btn_container.style = "height: 40px; width: 40px; position: absolute; z-index: 9999; top: 20px; left: 12px;";
            
            let gw_btn = document.createElement("button");
            gw_btn.addEventListener("click", (e) => {
                // Get the target from event
                let container = e.currentTarget;
                // Depending on what pageType we're on.
                switch(pageType) {
                    case "LIST_PAGE":
                        try {
                            getListPageSelectedItemData(container);
                            doAddItemCall();
                        }catch(e) {
                            window.ReactNativeWebView.postMessage(JSON.stringify({debug: "Error " + e}));
                        }
                        break;
                    case "DETAIL_PAGE":
                        try {
                            getDetailPageSelectedItemData(container);
                            doAddItemCall();
                        }catch(e) {
                            window.ReactNativeWebView.postMessage(JSON.stringify({debug: "Error " + e}));
                        }
                }
            });
            
            // gw_btn.innerText = "+GW";
            gw_btn.id = "gw_add_btn";
            // gw_btn.innerText = "Hi";
            gw_btn.style = "box-shadow: 3px 3px 10px grey; height: 40px; width: 40px; border-radius: 5px; background: white url('https://gwresourceblob.blob.core.windows.net/images/gw_tm.png') no-repeat fixed center; background-size: 40px 40px;"

            gw_btn_container.append(gw_btn);

            return gw_btn_container;
        }
        return {
            init: async() => {
                await setPageHeartBeat();
                // Attempt to wait until the page loads
                setTimeout(setupNewPage, 2000);
            }
        }
    }
)().init();`;