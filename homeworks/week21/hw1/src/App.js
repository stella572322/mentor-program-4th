import React, { useEffect, useState } from "react";
import styled from "styled-components";

function FilterButton({
	className,
	dataFilter,
	children,
	handleChangeFilter,
	handleDeleteIsDone,
}) {
	return (
		<button
			onClick={
				children ? () => handleChangeFilter(children) : handleDeleteIsDone
			}
			type='button'
			className={className}
			data-filter={dataFilter}
		>
			{children && children === "all"
				? "全部"
				: children === "active"
				? "未完成"
				: "完成"}
			{!children && "刪除所有已完成項目"}
		</button>
	);
}

function TodoItem({ id, content, isDone, handleChangeStatus, handleDelete }) {
	//子
	return (
		<li className='d-flex justify-content-end show-input flex-column mb-3'>
			<div className='input-group'>
				<input
					type='text'
					className='form-control'
					value={content}
					onChange={() => {}}
					aria-label="Reci pient's username with two button addons"
					aria-describedby='button-addon4'
				/>
				<div className='input-group-append' id='button-addon4'>
					<button
						className='btn btn-outline-secondary finish'
						onClick={() => handleChangeStatus(id, !isDone)}
						type='button'
					>
						{isDone ? "未完成" : "完成"}
					</button>
					<button
						className='btn btn-outline-secondary'
						type='button'
						onClick={() => handleDelete(id)}
					>
						刪除
					</button>
				</div>
			</div>
		</li>
	);
}

let id = 2;

function App() {
	//父
	const [filter, setFilter] = useState("all");
	const [value, setValue] = useState("");
	const [todos, setTodos] = useState([
		{
			id: 1,
			content: "new todo",
			isDone: false,
		},
	]);

	const handleChangeValue = (e) => {
		setValue(e.target.value);
	};

	const handleCreateTodo = () => {
		if (value.trim() === "") {
			setValue("");
			return;
		}
		setTodos([
			...todos,
			{
				id: id++,
				content: value.trim(),
				isDone: false,
			},
		]);
		setValue("");
	};

	const handleChangeStatus = (id, status) => {
		setTodos(
			todos.map((todo) => {
				if (todo.id !== id) {
					return todo;
				}
				return {
					...todo,
					isDone: status,
				};
			})
		);
	};

	const handleDelete = (id) => {
		setTodos(
			todos.filter((todo) => {
				return todo.id !== id;
			})
		);
	};

	const handleChangeFilter = (string) => {
		setFilter(string);
	};

	const handleDeleteIsDone = () => {
		setTodos(
			todos.filter((todo) => {
				return !todo.isDone;
				// if (todo.isDone === true) return false;
				// if (todo.isDone === false) return true;
			})
		);
	};

	return (
		<>
			<h1 className='text-center mt-3'>todos</h1>
			<div className='container mt-3'>
				<div className='input-group mb-3'>
					<input
						value={value}
						onChange={handleChangeValue}
						type='text'
						className='form-control create-input'
						placeholder='請輸入待辦事項'
						aria-label="Recipient's username"
						aria-describedby='button-addon2'
					/>
					<div className='input-group-append'>
						<button
							onClick={handleCreateTodo}
							className='btn btn-outline-secondary create-submit'
							type='button'
							id='button-addon2'
						>
							送出
						</button>
					</div>
				</div>
				<div className='mb-3 option'>
					<button type='button' className='btn badge-light count-item'>
						未完成項目
						<span className='badge badge-light uncomplete-count'>
							{todos.filter((todo) => !todo.isDone).length}
						</span>
						<span className='sr-only'>unread messages</span>
					</button>
					<FilterButton
						className={"btn btn-outline-warning"}
						dataFilter={"all-item"}
						children={"all"}
						handleChangeFilter={handleChangeFilter}
					/>
					<FilterButton
						className={"btn btn-outline-info"}
						dataFilter={"incomplete-item"}
						children={"active"}
						handleChangeFilter={handleChangeFilter}
					/>
					<FilterButton
						className={"btn btn-outline-dark"}
						dataFilter={"delete-complete-item"}
						children={"complete"}
						handleChangeFilter={handleChangeFilter}
					/>
					<FilterButton
						className={"btn btn-danger"}
						dataFilter={"delete-complete-item"}
						handleDeleteIsDone={handleDeleteIsDone}
					/>
					{/* <button
						onClick={() => handleChangeFilter("all")}
						type='button'
						className='btn btn-outline-warning'
						data-filter='all-item'
					>
						全部
					</button>
					<button
						onClick={() => handleChangeFilter("active")}
						type='button'
						className='btn btn-outline-info'
						data-filter='incomplete-item'
					>
						未完成
					</button>
					<button
						onClick={() => handleChangeFilter("complete")}
						type='button'
						className='btn btn-outline-dark'
						data-filter='complete-item'
					>
						已完成
					</button> */}
					{/* <button
						type='button'
						className='btn btn-danger'
						data-filter='delete-complete-item'
					>
						刪除所有已完成項目
					</button> */}
				</div>
				<ul className='p-0'>
					{todos
						.filter((todo) => {
							if (filter === "all") return todo;
							if (filter === "active") return !todo.isDone;
							if (filter === "complete") return todo.isDone;
						})
						.map((todo) => {
							return (
								<TodoItem
									id={todo.id}
									key={todo.id}
									content={todo.content}
									isDone={todo.isDone}
									handleChangeStatus={handleChangeStatus} //父的方法給兒子使用
									handleDelete={handleDelete}
								/>
							); // <子 12min變數 = {12鍋的值資料}
						})}
				</ul>
			</div>
		</>
	);
}

export default App;
