/*
{
    "name":"vikram",
    "genre":["action","thriller"],
    "category":"movie",
    "posterPath":"path.png",
    "videoPath":"video.mp4",
    "description":"the movie is about the killer",
    "shortSummary":"this is short summary"

}
*/

import { Form, Input, Select, Button, Upload, Card, message } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import axios from "axios";
const { Option } = Select;

const uploadFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

const formItemLayout = {
  labelCol: {
    span: 5,
  },
  wrapperCo: {
    span: 12,
  },
};

const onFinish = async (values) => {
  await axios({
    method: "post",
    url: "http://localhost:8080/video/addVideo",
    headers: { "Content-Type": "application/json" },
    data: values
  }).then((ret) => {
    if (ret.status == 200) message.success(ret.data.data, 2)
    else if (ret.status == 500) message.error(ret.data.data, 2)
    else if (ret.status == 206) message.warning(ret.data.data, 2)
  })
}


export default function AddVideoModule() {
  return (
    <div class="flex flex-col items-center justify-center h-full bg-black">
      <Card
        title="Add Video"
        className="w-1/2"
        hoverable={true}
        headStyle={{ fontSize: "30px", color: "#e50914" }}
      >
        <Form
          onFinish={onFinish}
          className="w-full border-0 mt-5"
        >

          <Form.Item
            {...formItemLayout}
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                message: 'Please input video name',
              },
            ]}
          >
            <Input placeholder="Please input video name" />
          </Form.Item>

          <Form.Item
            {...formItemLayout}
            name="genre"
            label="Genre"
            rules={[{ required: true, message: 'Please select genre of video', type: 'array' }]}
          >
            <Select mode="multiple" placeholder="Please select genre of video">
              <Option value="action">action</Option>
              <Option value="comedy">comedy</Option>
              <Option value="thriller">thriller</Option>
            </Select>
          </Form.Item>

          <Form.Item
            {...formItemLayout}
            name="category"
            label="Category"
            rules={[{ required: true, message: 'Please select video category' }]}
          >
            <Select placeholder="Please select video category">
              <Option value="movie">movie</Option>
              <Option value="tvshow">tvshow</Option>
              <Option value="webisode">webisode</Option>
            </Select>
          </Form.Item>

          <Form.Item
            {...formItemLayout}
            name="poster"
            label="poster"
            valuePropName="fileList"
            getValueFromEvent={uploadFile}
            extra="upload poster of the video"
            rules={[
              {
                required: true,
                message: 'Please input video name',
              },
            ]}
          >
            <Upload name="logo" action="http://localhost:8080/video/uploadVideo" method="post">
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>

          <Form.Item
            {...formItemLayout}
            name="video"
            label="video"
            valuePropName="fileList"
            getValueFromEvent={uploadFile}
            extra="upload video"
            rules={[
              {
                required: true,
                message: 'Please input video name',
              },
            ]}
          >
            <Upload name="logo" action="http://localhost:8080/video/uploadVideo" method="post">
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>

          <Form.Item
            {...formItemLayout}
            name="description"
            label="Description"
            rules={[
              {
                required: true,
                message: 'Please input video description',
              },
            ]}
          >
            <Input placeholder="Please input video description" />
          </Form.Item>

          <Form.Item
            {...formItemLayout}
            name="shortSummary"
            label="Short Summary"
            rules={[
              {
                required: true,
                message: 'Please input short summary',
              },
            ]}
          >
            <Input placeholder="Please input video short summary" />
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