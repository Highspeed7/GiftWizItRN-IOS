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
            let pageElem = document.querySelector("div#landing-image-wrapper");
            // let pageElem = document.querySelector("#inlineButtons_feature_div");
            if(pageElem != null) {
                let gw_btn_container = document.createElement("div")
                gw_btn_container.style = "position: fixed; z-index: 9999; top: 2px; left: 12px;";

                let gw_btn = document.createElement("button");
                gw_btn.addEventListener("click", (e) => {
                    e.stopImmediatePropagation();
                    let data = getItemDetails();
                    try {
                        data.name = data.name.textContent.trim();
                        alert(data.name);
                        data.image = data.image.src;
                    }catch(error) {
                        alert(error);
                    }
                    
                    data.url = window.location.href;
                    data.domain = window.location.origin;

                    window.ReactNativeWebView.postMessage(JSON.stringify(data));
                });
                gw_btn.innerText = "+GW";
                gw_btn.style = "min-height: 50px; border-radius: 5px;"

                gw_btn_container.append(gw_btn);

                pageElem.append(gw_btn_container);
            }
        };

        return {
            init: () => {
                window.ReactNativeWebView.postMessage(window.location.href);
                setButton()
            }
        }
    }
)().init();`;