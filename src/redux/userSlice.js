import {createSlice} from "@reduxjs/toolkit";
const userSlice = createSlice({
    name:"user",
    initialState :{
        userName:"nikita",
        email:"nikita@test.com"

    },
    reducers:{
        login:(state,action)=>{
            state.userName=action.payload.userName;
            state.email=action.payload.email

        }
    }
})
export const {login} = userSlice.actions;
export default userSlice.reducer;