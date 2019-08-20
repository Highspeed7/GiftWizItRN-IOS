export const targetProductViewScript = `(
    () => { 
        let timeout;
        let pageType;

        // List page variables
        let wrappers;

        const elementsToSearch = [
            {
                type: "LIST_PAGE",
                selector: "div.styles__StyledProductCardRow-e5kry1-1"
            }
        ]
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
            }
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
                alert("button clicked");
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