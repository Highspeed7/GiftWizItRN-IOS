export const amazonProductView1Script = `
(
    () => {
        let itemElementsToSearch = [
            { 
                name: "span#title",
                image: "img#main-image"
            },
            {
                name: "h1#title",
                image: null
            }
        ];

        let getItemDetails = () => {
            var itemDetails = {
                name: null,
                image: null
            };

            itemElementsToSearch.forEach((elem, i) => {
                (Object.keys(elem)).forEach((key) => {
                    // Should all be ids; and therefore not repeated on the page.
                    var elementOnPage = document.querySelector(itemElementsToSearch[i][key]);

                    if(elementOnPage != null) {
                        itemDetails[key] = elementOnPage;
                    }
                })
            });
            return itemDetails;
        };

        let setButton = () => {
            // Using two elements to verify we're on the product page.
            let pageElem1 = document.querySelector("div.a-carousel-viewport");
            let pageElem2 = document.querySelector("img#main-image");

            if(pageElem1 != null && pageElem2 != null) {
                let gw_btn_container = document.createElement("div")
                gw_btn_container.style = "position: fixed; z-index: 9999; top: 2px; left: 12px;";

                let gw_btn = document.createElement("button");
                gw_btn.addEventListener("click", (e) => {
                    e.stopImmediatePropagation();
                    
                    // Define the data object
                    let data = {
                        payload: {},
                        case: null
                    };

                    data.case = "add_item";
                    data.payload = getItemDetails();
                    try {
                        data.payload.name = data.payload.name.textContent.trim();
                        alert(data.payload.name);
                        data.payload.image = data.payload.image.src;
                    }catch(error) {
                        alert(error);
                    }
                    
                    data.payload.url = window.location.href;
                    data.payload.domain = window.location.origin;
                    alert(JSON.stringify(data));
                    window.ReactNativeWebView.postMessage(JSON.stringify(data));
                });
                gw_btn.innerText = "+GW";
                gw_btn.id = "gw_add_btn";
                gw_btn.style = "min-height: 50px; border-radius: 5px;"

                gw_btn_container.append(gw_btn);

                pageElem1.append(gw_btn_container);
            }
        };

        let setHeartBeat = () => {
            var interval = setInterval(() => {
                // Set a timer to check for the existence of the add button
                var gw_add_btn = document.querySelector("button#gw_add_btn");
                if(gw_add_btn == null ) {
                   setButton();
                }
            }, 1000);
        }

        return {
            init: () => {
                // window.ReactNativeWebView.postMessage(window.location.href);
                setButton()
                setHeartBeat();
                window.addEventListener('contextmenu', (event) => {
                    alert(JSON.stringify(event.target));
                })
            }
        }
    }
)().init();`;