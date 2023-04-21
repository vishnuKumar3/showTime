/*{
    "email": "nvk@gmail.com",
    "password": "1234"
}*/
import { Form, Input, Button, Checkbox, Card, message } from "antd";
import axios from "axios";
import { useCookies } from 'react-cookie';
import { useEffect } from "react"

const formItemLayout = {
    labelCol: {
        span: 4,
    },
    wrapperCo: {
        span: 8,
    },
};

const onFinish = async (values, setCookie, cookies) => {
    let url = "";
    if (values.isAdmin) {
        url = "http://localhost:8080/admin/verifyAdmin"
    }
    else {
        url = "http://localhost:8080/user/verifyUser"
    }
    await axios({
        method: "post",
        url: url,
        headers: { "Content-Type": "application/json" },
        data: values
    }).then((ret) => {
        console.log(ret.data)
        if (ret.status == 200) {
            message.success(ret.data.data, 2)
            const { data, ...cookieData } = ret.data
            console.log(cookieData)
            setCookie("authorization", cookieData, { secure: true })
            setTimeout(() => {
                window.open("/video?category=movie", "_self")
            }, 300)
        }
        else { message.error(ret.data.data, 2) }
    }).catch((ret) => {
        message.error(ret.response.data.data, 2)
    })
}

export default function SignInUser() {
    const [cookies, setCookie] = useCookies()
    return (
        <div className="flex flex-col items-center justify-center h-full bg-black">
            <Card
                title="SignIn"
                className="w-2/5"
                hoverable={true}
                headStyle={{ fontSize: "30px", color: "#e50914" }}
            >
                <Form
                    onFinish={(values) => onFinish(values, setCookie, cookies)}
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
                    <Form.Item name="isAdmin" valuePropName="checked" wrapperCol={{ offset: 10, span: 12 }}>
                        <Checkbox>Admin?</Checkbox>
                    </Form.Item>
                    <Form.Item wrapperCol={{ span: 12, offset: 10 }}>
                        <Button type="primary" style={{ background: "#E50914" }} className="rounded-md text-white" htmlType="submit" danger>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
                <div className="w-full flex justify-center underline text-appRedColor"><a href="/addUser">Register?</a></div>

            </Card>
        </div>
    );
}