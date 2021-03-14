import React, { useState, useEffect } from 'react';
import BaseScreen from "./BaseScreen";
import axios from "axios";
import { toast } from 'react-toastify'
import { useParams} from "react-router";
import { useHistory } from 'react-router-dom'

export default function DeleteBookScreen(props) {

	let history = useHistory();

	let { id } = useParams();

	useEffect( () => {
        axios
            .delete("/books/" + id)
            .then(response => {
                console.log(response.data)
                toast('Book successfully Deleted.')
                console.log('Delete book response', response)
                history.push("/");
            })
            .catch(error => {
                console.log('Delete book error', error.response)
                toast('Error Deleting Book.Please try Again.')
            })
    }, []);

	return (
		<BaseScreen>
		</BaseScreen>
	)
}