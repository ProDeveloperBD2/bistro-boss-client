import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaBoxOpen, FaTruck, FaUsers, FaWallet } from "react-icons/fa";
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid } from 'recharts';

const AdminHome = () => {
    const { user } = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const { data: stats = {} } = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const res = await axiosSecure('/admin-stats')
            return res.data;
        }
    });
    const { data: chartData = [] } = useQuery({
        queryKey: ['chart-data'],
        queryFn: async () => {
            const res = await axiosSecure('/order-stats')
            return res.data;
        }
    });
    const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];
    const getPath = (x, y, width, height) => {
        return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
        ${x + width / 2}, ${y}
        C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
        Z`;
    };

    const TriangleBar = (props) => {
        const { fill, x, y, width, height } = props;

        return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
    };
    return (
        <div className="m-5">
            <h2 className="text-4xl text-yellow-500 font-serif">AdmiN PeneL .</h2>
            <h2 className="text-2xl mt-3">Hi, Welcome Back, <span className="font-serif text-yellow-500">{user?.displayName}</span></h2>
            <div>
                <div className="stats bg-white shadow mt-4 w-full">
                    <div className="stat flex text-white items-center bg-secondary">
                        <div className="">
                            <FaWallet className="text-4xl"></FaWallet>
                        </div>
                        <div>
                            <div className="text-3xl font-bold">${stats.revenue}</div>
                            <div className="font-semibold">Revenue</div>
                        </div>
                    </div>
                    <div className="stat flex text-white items-center bg-yellow-500">
                        <div className="">
                            <FaUsers className="text-4xl"></FaUsers>
                        </div>
                        <div>
                            <div className="text-3xl font-bold">{stats.users}</div>
                            <div className="font-semibold">Customers</div>
                        </div>
                    </div>
                    <div className="stat flex text-white items-center bg-red-500">
                        <div className="">
                            <FaBoxOpen className="text-4xl"></FaBoxOpen>
                        </div>
                        <div>
                            <div className="text-3xl font-bold">{stats.products}</div>
                            <div className="font-semibold">Products</div>
                        </div>
                    </div>
                    <div className="stat flex text-white items-center bg-info">
                        <div className="">
                            <FaTruck className="text-4xl"></FaTruck>
                        </div>
                        <div>
                            <div className="text-3xl font-bold">{stats.orders}</div>
                            <div className="font-semibold">Orders</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-slate-100 mt-5">
                <div>
                    <BarChart
                        width={700}
                        height={400}
                        data={chartData}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="category" />
                        <YAxis />
                        <Bar dataKey="total" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                            ))}
                        </Bar>
                    </BarChart>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;