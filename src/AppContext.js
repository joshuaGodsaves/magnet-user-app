import React from "react";

export default React.createContext({
  user: {
    loggedIn: false,
    userName: "no user",
    token: undefined
  }
});
