import React from "react";
import BookScreen from "./screens/BookScreen";
import AddEditBookScreen from "./screens/AddEditBookScreen/AddEditBookScreen";
import DeleteBookScreen from "./screens/DeleteBookScreen";
import ViewBookScreen from "./screens/ViewBookScreen";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "antd/dist/antd.css";

const AppRouter = (props) => {
  return (
    <Router>
      <div>
        <ToastContainer
          hideProgressBar={true}
          autoClose={2500}
          position={toast.POSITION.BOTTOM_LEFT}
        />
        <Route path="/" exact component={BookScreen} />
        <Route path="/addbook" exact component={AddEditBookScreen} />
        <Route path="/editbook/:id" exact component={AddEditBookScreen} />
        <Route path="/deletebook/:id" exact component={DeleteBookScreen} />
        <Route path="/viewbook/:id" exact component={ViewBookScreen} />
      </div>
    </Router>
  );
};

export default AppRouter;
