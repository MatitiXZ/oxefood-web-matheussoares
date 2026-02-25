import InputMask from "comigo-tech-react-input-mask";
import React from "react";
import {
  Button,
  Container,
  Divider,
  Form,
  FormGroup,
  FormInput,
  FormRadio,
  FormField,
  Icon,
  TextArea,
} from "semantic-ui-react";

const opcoesUF = [
  { text: "PE", value: "pernambuco" },
  { text: "SP", value: "sao paulo" },
  { text: "RJ", value: "rio de janeiro" },
];

export default function FormProduto() {
  return (
    <div>
      <div style={{ marginTop: "3%" }}>
        <Container textAlign="justified">
          <h2>
            {" "}
            <span style={{ color: "darkgray" }}>
              {" "}
              Entregador &nbsp;
              <Icon name="angle double right" size="small" />{" "}
            </span>{" "}
            Cadastro{" "}
          </h2>

          <Divider />

          <div style={{ marginTop: "4%" }}>
            <Form>
              <Form.Group widths="equal">
                <Form.Input
                  required
                  fluid
                  label="Nome"
                  maxLength="100"
                  width={10}
                >
                  <InputMask placeholder="" />
                </Form.Input>

                <Form.Input required fluid label="CPF" width={5}>
                  <InputMask required mask="999.999.999-99" />
                </Form.Input>

                <FormInput label="RG" width={5}></FormInput>
              </Form.Group>

              <Form.Group>
                <FormInput label="DT Nascimento" width={5}>
                  <InputMask
                    mask="99/99/9999"
                    maskChar={null}
                    placeholder="Ex:20/03/1985"
                  />
                </FormInput>

                <Form.Input required fluid label="Fone Celular" width={5}>
                  <InputMask mask="(99) 9999.9999" />
                </Form.Input>

                <Form.Input fluid label="Fone Fixo" width={5}>
                  <InputMask mask="(99) 9999.9999" />
                </Form.Input>

                <Form.Input
                  label="QTD Entregas Realizadas"
                  width={5}
                ></Form.Input>

                <Form.Input label="Valor Por Frete" width={5}></Form.Input>
              </Form.Group>

              <Form.Group>
                <Form.Input label="Rua" width={14}></Form.Input>

                <Form.Input label="Número" width={6}></Form.Input>
              </Form.Group>

              <Form.Group>
                <Form.Input label="Bairro" width={8}></Form.Input>

                <Form.Input label="Cidade" width={8}></Form.Input>

                <Form.Input label="CEP" width={4}></Form.Input>
              </Form.Group>

              <Form.Select
                fluid
                label="UF"
                options={opcoesUF}
                placeholder="Selecione"
              />

              <Form.Input label="Complemento"></Form.Input>

              <Form.Group inline>
                <label>Ativo</label>
                <FormField
                  label="Sim"
                  control="input"
                  type="radio"
                  name="htmlRadios"
                />

                <FormField
                  label="Não"
                  control="input"
                  type="radio"
                  name="htmlRadios"
                />
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
                Voltar
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
