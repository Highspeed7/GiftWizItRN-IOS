export const amazonProductView1Script = `(() => {
    var pageElem = document.querySelector("#inlineButtons_feature_div");
    if(pageElem != null) {
        var gw_btn_container = document.createElement("div")
        gw_btn_container.style = "margin-bottom: 10px;";

        var gw_btn = document.createElement("button");
        gw_btn.addEventListener("click", () => {
            alert("Add button clicked");
        });
        gw_btn.innerText = "Add to GiftWizIt";
        gw_btn.style = "min-height: 50px; border-radius: 5px;"

        gw_btn_container.append(gw_btn);

        pageElem.before(gw_btn_container);
    }
})();`;