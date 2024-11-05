import React from 'react';
import './Sidebar.module.scss'; // Tạo file CSS riêng để thêm hiệu ứng

function Sidebar() {
    return (
        <div className="sidebar">
            <button className="sidebar-button">
                <span className="icon">🔄</span> Thêm hồ sơ
            </button>
            <button className="sidebar-button">
                <span className="icon">📁</span> Hồ sơ bệnh nhân
            </button>
            <button className="sidebar-button">
                <span className="icon">📝</span> Phiếu khám bệnh
            </button>
        </div>
    );
}

export default Sidebar;
