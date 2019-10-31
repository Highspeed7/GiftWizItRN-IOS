import * as actionTypes from './actionTypes';

export const getAllPromoCollections = () => {
    return {
        type: actionTypes.GET_ALL_PROMO_COLLECTIONS
    };
};

export const setIdeaCollectionActive = (collectionId) => {
    return {
        type: actionTypes.SET_IDEA_COLL_ACTIVE,
        data: collectionId
    };
};

export const setIdeaCollectionInactive = () => {
    return {
        type: actionTypes.SET_IDEA_COLL_INACTIVE
    };
};

export const setIdeaCollectionItems = (collectionId) => {
    return {
        type: actionTypes.SET_IDEA_COLL_ITEMS,
        collectionId: collectionId
    };
};