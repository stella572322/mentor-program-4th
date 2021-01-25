const content_type = "application/json";
let API_URL = "https://student-json-api.lidemy.me";
let urlParams = new URLSearchParams(
	window.location.search
); /*取得querystring值的宣告寫法 */
let id = urlParams.get("id"); /*抓現在這個網址querystring中id的值 */
let isLogin = false;

function getSinglePost(id) {
	var xhr = new XMLHttpRequest();
	xhr.open("GET", `${API_URL}/posts/${id}?_expand=user`, true);
	xhr.setRequestHeader("content-type", content_type);
	xhr.onload = function () {
		if (xhr.status >= 200 && xhr.status < 400) {
			var result = JSON.parse(xhr.response);
			console.log(result);
			let element = document.createElement("li");
			element.classList.add("single_main_post");
			element.innerHTML = `
        <div class="post_img">
          <img src="https://picsum.photos/478/358?random=1" />
        </div>
        <div class="single_post_content">
          <div class="post_content_top">
            <img class="avatar" src="./photo/user-circle.svg" />
            <div class="user_info">
              <span class="nickname"
                >${result.user.nickname}</span
              >
              <span class="create_time">${new Date(
								result.createdAt
							).toLocaleString()}</span>
            </div>
          </div>
          <div>
            <p class="post_title">
            ${result.title}
            </p>
          </div>
          <div>
            <p class="single_post_content_bottom">
            ${result.body}
            </p>
          </div>
        </div>
        `;
			document.querySelector(".main_inner").appendChild(element);
		}
	};
	xhr.send();
}

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
		window.location.reload("/"); /*重新整理*/
	}
});

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
				setNavbar();
			} else {
				isLogin = false;
				setNavbar();
			}
		}
		getSinglePost(id);
	};
	xhr.send();
}

let token = localStorage.getItem("token");
getMe(token);

/*確認使用者登入/登出狀態，動態產生對應的navbar的功能列*/
function setNavbar() {
	let create_post = document.createElement("li");
	let login = document.createElement("li");
	let logout = document.createElement("li");
	let backstage = document.createElement("li");

	if (isLogin === false) {
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
	document.querySelector(".nav_title_list_right").appendChild(login);
	document.querySelector(".nav_title_list_right").appendChild(logout);
	document.querySelector(".nav_title_list_right").appendChild(backstage);
}
