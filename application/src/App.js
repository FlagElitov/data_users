import React from "react";
import "./App.scss";
import MenuBar from "./components/MenuBar";
import UserList from "./components/UserList";

const App = () => {
  return (
    <>
      <MenuBar />
      <div className="container">
        <div className="userlist">
          <UserList />
        </div>
      </div>
    </>
  );
};

export default App;
