import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import TodoBoard from './components/TodoBoard';
import api from './utils/api';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { useEffect, useState } from 'react';

function App() {
  const [todoList, setTodoList] = useState([]);
  const [todoValue, setTodoValue] = useState('');

  const getTasks = async () => {
    const resp = await api.get('/tasks');
    setTodoList(resp.data.data);
  };

  const addTask = async () => {
    try {
      const resp = await api.post('/tasks', {
        task: todoValue,
        isComplete: false,
      });

      if (resp.status === 200) {
        // 문제
        // 1. 입력창이 안 비워진다
        setTodoValue('');
        // 2. 추가한 할 일이 안보여진다
        getTasks();
      } else {
        throw new Error('task can not be added');
      }
    } catch (error) {
      console.log('ERROR', error);
    }
  };

  const deleteTask = async (id) => {
    try {
      const resp = await api.delete(`/tasks/${id}`);

      if (resp.status === 200) {
        getTasks();
      } else {
        throw new Error('task can not be added');
      }
    } catch (error) {
      console.log('ERROR', error);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <Container>
      <Row className='add-item-row'>
        <Col xs={12} sm={10}>
          <input
            type='text'
            placeholder='할일을 입력하세요'
            className='input-box'
            value={todoValue}
            onChange={(e) => setTodoValue(e.target.value)}
          />
        </Col>
        <Col xs={12} sm={2}>
          <button className='button-add' onClick={addTask}>
            추가
          </button>
        </Col>
      </Row>

      <TodoBoard todoList={todoList} deleteTask={deleteTask} />
    </Container>
  );
}

export default App;
