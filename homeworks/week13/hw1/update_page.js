const content_type = "application/json";
let API_URL = "https://student-json-api.lidemy.me";
let urlParams = new URLSearchParams(
	window.location.search
); /*取得querystring值的宣告寫法 */
let id = urlParams.get("id"); /*抓現在這個網址querystring中id的值 */
let isLogin = true;
let nickname = "";

/*藉由id取得文章並顯示於編輯畫面中 */
function getPostById(id) {
	var xhr = new XMLHttpRequest();
	xhr.open("GET", `${API_URL}/posts/${id}?_expand=user`, true);
	//console.log(`${API_URL}/posts/${id}`);
	xhr.setRequestHeader("content-type", content_type);
	xhr.onload = function () {
		if (xhr.status >= 200 && xhr.status < 400) {
			var result = JSON.parse(xhr.response);
			if (isLogin && result.user.nickname === nickname) {
				let element = document.createElement("div");
				element.classList.add("container");
				element.innerHTML = `
              <p class="post_label">修改文章</p>
              <form class="create_form">
                <input
                  type="text"
                  class="create_post_title"
                  value="${result.title}"/>
                <textarea
                  class="create_post_content"
                  rows="20"
                > ${result.body}</textarea>
              </form>
              <div class="create_button">
                <button class="create_submit">送出</button>
                <button class="create_cancel">取消</button>
              </div>`;
				document.querySelector(".section").appendChild(element);
			}
		}
	};
	xhr.send();
}

/*拿token取得使用者資料 */
function getMe(token) {
	var xhr = new XMLHttpRequest();
	xhr.open("GET", `${API_URL}/me`, true);
	xhr.setRequestHeader("authorization", `Bearer ${token}`);
	xhr.onload = function () {
		if (xhr.status >= 200 && xhr.status < 400) {
			var result = JSON.parse(xhr.response); /*json文字轉成物件*/
			//console.log(result);
			if (result.ok === 1) {
				isLogin = true;
				nickname = result.data.nickname;
				//console.log(nickname);
			} else {
				isLogin = false;
			}
		}
		getPostById(id); /*修改顯示留言功能加入身分比對*/
		setNavbar();
	};
	xhr.send();
}
/*整個瀏覽器剛載入的時候，利用localstorage拿出的token取得使用者資料 */
let token = localStorage.getItem("token");
getMe(token);

document.querySelector(".section").addEventListener("click", (e) => {
	const create_submit = e.target.getAttribute("class");
	if (create_submit === "create_submit") {
		const input = document.querySelector("input").value;
		const textarea = document.querySelector("textarea").value;
		var xhr = new XMLHttpRequest();
		xhr.open("PATCH", `${API_URL}/posts/${id}`, true);
		xhr.setRequestHeader("content-type", content_type);
		xhr.onload = function () {
			console.log(xhr.response);
			if (xhr.status >= 200 && xhr.status < 400) {
				window.location.replace("index.html"); /*返回首頁*/
			}
		};
		xhr.send(
			JSON.stringify({
				/*物件轉成文字json*/
				title: input,
				body: textarea,
			})
		);
	}
});

/*取消修改文章 -> 導回首頁 */
document.querySelector(".section").addEventListener("click", (e) => {
	console.log(e.target);
	const target = e.target.getAttribute("class");
	console.log(target);
	if (target === "create_cancel") {
		window.location.replace("index.html"); /*返回首頁*/
	}
});

/*
監聽navbar功能列的logout
清空token和nickname資料
重新整理
*/
document.querySelector(".nav_title").addEventListener("click", (e) => {
	console.log(e.target);
	const target = e.target.getAttribute("class");
	console.log(target);
	if (target === "nav_logout") {
		localStorage.setItem("token", ""); /*清空token資料*/
		nickname = ""; /*清空nickname資料*/
		window.location.replace("index.html"); /*返回首頁*/
	}
});

/*確認使用者登入/登出狀態，動態產生對應的navbar的功能列*/
function setNavbar() {
	let create_post = document.createElement("li");
	let register = document.createElement("li");
	let login = document.createElement("li");
	let logout = document.createElement("li");
	let backstage = document.createElement("li");

	if (isLogin === false) {
		register.innerHTML = `
    <a href="./register_page.html" class="nav_register">註冊</a>
	`;
		logout.innerHTML = `
	  <a href="./login_page.html" class="nav_login">登入</a>
	`;
	} else if (isLogin === true) {
		create_post.innerHTML = `
	  <a href="./create_post.html" class="nav_create_posts">新增文章</a>
	`;
		login.innerHTML = `
    <a href="#" class="nav_logout">登出</a>
  `;
		backstage.innerHTML = `
	  <a href="./backstage_page.html" class="backstage">後台</a>
	`;
	}
	document.querySelector(".nav_title_list_left").appendChild(create_post);
	document.querySelector(".nav_title_list_right").appendChild(register);
	document.querySelector(".nav_title_list_right").appendChild(login);
	document.querySelector(".nav_title_list_right").appendChild(logout);
	document.querySelector(".nav_title_list_right").appendChild(backstage);
}
