import React, { useContext } from "react";

import { Row, Col } from "react-bootstrap";

import Content from "../../app/Content";
import Input from "../../utils/Input";
import { DataContext } from "../../utils/DataProvider";

import "./TransferAmount.css";
import Logo from "../../assets/logo_128.png";

const TransferAmount = props => {
  const ctx = useContext(DataContext);

  const onChangeAmount = (ref, amount) => {
    if (!amount || amount.trim().length === 0) {
      ctx.setValidation(validation => {
        return { ...validation, amount: false, amountValue: null };
      });
      return {};
    }

    const validate =
      !isNaN(amount) &&
      Number(amount) > 0 &&
      (ctx.account
        ? !isNaN(ctx.account.amount) &&
          Number(ctx.account.amount) / Math.pow(10, 6) > Number(amount)
        : true);

    ctx.setValidation(validation => {
      return { ...validation, amount: validate, amountValue: amount };
    });

    return { validate };
  };

  return (
    <Content>
      <Row className="algorand-transferamount-footer">
        <Col xs="5" md="5" className="align-self-center">
          <Input
            value={ctx.validation ? ctx.validation.amountValue : null}
            setValue={() => {}}
            hint="0.00"
            onChange={onChangeAmount}
            cls="algorand-transferto-input"
          />
        </Col>
        <Col xs="2" md="2" className="px-0 align-self-center">
          of
        </Col>
        <Col xs="5" md="5" className="align-self-center pl-0">
          <img
            src={Logo}
            alt="Logo"
            style={{ width: "100px", height: "100px" }}
          />
        </Col>
      </Row>
    </Content>
  );
};

export default TransferAmount;
