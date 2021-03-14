import React, { useState, useEffect } from 'react';
import BaseScreen from "../BaseScreen";
import { Form, Input, Button, Row, Col } from 'antd';
import { toast } from 'react-toastify';
import { useParams} from "react-router";
import { Typography } from 'antd';
import './AddBookScreen.css'
import axios from "axios";
import { useHistory } from 'react-router-dom'


const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};


const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export default function AddBookScreen(props) {

	let { id } = useParams();
	let history = useHistory();

	const [form] = Form.useForm();

	const { Title } = Typography;

	const [title, setTitle] = useState("");
	
	useEffect( () => {
			console.log(id);
			if(id){
				axios
	            .get('/books/' + id)
	            .then(response => {
	                console.log(response.data)
	                form.setFieldsValue({
				        title: response.data.title,
				        author: response.data.author,
				        publisher: response.data.publisher,
				        language: response.data.language,
				        genre: response.data.genre,
				        quantity: response.data.quantity
				    });
	            })
	            .finally(() => {
	            })	
			}
			else{

			}
			
		
    }, []);



	const onFinish = (values: any) => {
		console.log(id);

		if (id) {
			axios
            .put('/books/'+ id, values)
            .then(response => {
                toast('Book successfully Updated.')
                console.log('Edit book response', response)
                history.push("/");
            })
            .catch(error => {
                console.log('Update book error', error.response)
                toast('Error Updating Book.Please try Again.')
            })
		}
		else{
			axios
            .post('/books/', values)
            .then(response => {
                toast('Book successfully created.')
                console.log('Add book response', response)
                history.push("/");
            })
            .catch(error => {
                console.log('create book error', error.response)
                toast('Error Creating Book.Please try Again.')
            })
		}
		
	};

	const onReset = () => {
	form.resetFields();
	};

	return (
		<BaseScreen>
			<Row>
				<Col span={12}>
					<Title level={3}>Add/Edit Book</Title>
		      		<Form {...layout} form={form} name="control-hooks" onFinish={onFinish}>

						<Form.Item name="title" label="Title" rules={[{ required: true }]}>
						<Input />
						</Form.Item>

						<Form.Item name="author" label="Author" rules={[{ required: true }]}>
						<Input />
						</Form.Item>

						<Form.Item name="publisher" label="Publisher" rules={[{ required: true }]}>
						<Input />
						</Form.Item>

						<Form.Item name="language" label="Language" rules={[{ required: true }]}>
						<Input />
						</Form.Item>

						<Form.Item name="genre" label="Genre" rules={[{ required: true }]}>
						<Input />
						</Form.Item>

						<Form.Item name="quantity" label="Quantity" rules={[{ required: true }]}>
						<Input />
						</Form.Item>

						<Form.Item {...tailLayout}>
						<Button type="primary" htmlType="submit">
						  Submit
						</Button>
						<Button htmlType="button" onClick={onReset}>
						  Reset
						</Button>
						</Form.Item>

		    		</Form>

		      	</Col>
		      	<Col span={12}></Col>

		    </Row>
		</BaseScreen>
            
    )
}