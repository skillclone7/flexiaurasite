
import React from 'react';
import { AdminDashboardContent } from './AdminDashboardContent';

interface AdminDashboardProps {
    onClose: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onClose }) => {
    return (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-[10000] flex animate-[fadeIn_0.3s_ease-out]">
            <AdminDashboardContent onClose={onClose} isModal={true} />
        </div>
    );
};

export default AdminDashboard;
