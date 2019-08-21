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

        const elementsToSearch = [
            {
                type: "LIST_PAGE",
                selector: "div.styles__StyledProductCardRow-e5kry1-1"
            },
            {
                type: "DETAIL_PAGE",
                selector: "div.CarouselWrapper-sc-9zgt9n-0"
            }
        ];

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
            let parentContainer = button.parentElement.parentElement;
            let name = parentContainer.previousElementSibling.querySelector("h1 > span").textContent.trim();
            let image = (parentContainer.querySelector("div.slide--active")).querySelector("img").src.trim();

            data.payload.name = name;
            data.payload.image = image;

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
        let setDetailButtonElement = () => {
            let containerElement = document.querySelector("div.CarouselWrapper-sc-9zgt9n-0");
            // window.reactNativeWebView.postMessage(JSON.stringify(containerElement));
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
                pageType = undefined;
                let elements;
                elementsToSearch.forEach((elem) => {
                    elements = document.querySelectorAll(elem.selector);
                    if(elements.length != 0) {
                        pageType = elem.type;
                    }
                })

                if(pageType == null) {
                    alert("No page type");
                }
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
            gw_btn_container.style = "position: absolute; z-index: 9999; top: 2px; left: 12px;";
            
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
            
            gw_btn.innerText = "+GW";
            gw_btn.id = "gw_add_btn";
            gw_btn.style = "min-height: 50px; border-radius: 5px;"

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