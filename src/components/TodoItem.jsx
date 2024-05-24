import React from 'react';
import { Col, Row } from 'react-bootstrap';

const TodoItem = ({ item, deleteTask, changeTaskState }) => {
  const { task, _id, isComplete } = item;

  return (
    <Row>
      <Col xs={12}>
        <div className={`todo-item`}>
          <div className='todo-content'>{task}</div>

          <div>
            <button className='button-delete' onClick={() => deleteTask(_id)}>
              삭제
            </button>
            <button
              className={`button-delete ${isComplete && 'button-complete'}`}
              onClick={() => changeTaskState(_id)}
            >
              {isComplete ? `안 끝남` : `끝남`}
            </button>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default TodoItem;
