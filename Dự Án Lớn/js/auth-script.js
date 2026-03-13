document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.tab-btn');
    const forms = document.querySelectorAll('.auth-form');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const target = tab.dataset.tab;
            forms.forEach(f => f.classList.remove('active'));
            document.getElementById(target + 'Form').classList.add('active');
        });
    });

    // Validation cơ bản (chỉ demo, bạn có thể mở rộng gửi API)
    document.getElementById('loginForm').addEventListener('submit', e => {
        e.preventDefault();
        alert('Đăng nhập thành công! Chuyển hướng đến trang đặt món...');
        // window.location.href = 'customer-order.html';
    });

    document.getElementById('registerForm').addEventListener('submit', e => {
        e.preventDefault();
        const pass = document.getElementById('regPassword').value;
        const confirm = document.getElementById('regConfirmPassword').value;
        if (pass !== confirm) {
            alert('Mật khẩu xác nhận không khớp!');
            return;
        }
        alert('Đăng ký thành công! Vui lòng kiểm tra email/SMS để xác thực.');
    });

    console.log('%c✅ Trang Auth DTAFood sẵn sàng!', 'color:#00C9B0; font-size:16px;');
});