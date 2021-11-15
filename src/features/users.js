import { createSlice } from '@reduxjs/toolkit'

export const usersSlice = createSlice({
  name: 'users',
  initialState: {
    value: {
        me: null,
        friends: []
    },
  },
  reducers: {
    addMe: (state, action) => {
        state.value.me = action.payload
    },

    addFriend: (state, action) => {
        state.value.friends = [...state.value.friends, action.payload]
    },

    comeOnline: (state, action) => {
      const friend = state.value.friends.find((friend) => friend.id === action.payload.id);
      if(friend){
        friend.setStatus(true)
      }
      
      state.value.friends = [...state.value.friends]
  },

  goOffline: (state, action) => {
    const friend = state.value.friends.find((friend) => friend.id === action.payload.id);
    if(friend){
      friend.setStatus(false)
    }
    state.value.friends = [...state.value.friends]
},

    clearUsers: (state) => {
      state= state.initialState
    }

  },
})

// Action creators are generated for each case reducer function
export const { addMe, addFriend, comeOnline, goOffline, clearUsers } = usersSlice.actions;

export const selectMe = state => state.users.value.me;
export const selectFriends = state => state.users.value.friends;
export const selectFriendsForSearch = state => state.users.value.friends.map((user)=> {return {id: user.id, firstName: user.firstName, lastName: user.lastName, fullName: user.fullName}})

export default usersSlice.reducer