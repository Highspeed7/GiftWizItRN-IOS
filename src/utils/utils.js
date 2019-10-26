export const updateObjectInArray = (lists, data, idFilter, nested = null) => {
    var result = lists.map((item) => {
        if(item[idFilter] != data.key) {
            return item;
        }
        return {
            ...item,
            ...data.item
        }
    })
    return result;
}

export const sleep = (time, callback = null) => {
    setTimeout(() => callback !== null ? callback() : null, time);
}

export const goclone = (source) => {
    if (Object.prototype.toString.call(source) === '[object Array]') {
        var clone = [];
        for (var i=0; i<source.length; i++) {
            clone[i] = goclone(source[i]);
        }
        return clone;
    } else if (typeof(source)=="object") {
        var clone = {};
        for (var prop in source) {
            if (source.hasOwnProperty(prop)) {
                clone[prop] = goclone(source[prop]);
            }
        }
        return clone;
    } else {
        return source;
    }
}

const objShallowEqual = (objA, objB) => {
    if (objA === objB) {
      return true;
    }
  
    if (typeof objA !== 'object' || objA === null ||
        typeof objB !== 'object' || objB === null) {
      return false;
    }
  
    var keysA = Object.keys(objA);
    var keysB = Object.keys(objB);
  
    if (keysA.length !== keysB.length) {
      return false;
    }

    // Test for A's keys different from B.
    var bHasOwnProperty = hasOwnProperty.bind(objB);
    for (var i = 0; i < keysA.length; i++) {
        if (!bHasOwnProperty(keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
        return false;
        }
    }

  return true;
}

export const prependToArray = (value, arrayToCopy) => {
    var newArr = [...arrayToCopy];
    newArr.unshift(value);
    return newArr;
}

export const shallowCompare = (instance, nextProps, nextState) => {
    return (
      !objShallowEqual(instance.props, nextProps) ||
      !objShallowEqual(instance.state, nextState)
    );
}

export const timestampUTCToLocalReadable = (dateTime) => {
    let newDate = new Date(dateTime);
    newDate = newDate - newDate.getTimezoneOffset()*60*1000;
    newDate = new Date(newDate);
    return newDate.toDateString();
}
