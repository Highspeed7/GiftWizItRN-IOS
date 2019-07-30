const initialState = {
    introStep: 1,
    introComplete: null
}

const preAuthReducer = (state = initialState, action) => {
    switch(action.type) {
        case "STEP_UP":
            if((state.introStep + 1) >= 4){
                return {
                    ...state,
                    introStep: 1,
                    introComplete: true
                }
            }else {
                return {
                    ...state,
                    introStep: state.introStep + 1
                }
            }
        case "MODAL_CLOSED":
            return {
                ...state,
                introComplete: true
            }
        default: 
            return state;
    }
}

export default preAuthReducer;