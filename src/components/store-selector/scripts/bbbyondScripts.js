export const bbbYondProductViewScript = `
(
    () => {
        let pageType;
        let data = {
            payload: {},
            case: null
        };

        const elementsToSearch = [
            type: "INLINE_PRODUCTS_PAGE_1,
            rootElementPath: "//div[@itemscope][contains(@class, 'ProductDetails-inline')]"
        ]

        const xPaths = {
            INLINE_PRODUCTS_PAGE_1: {
                mainElementPath: "elementsToSearch.rootElementPath",
                rootElement: "//div[contains(@class, 'ProductThumbTile')]/ancestor::div[contains(@class, 'ProductItem')][contains(@class, 'flex')][not(contains(@class, 'flex-wrap'))]",
            }
        }

        setupNewPage = () => {
            getPageType();
            setPageExperience();
        }
        getPageType = () => {
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
        }
        setPageExperience = () => {

        }
        return {
            init: () => {
                try {
                    setupNewPage();
                }catch(err) {
                    alert(err);
                }
            }
        }
    }
)
`