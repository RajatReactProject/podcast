import {configureStore} from "@reduxjs/toolkit";

import  userReducer  from "./slices/userSlice";
import  podcastReducer  from "./slices/podcastSlice";
//import { epoisodReducer } from "./slices/episodeSlice";

export default configureStore({
    reducer: {
        user:userReducer,
        podcasts:podcastReducer,
        //episode:epoisodReducer
    },
});