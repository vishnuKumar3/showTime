/*{
    "email": "nvk@gmail.com",
    "password": "1234"
}*/
import { Form, Input, Button, Card, message } from "antd";
import axios from "axios";

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
        url: "http://localhost:8080/user/verifyUser",
        headers: { "Content-Type": "application/json" },
        data: values
    }).then((ret) => {
        console.log(ret)
        if (ret.status == 200) {
            message.success(ret.data.data, 2)
            setTimeout(() => {
                window.open("/dashboard", "_self")
            }, 300)
        }
        else { message.error(ret.data.data, 2) }
    }).catch((ret) => {
        message.error(ret.response.data.data, 2)
    })
}

export default function SignInUser() {
    return (
        <div className="flex flex-col items-center justify-center h-full bg-black">
            <Card
                title="SignIn"
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

                    <Form.Item wrapperCol={{ span: 12, offset: 10 }}>
                        <Button type="primary" className="bg-appRedColor rounded-md text-white" htmlType="submit" danger>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
}