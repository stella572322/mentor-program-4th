const content_type = "application/json";
let API_URL = "https://student-json-api.lidemy.me";
let isLogin = true;
let nickname = "";

function getPostsByPage() {
	var xhr = new XMLHttpRequest();
	xhr.open("GET", `${API_URL}/posts?_sort=id&_order=desc&_expand=user`, true);
	xhr.setRequestHeader("content-type", content_type);
	xhr.onload = function () {
		console.log(JSON.parse(xhr.response));
		if (xhr.status >= 200 && xhr.status < 400) {
			var result = JSON.parse(xhr.response);
			console.log(result);
			for (let i = 0; i < result.length; i++) {
				/*最新留言至頂 */
				//console.log(nickname);
				//console.log(result[i].user.nickname);
				if (isLogin && result[i].user.nickname === nickname) {
					/*判斷登入狀態，比對該使用者是否具有第i篇留言的編輯刪除權限*/
					let element = document.createElement("li");
					element.classList.add("main_post_list");
					element.innerHTML = `
            <div class="post_list_content">
              <div class="post_content_top">
                <img class="avatar" src="./photo/user-circle.svg" />
                <div class="user_info">
                  <span class="nickname"
                    >${result[i].user.nickname}</span
                  >
                  <span class="create_time">${new Date(
										result[i].createdAt
									).toLocaleString()}</span>
                </div>
                <div class="update_button">
                  <a href="./update_page.html?id=${result[i].id}">
                    <button class="edit"> 編輯</button>
                  </a>
                  <button class="delete" data-value="${
										result[i].id
									}">刪除</button>
                </div>
              </div>
              <div>
                <p class="post_list_title">
                ${result[i].title}
                </p>
              </div>
              <button class="more_button">
                <a href="./single_post.html?id=${
									result[i].id
								}"><div class="more_btn">閱讀全文</div></a>
              </button>
            </div>`;
					document.querySelector(".main_inner").appendChild(element);
				}
			}
		}
	};
	xhr.send();
}

getPostsByPage();

/*
刪除文章
利用事件代理，取得垃圾桶和ID
串刪除API
*/
document.querySelector(".main_inner").addEventListener("click", (e) => {
	console.log(e.target);
	const delete_id = e.target.getAttribute("data-value");
	console.log(delete_id);
	const delete_button = e.target.getAttribute("class");
	if (delete_button === "delete") {
		var xhr = new XMLHttpRequest();
		xhr.open("DELETE", `${API_URL}/posts/${delete_id}`, true);
		xhr.setRequestHeader("content-type", content_type);
		xhr.onload = function () {
			console.log(JSON.parse(xhr.response));
			if (xhr.status >= 200 && xhr.status < 400) {
				window.location.reload("/"); /*重新整理*/
			}
		};
		xhr.send();
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
			console.log(result);
			if (result.ok === 1) {
				isLogin = true;
				nickname = result.data.nickname;
				console.log(nickname);
			} else {
				isLogin = false;
			}
		}
		getPostsByPage(1); /*修改顯示留言功能加入身分比對*/
		setNavbar();
	};
	xhr.send();
}
/*整個瀏覽器剛載入的時候，利用localstorage拿出的token取得使用者資料 */
let token = localStorage.getItem("token");
getMe(token);

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
	let logout = document.createElement("li");

	if (isLogin === true) {
		logout.innerHTML = `
    <a href="#" class="nav_logout">登出</a>
	`;
		create_post.innerHTML = `
	  <a href="./create_post.html" class="nav_create_posts">新增文章</a>
  `;
	}
	document.querySelector(".nav_title_list_left").appendChild(create_post);
	document.querySelector(".nav_title_list_right").appendChild(logout);
}
