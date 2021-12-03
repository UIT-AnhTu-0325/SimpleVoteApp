import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { Layout } from "../../components/Layout";
import "./style.css";
import LoginImg from "../../user.png";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "../../actions/auth.actions";
import { Redirect } from "react-router";

/**
 * @author
 * @function Signin
 **/

export const Signin = (props) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const submit = (e) => {
    e.preventDefault();
    const user = {
      UserName: email,
      Password: password,
    };

    dispatch(signin(user));
  };

  if (localStorage.getItem("jwt")) {
    return <Redirect to={`/`}></Redirect>;
  }

  return (
    <Layout>
      <Container>
        <Row>
          <Col lg={6} md={6} sm={12} className="p-5 m-auto">
            <div className="SigninBox p-5">
              <Row>
                <img className="LoginImg" src={LoginImg} alt=""></img>
              </Row>
              <Form className="mt-3" onSubmit={submit}>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <Row>
                  <Col>
                    <Button variant="success" type="submit">
                      Submit
                    </Button>
                  </Col>
                  <Col className="RightCol">
                    <a href="./signup">Signup</a>
                  </Col>
                </Row>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};
