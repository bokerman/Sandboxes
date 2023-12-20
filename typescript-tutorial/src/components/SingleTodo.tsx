import React, { useState, useRef, useEffect } from "react";
import { Todo } from "../model";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";

type Props = {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const SingleTodo: React.FC<Props> = ({ todo, todos, setTodos }: Props) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [editText, setEditText] = useState<string>(todo.todo);
  const editInput = useRef<HtmlInputElement>(null);
  const handleDone = (id: number): void => {
    setTodos(
      todos.map((t) => (t.id === id ? { ...todo, isDone: !t.isDone } : t))
    );
  };

  const handleDelete = (id: number): void => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  const handleEdit = (id: number) => {
    if (!todo.isDone) {
      setIsEdit(!isEdit);
    }
  };

  const handleSubmit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setTodos(todos.map((t) => (t.id === id ? { ...todo, todo: editText } : t)));
    setIsEdit(false);
  };

  useEffect(() => {
    editInput.current?.focus();
  }, [isEdit]);

  return (
    <form className="todos__single" onSubmit={(e) => handleSubmit(e, todo.id)}>
      {todo.isDone ? (
        <s className="todos__single--text">{todo.todo}</s>
      ) : isEdit ? (
        <input
          ref={editInput}
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          className="todos__single--text"
        />
      ) : (
        <span className="todos__single--text">{todo.todo}</span>
      )}

      <div>
        <span className="icon" onClick={() => handleEdit(todo.id)}>
          <AiFillEdit />
        </span>
        <span className="icon" onClick={() => handleDelete(todo.id)}>
          <AiFillDelete />
        </span>
        <span className="icon" onClick={() => handleDone(todo.id)}>
          <MdDone />
        </span>
      </div>
    </form>
  );
};

export default SingleTodo;
