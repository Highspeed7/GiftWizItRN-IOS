export const updateObjectInArray = (lists, action, idFilter) => {
    var result = lists.map((item) => {
        if(item[idFilter] != action.key) {
            return item;
        }
        return {
            ...item,
            ...action.item
        }
    })
    return result;
}