import { createSlice } from "@reduxjs/toolkit";

function findIndex (array, id) {
    for( let i = 0; i < array.length; i++) {
        if (array[i].id === id) return i;
    }
    return null;
}

export const Slice = createSlice({
    name:'blogs',
    initialState:[],
    reducers:{
        saveAllBlogs: (state, action) => {
            return action.payload;
        },
        increaseCart: (state,action) => {
            let {id} = action.payload;
            let index = findIndex(state,id)
            if(index !== null){
                state[index].quantity = (state[index].quantity || 1) + 1;
            }
        },
        decreaseCart: (state,action) => {
            let {id} = action.payload;
            let index = findIndex(state,id)
            if(index !== null && state[index].quantity > 1){
                state[index].quantity -= 1;
            }
        },
        removeCart: (state, action) =>{
            const {id} = action.payload;
            return state.filter((product) => product.id !== id)
        }
    }
})

export const {saveAllBlogs, increaseCart, decreaseCart, removeCart} = Slice.actions
export default Slice.reducer