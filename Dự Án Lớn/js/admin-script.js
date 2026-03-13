document.addEventListener('DOMContentLoaded', () => {
    // ==================== DEMO DATA ====================
    const items = [
        { id: 1, name: 'Phở Bò Đặc Biệt', price: '65.000đ', restaurant: 'Phở Nam Định', rating: 4.8 },
        { id: 2, name: 'Bún Chả Hà Nội', price: '55.000đ', restaurant: 'Bún Chả Hàng Mã', rating: 4.9 },
        { id: 3, name: 'Cơm Gà Xối Mắm', price: '48.000đ', restaurant: 'Gà Rán 5 Sao', rating: 4.6 },
    ];

    const approveDishes = [
        { id: 1, name: 'Cơm Gà Xối Mắm', seller: 'Quán Gà', desc: 'Cơm gà cay nồng', status: 'Chờ duyệt' },
    ];

    const features = [
        { name: 'Phở Bò Đặc Biệt', img: 'https://picsum.photos/id/1015/200/150' },
    ];

    const users = [
        { id: 1, name: 'Nguyễn Văn A', type: 'Mua', contact: '0123456789', status: 'Hoạt động' },
    ];

    const orders = [
        { id: 1, customer: 'Nguyễn A', seller: 'Quán Phở', total: '120.000đ', status: 'Đang giao' },
    ];

    const vouchers = [
        { id: 1, code: 'FIRST50', value: 'Giảm 50k', valid: '31/12/2024', qty: 500 },
    ];

    const supportTickets = [
        { id: 1, sender: 'Khách B', issue: 'Đơn hàng trễ', status: 'Mới', date: '01/03/2026' },
    ];

    // ==================== HÀM RENDER TABLE CHUNG ====================
    function renderTable(tableId, data, columns) {
        const tbody = document.getElementById(tableId);
        if (!tbody) return;

        tbody.innerHTML = '';
        data.forEach(row => {
            const tr = document.createElement('tr');
            columns.forEach(col => {
                const td = document.createElement('td');
                td.textContent = row[col] || 'N/A';
                tr.appendChild(td);
            });
            const actionTd = document.createElement('td');
            actionTd.innerHTML = '<button class="btn-primary small">Chỉnh sửa</button> <button class="btn-danger small">Xóa</button>';
            tr.appendChild(actionTd);
            tbody.appendChild(tr);
        });
    }

    // Render các bảng khác khi load
    renderTable('itemsTable', items, ['id', 'name', 'price', 'restaurant', 'rating']);
    renderTable('approveTable', approveDishes, ['id', 'name', 'seller', 'desc', 'status']);
    renderTable('usersTable', users, ['id', 'name', 'type', 'contact', 'status']);
    renderTable('ordersTable', orders, ['id', 'customer', 'seller', 'total', 'status']);
    renderTable('vouchersTable', vouchers, ['id', 'code', 'value', 'valid', 'qty']);
    renderTable('supportTable', supportTickets, ['id', 'sender', 'issue', 'status', 'date']);

    // Render danh sách món nổi bật
    const featureList = document.getElementById('featureList');
    if (featureList) {
        features.forEach(f => {
            const div = document.createElement('div');
            div.className = 'feature-item';
            div.innerHTML = `<img src="${f.img}" alt="${f.name}"><p>${f.name}</p><button>Đặt nổi bật</button>`;
            featureList.appendChild(div);
        });
    }

    // ==================== XỬ LÝ CHUYỂN SECTION ====================
    document.querySelectorAll('.sidebar-nav a').forEach(a => {
        a.addEventListener('click', function(e) {
            e.preventDefault();

            // Xóa active cũ
            document.querySelectorAll('.sidebar-nav a').forEach(link => link.classList.remove('active'));
            this.classList.add('active');

            // Ẩn tất cả section
            document.querySelectorAll('.admin-section').forEach(sec => {
                sec.classList.remove('active');
                sec.style.display = 'none';
            });

            // Lấy ID section
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                targetSection.classList.add('active');
                targetSection.style.display = 'block';

                // Cập nhật tiêu đề
                document.getElementById('pageTitle').textContent = this.textContent.trim();

                // Nếu chuyển sang phần báo cáo thống kê → render biểu đồ
                if (targetId === 'reports') {
                    renderRevenueChart();
                }
            }
        });
    });

    // Mặc định hiển thị dashboard
    const dashboardLink = document.querySelector('.sidebar-nav a[href="#dashboard"]');
    if (dashboardLink) dashboardLink.classList.add('active');

    // ==================== BIỂU ĐỒ DOANH THU ====================
    function renderRevenueChart() {
        const canvas = document.getElementById('revenueChart');
        if (!canvas) {
            console.error('Không tìm thấy canvas #revenueChart! Kiểm tra HTML trong section #reports.');
            return;
        }

        const ctx = canvas.getContext('2d');
        if (!ctx) {
            console.error('Không lấy được context 2D của canvas.');
            return;
        }

        // Xóa biểu đồ cũ nếu đã tồn tại (tránh chồng biểu đồ)
        if (canvas.chartInstance) {
            canvas.chartInstance.destroy();
        }

        canvas.chartInstance = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00', '24:00'],
                datasets: [{
                    label: 'Doanh thu theo giờ (triệu VND)',
                    data: [0.2, 0.5, 1.1, 2.3, 3.8, 4.5, 3.2, 1.8, 0.9], // dữ liệu mẫu - bạn có thể thay bằng dữ liệu thật
                    borderColor: '#00C9B0',
                    backgroundColor: 'rgba(0, 201, 176, 0.2)',
                    tension: 0.4,
                    fill: true,
                    pointBackgroundColor: '#00C9B0',
                    pointBorderColor: '#fff',
                    pointHoverRadius: 8,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: true, position: 'top', labels: { color: '#333', font: { size: 14 } } },
                    tooltip: { mode: 'index', intersect: false },
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: { display: true, text: 'Doanh thu (triệu VND)', color: '#333', font: { size: 14 } },
                        grid: { color: '#eee' }
                    },
                    x: {
                        title: { display: true, text: 'Giờ trong ngày', color: '#333', font: { size: 14 } },
                        grid: { display: false }
                    }
                }
            }
        });

        console.log('%cBiểu đồ doanh thu đã render thành công!', 'color:#00C9B0; font-weight:bold; font-size:16px;');
    }

    // ==================== LOG KHI LOAD ====================
    console.log('%c✅ Admin script load thành công! Chuyển tab hoạt động bình thường.', 'color:#00C9B0; font-size:16px; font-weight:bold');
});
document.addEventListener('DOMContentLoaded', () => {
    // ==================== DEMO DATA ====================
    const items = [
        { id: 1, name: 'Phở Bò Đặc Biệt', price: '65.000đ', restaurant: 'Phở Nam Định', rating: 4.8 },
        { id: 2, name: 'Bún Chả Hà Nội', price: '55.000đ', restaurant: 'Bún Chả Hàng Mã', rating: 4.9 },
        { id: 3, name: 'Cơm Gà Xối Mắm', price: '48.000đ', restaurant: 'Gà Rán 5 Sao', rating: 4.6 },
    ];

    const approveDishes = [
        { id: 1, name: 'Cơm Gà Xối Mắm', seller: 'Quán Gà', desc: 'Cơm gà cay nồng', status: 'Chờ duyệt' },
    ];

    const features = [
        { name: 'Phở Bò Đặc Biệt', img: 'https://picsum.photos/id/1015/200/150' },
    ];

    const users = [
        { id: 1, name: 'Nguyễn Văn A', type: 'Mua', contact: '0123456789', status: 'Hoạt động' },
    ];

    const orders = [
        { id: 1, customer: 'Nguyễn A', seller: 'Quán Phở', total: '120.000đ', status: 'Đang giao' },
    ];

    const vouchers = [
        { id: 1, code: 'FIRST50', value: 'Giảm 50k', valid: '31/12/2024', qty: 500 },
    ];

    const supportTickets = [
        { id: 1, sender: 'Khách B', issue: 'Đơn hàng trễ', status: 'Mới', date: '01/03/2026' },
    ];

    // ==================== HÀM RENDER TABLE CHUNG ====================
    function renderTable(tableId, data, columns) {
        const tbody = document.getElementById(tableId);
        if (!tbody) return;

        tbody.innerHTML = '';
        data.forEach(row => {
            const tr = document.createElement('tr');
            columns.forEach(col => {
                const td = document.createElement('td');
                td.textContent = row[col] || 'N/A';
                tr.appendChild(td);
            });
            const actionTd = document.createElement('td');
            actionTd.innerHTML = '<button class="btn-primary small">Chỉnh sửa</button> <button class="btn-danger small">Xóa</button>';
            tr.appendChild(actionTd);
            tbody.appendChild(tr);
        });
    }

    // Render các bảng khác khi load
    renderTable('itemsTable', items, ['id', 'name', 'price', 'restaurant', 'rating']);
    renderTable('approveTable', approveDishes, ['id', 'name', 'seller', 'desc', 'status']);
    renderTable('usersTable', users, ['id', 'name', 'type', 'contact', 'status']);
    renderTable('ordersTable', orders, ['id', 'customer', 'seller', 'total', 'status']);
    renderTable('vouchersTable', vouchers, ['id', 'code', 'value', 'valid', 'qty']);
    renderTable('supportTable', supportTickets, ['id', 'sender', 'issue', 'status', 'date']);

    // Render danh sách món nổi bật
    const featureList = document.getElementById('featureList');
    if (featureList) {
        features.forEach(f => {
            const div = document.createElement('div');
            div.className = 'feature-item';
            div.innerHTML = `<img src="${f.img}" alt="${f.name}"><p>${f.name}</p><button>Đặt nổi bật</button>`;
            featureList.appendChild(div);
        });
    }

    // ==================== XỬ LÝ CHUYỂN SECTION ====================
    document.querySelectorAll('.sidebar-nav a').forEach(a => {
        a.addEventListener('click', function(e) {
            e.preventDefault();

            // Xóa active cũ
            document.querySelectorAll('.sidebar-nav a').forEach(link => link.classList.remove('active'));
            this.classList.add('active');

            // Ẩn tất cả section
            document.querySelectorAll('.admin-section').forEach(sec => {
                sec.classList.remove('active');
                sec.style.display = 'none';
            });

            // Lấy ID section
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                targetSection.classList.add('active');
                targetSection.style.display = 'block';

                // Cập nhật tiêu đề
                document.getElementById('pageTitle').textContent = this.textContent.trim();

                // Nếu chuyển sang phần báo cáo thống kê → render biểu đồ
                if (targetId === 'reports') {
                    renderRevenueChart();
                }
            }
        });
    });

    // Mặc định hiển thị dashboard
    const dashboardLink = document.querySelector('.sidebar-nav a[href="#dashboard"]');
    if (dashboardLink) dashboardLink.classList.add('active');

    // ==================== BIỂU ĐỒ DOANH THU ====================
    function renderRevenueChart() {
        const canvas = document.getElementById('revenueChart');
        if (!canvas) {
            console.error('Không tìm thấy canvas #revenueChart! Kiểm tra HTML trong section #reports.');
            return;
        }

        const ctx = canvas.getContext('2d');
        if (!ctx) {
            console.error('Không lấy được context 2D của canvas.');
            return;
        }

        // Xóa biểu đồ cũ nếu đã tồn tại (tránh chồng biểu đồ)
        if (canvas.chartInstance) {
            canvas.chartInstance.destroy();
        }

        canvas.chartInstance = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00', '24:00'],
                datasets: [{
                    label: 'Doanh thu theo giờ (triệu VND)',
                    data: [0.2, 0.5, 1.1, 2.3, 3.8, 4.5, 3.2, 1.8, 0.9], // dữ liệu mẫu - bạn có thể thay bằng dữ liệu thật
                    borderColor: '#00C9B0',
                    backgroundColor: 'rgba(0, 201, 176, 0.2)',
                    tension: 0.4,
                    fill: true,
                    pointBackgroundColor: '#00C9B0',
                    pointBorderColor: '#fff',
                    pointHoverRadius: 8,
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: true, position: 'top', labels: { color: '#333', font: { size: 14 } } },
                    tooltip: { mode: 'index', intersect: false },
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: { display: true, text: 'Doanh thu (triệu VND)', color: '#333', font: { size: 14 } },
                        grid: { color: '#eee' }
                    },
                    x: {
                        title: { display: true, text: 'Giờ trong ngày', color: '#333', font: { size: 14 } },
                        grid: { display: false }
                    }
                }
            }
        });

        console.log('%cBiểu đồ doanh thu đã render thành công!', 'color:#00C9B0; font-weight:bold; font-size:16px;');
    }

    // ==================== LOG KHI LOAD ====================
    console.log('%c✅ Admin script load thành công! Chuyển tab hoạt động bình thường.', 'color:#00C9B0; font-size:16px; font-weight:bold');
});