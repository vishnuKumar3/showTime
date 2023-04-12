/*{
    "userName":"nvk",
    "email":"nvkadmin@gmail.com",
    "password":"1234",
    "role":"SUPER_ADMIN"
}*/
import { Form, Input, Button, Card, message, Select } from "antd";
import axios from "axios";
import { useEffect } from "react";
import { useCookies } from 'react-cookie';
const { Option } = Select;

const formItemLayout = {
    labelCol: {
        span: 4,
    },
    wrapperCo: {
        span: 8,
    },
};

const onFinish = async (values) => {
    await axios({
        method: "post",
        url: "http://localhost:8080/admin/addAdmin",
        headers: { "Content-Type": "application/json" },
        data: values
    }).then((ret) => {
        if (ret.status == 200) message.success(ret.data.data, 2)
        else if (ret.status == 206) message.warning(ret.data.data, 2)
        else message.error(ret.data.data, 2)
    }).catch((ret) => {
        message.error(ret.response.data.data, 2)
    })
}

export default function AddAdminModule() {
    const [cookies] = useCookies()
    useEffect(() => {
        const cookieData = cookies.authorization
        if (cookieData) {
            if (!cookieData.id || !(cookieData.role == "SUPER_ADMIN")) {
                window.open("signIn", "_self")
            }
        }
        else {
            window.open("/signIn", "_self")
        }
    })
    return (
        <div className="flex flex-col items-center justify-center h-full bg-black">
            <Card
                title="AddAdmin"
                className="w-2/5"
                hoverable={true}
                headStyle={{ fontSize: "30px", color: "#e50914" }}
            >
                <Form
                    onFinish={onFinish}
                    className="w-full border-0 mt-5"
                >

                    <Form.Item
                        {...formItemLayout}
                        name="userName"
                        label="Name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your name',
                            },
                        ]}
                    >
                        <Input placeholder="Please enter your name" />
                    </Form.Item>

                    <Form.Item
                        {...formItemLayout}
                        name="email"
                        label="Email"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter your email',
                            },
                        ]}
                    >
                        <Input type="Email" placeholder="Please enter your email" />
                    </Form.Item>

                    <Form.Item
                        {...formItemLayout}
                        name="password"
                        label="Password"
                        rules={[
                            {
                                required: true,
                                message: 'Please enter password',
                            },
                        ]}
                    >
                        <Input.Password placeholder="Please enter password" />
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        name="role"
                        label="Role"
                        rules={[{ required: true, message: 'Please select role of user' }]}
                    >
                        <Select placeholder="Please select role of user">
                            <Option value="ADMIN">ADMIN</Option>
                            <Option value="SUPER_ADMIN">SUPER_ADMIN</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item wrapperCol={{ span: 12, offset: 10 }}>
                        <Button type="primary" style={{ background: "#E50914" }} className="rounded-md text-white" htmlType="submit" danger>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
}