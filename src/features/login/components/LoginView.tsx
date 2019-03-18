import React from 'react';
import * as R from 'remeda';
import { Alert } from 'src/components/Alert';
import { Button } from 'src/components/Button';
import { FormInput } from 'src/components/FormInput';
import { ReduxInput } from 'src/components/ReduxInput';
import styled from 'styled-components';
import { useActions, useMappedState } from 'typeless';
import { LoginFormActions, LoginFormProvider } from '../login-form';

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;

  ${FormInput} {
    margin-bottom: 20px;
  }
`;

const Form = styled.form`
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
`;

const Title = styled.h1`
  font-size: 28px;
  margin-bottom: 16px;
  font-weight: 400;
  text-align: center;
`;

export const LoginView = () => {
  const { submit } = useActions(LoginFormActions);
  const { isLoading, error } = useMappedState(state => ({
    ...R.pick(state.login, ['isLoading', 'error']),
  }));

  return (
    <Wrapper>
      <LoginFormProvider>
        <Form
          onSubmit={e => {
            e.preventDefault();
            submit();
          }}
        >
          <Title>Please sign in</Title>
          {error && <Alert>{error}</Alert>}
          <ReduxInput name="username" label="Username" />
          <ReduxInput name="password" label="Password" />
          <Button large block loading={isLoading}>
            Sign in
          </Button>
        </Form>
      </LoginFormProvider>
    </Wrapper>
  );
};
