const content_type = "application/json";
let API_URL = "https://student-json-api.lidemy.me";
let isLogin = false;

/*填寫欄位 -> 按送出鍵 -> 確定新增文章 -> 導回首頁*/
document.querySelector(".create_button").addEventListener("click", (e) => {
	const target = e.target.getAttribute("class");
	//console.log(target);
	if (target === "create_submit") {
		const textarea = document.querySelector(".create_post_content");
		const input = document.querySelector(".create_post_title");
		const token = localStorage.getItem("token"); /*取得token */

		//console.log(textarea.value);
		//console.log(input.value);
		const textarea_value = textarea.value;
		const input_value = input.value;
		var xhr = new XMLHttpRequest();
		xhr.open("POST", `${API_URL}/posts`, true);
		xhr.setRequestHeader("content-type", content_type);
		xhr.setRequestHeader(
			"authorization",
			`Bearer ${token}`
		); /*夾帶token到header */
		xhr.onload = function () {
			if (xhr.status >= 200 && xhr.status < 400) {
				console.log("成功");
				window.location.replace("index.html"); /*返回首頁*/
			}
		};
		xhr.send(
			JSON.stringify({
				/*物件轉成文字json*/
				/*查看取得資料的格式，來發資料格式 */
				title: input_value,
				body: textarea_value,
			})
		);
	}
});

/*取消新增文章 -> 導回首頁 */
document.querySelector(".create_button").addEventListener("click", (e) => {
	const target = e.target.getAttribute("class");
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
		setNavbar();
	};
	xhr.send();
}

/*整個瀏覽器剛載入的時候，利用localstorage拿出的token取得使用者資料 */
let token = localStorage.getItem("token");
getMe(token);

/*確認使用者登入/登出狀態，動態產生對應的navbar的功能列*/
function setNavbar() {
	let logout = document.createElement("li");
	let backstage = document.createElement("li");

	if (isLogin === true) {
		logout.innerHTML = `
    <a href="#" class="nav_logout">登出</a>
  `;
		backstage.innerHTML = `
	  <a href="./backstage_page.html" class="backstage">後台</a>
	`;
	}
	document.querySelector(".nav_title_list_right").appendChild(logout);
	document.querySelector(".nav_title_list_right").appendChild(backstage);
}
