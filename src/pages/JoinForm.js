import { Button, Form, Input } from "antd";
import { useState } from "react";

const initState = {
  userid: "",
  userpass: "",
  nickname: "",
  email: "",
};
const JoinForm = () => {
  // form 의 기본값
  const [initialValues, setInitialValues] = useState(initState);

  // 각 필드의 입력 중인값 알아내기
  const onChangeFiled = _fileld => {
    //console.log(_fileld);
  };
  // 확인 버튼시 최종 입력값
  const onFinished = values => {
    console.log(values);
    setInitialValues({ ...values });
  };

  // 사용자 입력시 변경된 값 출력
  const onValuesChanged = _fileld => {
    console.log(_fileld);
    setInitialValues({ ..._fileld });
  };

  return (
    <div>
      <Form
        style={{ width: 600, margin: "0 auto" }}
        initialValues={initialValues}
        onFieldsChange={(changeFileds, allFileds) => {
          onChangeFiled(changeFileds);
          //   console.log("allFileds", allFileds);
        }}
        onFinish={values => {
          onFinished(values);
        }}
        onFinishFailed={({ values, errorFields, outOfDate }) => {
          console.log("onFinishFailed", values, errorFields, outOfDate);
        }}
        onValuesChange={(changedValues, allValues) => {
          // changedValues :  각 필드의 현재값
          // allValues : 전체 필드의 현재값
          onValuesChanged(allValues);
          // console.log(changedValues);
          // console.log(allValues);
        }}
      >
        <Form.Item
          name={"userid"}
          label="아이디"
          rules={[
            { required: true, message: "아이디는 필수 항목입니다." },
            { min: 4, message: "아이디는 4자 이상 입력하세요." },
            { max: 8, message: "아이디는 8자 이하로 입력하세요." },
            {
              //   pattern: /^[\s]/,
              //   message: "공백만 입력하시면 안됩니다.",
            },
          ]}
        >
          <Input placeholder="아이디를 입력하세요." />
        </Form.Item>

        <Form.Item
          name={"userpass"}
          label="비밀번호"
          rules={[{ required: true, message: "비밀번호는 필수항목입니다." }]}
        >
          <Input.Password placeholder="비밀번호를 입력하세요." />
        </Form.Item>

        <Form.Item name={"nickname"} label="닉네임">
          <Input placeholder="닉네임을 입력하세요." />
        </Form.Item>

        <Form.Item
          name={"email"}
          label="이메일"
          rules={[
            { required: true, message: "이메일은 필수항목입니다." },
            { type: "email", message: "이메일 형식에 맞지않습니다." },
          ]}
        >
          <Input placeholder="이메일을 입력하세요." />
        </Form.Item>

        <Form.Item>
          <Button htmlType="submit">확인</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default JoinForm;
