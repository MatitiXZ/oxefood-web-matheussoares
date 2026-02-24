import InputMask from "comigo-tech-react-input-mask";
import React from "react";
import { Button, Container, Divider, Form, FormInput, Icon, TextArea } from "semantic-ui-react";

export default function FormProduto() {
  return (
    <div>
      <div style={{ marginTop: "3%" }}>
        <Container textAlign="justified">
          <h2>
            {" "}
            <span style={{ color: "darkgray" }}>
              {" "}
              Produto &nbsp;
              <Icon name="angle double right" size="small" />{" "}
            </span>{" "}
            Cadastro{" "}
          </h2>

          <Divider />

          <div style={{ marginTop: "4%" }}>
            <Form>
              <Form.Group widths="equal">
                <Form.Input required fluid label="Título" maxLength="100" width={14}>
                    <InputMask 
                        placeholder="Informe o título do produto"
                    />
                </Form.Input>

                <Form.Input required fluid label="Código do Produto" width={6}>
                  <InputMask 
                    placeholder="Informe o código do produto"
                  />
                </Form.Input>
              </Form.Group>

                <Form.Input label="Descrição">
                    <TextArea placeholder="Informe a descrição do produto" />
                </Form.Input>

              <Form.Group>
                <Form.Input required fluid label="Valor Unitário" width={8}>
                  
                </Form.Input>

                <Form.Input fluid label="Tempo de Entrega Mínimo em Minutos" width={6}>
                  <InputMask 
                    placeholder="30"
                  />
                </Form.Input>

                <Form.Input fluid label="Tempo de Entrega Máximo em Minutos" width={6}>
                  <InputMask
                    maskChar={null}
                    placeholder="30"
                  />
                </Form.Input>
              </Form.Group>
            </Form>

            <div style={{ marginTop: "4%" }}>
              <Button
                type="button"
                inverted
                circular
                icon
                labelPosition="left"
                color="orange"
              >
                <Icon name="reply" />
                Listar
              </Button>

              <Button
                inverted
                circular
                icon
                labelPosition="left"
                color="blue"
                floated="right"
              >
                <Icon name="save" />
                Salvar
              </Button>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
