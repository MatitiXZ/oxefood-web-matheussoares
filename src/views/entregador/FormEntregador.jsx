import axios from "axios";
import InputMask from "comigo-tech-react-input-mask";
import { useState } from "react";
import {
  Button,
  Container,
  Divider,
  Form,
  FormField,
  FormInput,
  Icon
} from "semantic-ui-react";
import MenuSistema from '../../MenuSistema';

const opcoesUF = [
  { text: "PE", value: "PE" },
  { text: "SP", value: "SP" },
  { text: "RJ", value: "RJ" },
];

export default function FormProduto() {

  const [nome, setNome] = useState();
  const [cpf, setCpf] = useState();
  const [rg, setRg] = useState();
  const [dataNascimento, setDataNascimento] = useState();
  const [foneCelular, setFoneCelular] = useState();
  const [foneFixo, setFoneFixo] = useState();
  const [qtdEntregasRealizadas, setQtdEntregasRealizadas] = useState();
  const [valorFrete, setValorFrete] = useState();
  const [enderecoRua, setEnderecoRua] = useState();
  const [enderecoComplemento, setEnderecoComplemento] = useState();
  const [enderecoNumero, setEnderecoNumero] = useState();
  const [enderecoBairro, setEnderecoBairro] = useState();
  const [enderecoCidade, setEnderecoCidade] = useState();
  const [enderecoCep, setEnderecoCep] = useState();
  const [enderecoUf, setEnderecoUf] = useState();
  const [ativo, setAtivo] = useState();

  function salvar() {

		let EntregadorRequest = {
		     nome: nome,
		     cpf: cpf,
         rg: rg,
		     dataNascimento: dataNascimento,
		     foneCelular: foneCelular,
		     foneFixo: foneFixo,
         qtdEntregasRealizadas: qtdEntregasRealizadas,
         valorFrete: valorFrete,
         enderecoRua: enderecoRua,
         enderecoComplemento: enderecoComplemento,
         enderecoNumero: enderecoNumero,
         enderecoBairro: enderecoBairro,
         enderecoCidade: enderecoCidade,
         enderecoCep: enderecoCep,
         enderecoUf: enderecoUf,
         ativo: ativo
		}
	
		axios.post("http://localhost:8080/api/entregador", EntregadorRequest)
		.then((response) => {
		     console.log('Entregador cadastrado com sucesso.')
		})
		.catch((error) => {
		     console.log('Erro ao incluir o um entregador.')
		})
	}

  return (
    <div>
      <MenuSistema tela={'entregador'} />
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
                  <InputMask 
                  placeholder="" 
                  value={nome}
                  onChange={e => setNome(e.target.value)}
                  />
                </Form.Input>

                <Form.Input required fluid label="CPF" width={5}>
                  <InputMask required mask="999.999.999-99" 
                  value={cpf}
                  onChange={e => setCpf(e.target.value)}
                  />
                </Form.Input>

                <FormInput label="RG" width={5}
                value={rg}
                onChange={e => setRg(e.target.value)}
                />
              </Form.Group>

              <Form.Group>
                <FormInput label="DT Nascimento" width={5}>
                  <InputMask
                    mask="99/99/9999"
                    maskChar={null}
                    placeholder="Ex:20/03/1985"
                    value={dataNascimento}
                    onChange={e => setDataNascimento(e.target.value)}
                  />
                </FormInput>

                <Form.Input required fluid label="Fone Celular" width={5}>
                  <InputMask 
                  mask="(99) 9999.9999" 
                  value={foneCelular}
                  onChange={e => setFoneCelular(e.target.value)}
                  />
                </Form.Input>

                <Form.Input fluid label="Fone Fixo" width={5}>
                  <InputMask mask="(99) 9999.9999" 
                  value={foneFixo}
                  onChange={e => setFoneFixo(e.target.value)}
                  />
                </Form.Input>

                <Form.Input
                  label="QTD Entregas Realizadas"
                  width={5}
                  value={qtdEntregasRealizadas}
                  onChange={e => setQtdEntregasRealizadas(e.target.value)}
                ></Form.Input>

                <Form.Input label="Valor Por Frete" width={5}
                  value={valorFrete}
                  onChange={e => setValorFrete(e.target.value)}
                />
              </Form.Group>

              <Form.Group>
                <Form.Input label="Rua" width={14}
                  value={enderecoRua}
                  onChange={e => setEnderecoRua(e.target.value)}
                />

                <Form.Input label="Número" width={6}
                  value={enderecoNumero}
                  onChange={e => setEnderecoNumero(e.target.value)}
                />
              </Form.Group>

              <Form.Group>
                <Form.Input label="Bairro" width={8}
                  value={enderecoBairro}
                  onChange={e => setEnderecoBairro(e.target.value)}
                />

                <Form.Input label="Cidade" width={8}
                  value={enderecoCidade}
                  onChange={e => setEnderecoCidade(e.target.value)}
                />

                <Form.Input label="CEP" width={4}
                  value={enderecoCep}
                  onChange={e => setEnderecoCep(e.target.value)}
                />
              </Form.Group>

              <Form.Select
                fluid
                label="UF"
                options={opcoesUF}
                placeholder="Selecione"
                value={enderecoUf}
                onChange={(e, { value }) => setEnderecoUf(value)}
              />

              <Form.Input label="Complemento"
                value={enderecoComplemento}
                onChange={e => setEnderecoComplemento(e.target.value)}
              />

              <Form.Group inline>
                <label>Ativo:</label>
                <FormField
                  label="Sim"
                  control="input"
                  type="radio"
                  name="htmlRadios"
                  value={true}
                  onChange={e => setAtivo(e.target.value)}
                />

                <FormField
                  label="Não"
                  control="input"
                  type="radio"
                  name="htmlRadios"
                  value={false}
                  onChange={e => setEnderecoComplemento(e.target.value)}
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
                onClick={() => salvar()}
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
