/* CHUYỂN TAB LOGIN / REGISTER */

const tabButtons = document.querySelectorAll(".tab-btn")
const forms = document.querySelectorAll(".auth-form")

tabButtons.forEach(btn => {

btn.onclick = () => {

tabButtons.forEach(b => b.classList.remove("active"))
btn.classList.add("active")

const tab = btn.dataset.tab

forms.forEach(f => f.classList.remove("active"))

if(tab === "login"){
document.getElementById("loginForm").classList.add("active")
}else{
document.getElementById("registerForm").classList.add("active")
}

}

})


/* REGISTER */

document.getElementById("registerForm")
.addEventListener("submit",function(e){

e.preventDefault()

const name = document.getElementById("regName").value
const phone = document.getElementById("regPhone").value
const email = document.getElementById("regEmail").value
const password = document.getElementById("regPassword").value
const confirm = document.getElementById("regConfirmPassword").value

if(password !== confirm){

alert("Mật khẩu không khớp!")
return

}

let users = JSON.parse(localStorage.getItem("users")) || []

const existed = users.find(u => u.phone === phone)

if(existed){

alert("Số điện thoại đã đăng ký!")
return

}

users.push({
name,
phone,
email,
password
})

localStorage.setItem("users",JSON.stringify(users))

alert("Đăng ký thành công!")

/* CHUYỂN SANG LOGIN */

document.querySelector('[data-tab="login"]').click()

document.getElementById("loginPhone").value = phone

})



/* LOGIN */

document.getElementById("loginForm")
.addEventListener("submit",function(e){

e.preventDefault()

const phone = document.getElementById("loginPhone").value
const password = document.getElementById("loginPassword").value

let users = JSON.parse(localStorage.getItem("users")) || []

const user = users.find(u => u.phone === phone && u.password === password)

if(user){

alert("Đăng nhập thành công!")

/* LƯU USER ĐANG ĐĂNG NHẬP */

localStorage.setItem("loggedInUser",JSON.stringify(user))

window.location.href="customer-order.html"

}else{

alert("Sai số điện thoại hoặc mật khẩu!")

}

})