import React from 'react'
import BookScreen from './screens/BookScreen'
import AddBookScreen from './screens/AddBookScreen/AddBookScreen'
import DeleteBookScreen from './screens/DeleteBookScreen'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'antd/dist/antd.css';



const AppRouter = props => {
    return (
        <Router>
        	<div>
        		<ToastContainer hideProgressBar={true} autoClose={2500} position={toast.POSITION.BOTTOM_LEFT} />
        		<Route path="/" exact component={BookScreen} />
        		<Route path="/addbook" exact component={AddBookScreen} />
        		<Route path="/editbook/:id" exact component={AddBookScreen} />
        		<Route path="/deletebook/:id" exact component={DeleteBookScreen} />
        	</div>
        </Router>
    )
}


export default AppRouter