import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.css';
import { Table,  notification, Select, Modal, Button } from 'antd';
const { Option } = Select;
function App()  {
    const [posts, setPosts] = useState([]);
    const [searchData, setSearchData] = useState([]);
    const [isModalVisible,setIsModalVisible] = useState(false);
    const [userId,setUserId]=useState("");
    const [Id,setId]=useState("");
    const [body,setBody]=useState("");
    const [title,setTitle]=useState("");
    
    const showModal = () => {
        setIsModalVisible(true);
    };
    const handleOk = () => {
        setIsModalVisible(false);    
        setPosts(posts.concat({userId,Id,body,title}))
    };
    const handleCancel = () => {
        setIsModalVisible(false);
    };
    useEffect(() => {
        const url = 'https://jsonplaceholder.typicode.com/posts';
        fetch(url).then(resp => resp.json())
            .then(resp => {
                setPosts(resp);
                setSearchData(resp);
              
            }).catch(() => notification.error({
                message: 'Failed to the data',
            }))
    }, []);
    const Column = [
        {
            title: 'UserId',
            dataIndex: 'userId',
        },
        {
            title: 'Id',
            dataIndex: 'id'
        },
        {
            title: 'Title',
            dataIndex: 'title'
        },
        {
            title: 'Body',
            dataIndex: 'body'
        }
    ];
    const onChange = (value) => {
        value = value.toString().toLowerCase();
        if (!value) {
            setPosts(searchData);
        } else {
            const setFilterDatas = searchData.filter((res) => res['userId'].toString().toLowerCase().includes(value));
            setPosts(setFilterDatas);
        }
    }
    const inputChanges = (event) => {
        let { value, name } = event.target;
        if (name === 'userId') {
            setUserId(value);
        }
        if (name === 'Id') {
            setId(value);
        }
        if (name === 'body') {
            setBody(value);
        }
        if (name === 'title') {
            setTitle(value);
        }
    }
    const handleChange = (event) => {
        let { value } = event.target;
        value = value.toString().toLowerCase();
        if (!value) {
            setPosts(searchData);
        } else {
            const filteredData = searchData.filter((res) => 
                res['title'].toString().toLowerCase().includes(value))
            setPosts(filteredData);
        }
    }
    return (
        <div className="App">
                    <Button type="primary" onClick={showModal}>
                Open Modal
      </Button>
      <input type="text" placeholder="Search" onChange={handleChange} />
            <Select
                showSearch
                style={{ width: 200 }}
                placeholder="Select a UserId"
                onChange={onChange}
                filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
                >
             <Option value="1">1</Option>
             <Option value="2">2</Option>
             <Option value="3">3</Option>
             <Option value="4">4</Option>
             <Option value="5">5</Option>
             <Option value="6">6</Option>
             <Option value="7">7</Option>
             <Option value="8">8</Option>
             <Option value="9">9</Option>
             <Option value="10">10</Option>
            </Select>
            <Table dataSource={posts} columns={Column} />
            <Modal title="Add Post" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
               <input type="text" name="userId" placeholder="User ID" onChange = {inputChanges} /><br/>
               <input type="text" name="Id" placeholder="Id" onChange = {inputChanges} /><br/>
               <input type="text" name="title" placeholder="Title" onChange = {inputChanges}/><br/>
               <input type="text" name="body" placeholder="Content" onChange = {inputChanges} /><br/>
            </Modal>
        </div>
    )
}
export default App;