import { configureStore } from '@reduxjs/toolkit'
import usersSlice from '../features/users';
import chatsSlice from '../features/chats';

export default configureStore({
  reducer: {
    users: usersSlice,
    chats: chatsSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
}),
})