import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { Layout } from "../../components/Layout";
import "./style.css";
import SignupImg from "../../add-user.png";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../actions/user.action";
import { Redirect } from "react-router";

/**
 * @author
 * @function Signup
 **/

export const Signup = (props) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [repassword, setRePassword] = useState();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const submit = (e) => {
    e.preventDefault();
    const user = {
      UserName: email,
      Password: password,
    };

    dispatch(signup(user));
  };

  if (
    user.error === null &&
    user.loading === false &&
    user.isAfterSignup === true
  ) {
    return <Redirect to="/signin" />;
  }

  return (
    <Layout>
      <Container>
        <Row>
          <Col lg={6} md={6} sm={12} className="p-5 m-auto">
            <div className="SignupBox p-5">
              <Row>
                <img className="SignupImg" src={SignupImg} alt=""></img>
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

                <Form.Group className="mb-3">
                  <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    onChange={(e) => setRePassword(e.target.value)}
                  />
                </Form.Group>
                <Row>
                  <Col>
                    <Button variant="success" type="submit">
                      Register
                    </Button>
                  </Col>
                  <Col className="RightCol">
                    <a href="./signin">Signin</a>
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
