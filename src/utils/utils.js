export const updateObjectInArray = (lists, action) => {
    var result = lists.map((item) => {
        if(item.id != action.key) {
            return item;
        }
        return {
            ...item,
            ...action.item
        }
    })
    return result;
}