export const getGiftIdeaNavigationRoute = (name) => {
    var retName = name.replace(/( )/g, "") + "Page";
    return retName;
}