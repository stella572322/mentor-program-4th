let num = 1;
let todoCount = 0;
let uncompleteTodoCount = 0;

/*新增todos */
$(".create-submit").click((e) => {
	const value = $(".create-input").val().trim();
	if (value) createTodo(value);
	$(".create-input").val("");
	// console.log(e.target);
	// console.log(value);
});

/*刪除todos */
$(".show-input").on("click", ".delete", (e) => {
	// console.log(e.target);
	const value = e.target.parentNode.parentNode.parentNode.getAttribute(
		"data-value"
	);
	const status = e.target.parentNode.childNodes[1].innerText;
	if (status === "未完成") {
		uncompleteTodoCount--;
	}
	deleteTodo(value);
	todoCount--;
	updateCounter();
});

/*變更todos 狀態*/
$(".show-input").on("click", ".switch", (e) => {
	const status = e.target.innerText;
	if (status === "完成") {
		e.target.innerText = "未完成";
		uncompleteTodoCount++;
		$(e.target).parents(".todo").removeClass("finish");
	}
	if (status === "未完成") {
		e.target.innerText = "完成";
		uncompleteTodoCount--;
		$(e.target).parents(".todo").addClass("finish");
	}
	todoCount--;
	updateCounter();
});

/*欄位項目選擇 */
$(".option").on("click", "button", (e) => {
	const target = $(e.target);
	const filter = target.attr("data-filter");
	if (filter === "all-item") {
		$(".todo").show();
	} else if (filter === "incomplete-item") {
		$(".todo").show();
		$(".todo.finish").hide();
	} else {
		$(".todo").hide();
		$(".todo.finish").show();
	}
});

/*刪除全部已完成項目 */
$(".option").on("click", "button", (e) => {
	const target = $(e.target);
	const filter = target.attr("data-filter");
	if (filter === "delete-complete-item") {
		todoCount = todoCount - (todoCount - uncompleteTodoCount);
		updateCounter();
		$(".todo.finish").remove();
		$(".todo").show();
	}
});

function createTodo(value) {
	const input = document.createElement("div");
	input.classList.add("todo");
	input.setAttribute("data-value", `${num}`);
	input.innerHTML = `
      <div class="input-group">
        <input
          type="text"
          class="form-control"
          value=${escapeHtml(value)}
          aria-label="Recipient's username with two button addons"
          aria-describedby="button-addon4"
          data-value='${num}'
        />
        <div class="input-group-append" id="button-addon4">
          <button class="btn btn-outline-secondary switch" type="button">
            未完成
          </button>
          <button class="btn btn-outline-secondary delete" type="button">
            刪除
          </button>
        </div>
      </div>
  `;
	$(".show-input").append(input);
	num++;
	todoCount++;
	uncompleteTodoCount++;
	updateCounter();
	$(".create-input").val("");
}

function updateCounter() {
	$(".uncomplete-count").text(uncompleteTodoCount);
}

function deleteTodo(value) {
	$(`div[data-value="${value}"]`).remove();
	return;
}

/*預防xss攻擊，文字跳脫 */
function escapeHtml(str) {
	return str
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#039;");
}
