import React from 'react';
import OrderProduct from '../components/OrderProduct';

const MyOrder = () => {
    const order = {
        status: '',
        address: '1234 Elm Street, Apt 5B, New York, NY',
        shippingId: 'SH123456',
        products: [
            {
                name: 'Product 1',
                amount: 2,
                price: 25.99,
                imageUrl: 'https://example.com/product1.jpg',
            },
            {
                name: 'Product 2',
                amount: 1,
                price: 12.99,
                imageUrl: 'https://example.com/product2.jpg',
            },
        ],
    };

    if (!order.status) {
        order.status = 'Order Received';
    }

    const getStatusIcon = (status) => {
        switch (status) {
            case 'Order Received':
                return 'fa-clipboard';
            case 'Shipping':
                return 'fa-shipping-fast';
            case 'Complete':
                return 'fa-check-circle';
            default:
                return 'fa-question-circle';
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'Order Received':
                return 'ได้รับคำสั่งซื้อ';
            case 'Shipping':
                return 'อยู่ระหว่างการจัดส่ง';
            case 'Complete':
                return 'สำเร็จ';
            default:
                return 'Unknown';
        }
    };

    const statusOrder = ['Order Received', 'Shipping', 'Complete'];

    const orderDate = new Date().toLocaleDateString();

    return (
        <div className="container mx-auto p-4 max-w-[1000px]">
            <div className="bg-white p-6 shadow-lg rounded-lg">
                <div className="flex flex-col md:flex-row justify-between items-center mb-4">
                    <h1 className="text-2xl font-semibold">รายละเอียดคำสั่งซื้อ</h1>
                    <div className="text-right">
                        <p className="font-bold text-gray-700 mt-4 lg:mt-0">วันที่สั่งซื้อ {orderDate}</p>
                    </div>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-4 flex flex-col md:flex-row md:justify-between md:items-center">
                    <div className="mb-4 lg:mb-0">
                        <p className="text-l md:text-xl font-semibold mb-2">ที่อยู่จัดส่ง
                        <i className="fas fa-map-marker-alt text-gray-500 ml-2"></i></p>
                        <p className="text-gray-700">{order.address}</p>
                    </div>
                    <div>
                        <p className="text-l text-left md:text-xl md:text-right font-semibold mb-2">เลขติดตามพัสดุ
                        <i className="fas fa-box text-gray-500 ml-2"></i></p>
                        <p className="text-left md:text-right text-gray-700">{order.shippingId}</p>
                    </div>
                </div>
                <h1 className="text-l md:text-xl font-semibold mt-8 mb-2 md:mt-0 mb-4">สถานะคำสั่งซื้อสินค้า</h1>
                <div className="flex flex-col md:flex-row items-left md:items-center md:justify-between mb-4">
                    {statusOrder.map((status, index) => (
                        <div
                            key={index}
                            className={`flex items-center ${order.status === status
                                ? 'text-red-500'
                                : statusOrder.indexOf(order.status) >= index
                                    ? 'text-red-500'
                                    : 'text-gray-400'
                                } mb-2 lg:mb-0 lg:mr-4`}
                        >
                            <i className={`fas ${getStatusIcon(status)} text-xl md:text-3xl mr-2`}></i>
                            <span className='font-bold'>{getStatusText(status)}</span>
                        </div>
                    ))}
                </div>
                <div className="flex flex-col mb-2">
                    {order.products.map((product, index) => (
                        <OrderProduct key={index} product={product} />
                    ))}
                </div>
                <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-4 flex flex-row lg:flex-row justify-between items-center">
                    <p className="text-l md:text-xl font-semibold">ราคาสุทธิ</p>
                    <p className="text-l md:text-xl font-semibold">${1000}</p>
                </div>
            </div>
        </div>
    );
};

export default MyOrder;
