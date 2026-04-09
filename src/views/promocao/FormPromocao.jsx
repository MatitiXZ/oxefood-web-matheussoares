import axios from "axios";
import InputMask from "comigo-tech-react-input-mask";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Button, Container, Divider, Form, Icon } from "semantic-ui-react";
import MenuSistema from "../../MenuSistema";

export default function FormPromocao() {
  const [titulo, setTitulo] = useState();
  const [dataInicio, setDataInicio] = useState();
  const [dataFim, setDataFim] = useState();
  const [regra, setRegra] = useState();
  const [valorDesconto, setValorDesconto] = useState();
  const [promoValida, setPromoValida] = useState();

  const { state } = useLocation();
  const [idPromocao, setIdPromocao] = useState();

  function formatarData(dataParam) {
    if (dataParam === null || dataParam === "" || dataParam === undefined) {
      return "";
    }

    let arrayData = dataParam.split("-");
    return arrayData[2] + "/" + arrayData[1] + "/" + arrayData[0];
  }

  function salvar() {
    let promocaoRequest = {
      titulo: titulo,
      dataInicio: dataInicio,
      dataFim: dataFim,
      regra: regra,
      valorDesconto: valorDesconto,
      promoValida: true,
    };

    if (idPromocao != null) {
      //Alteração:
      axios
        .put(
          "http://localhost:8080/api/promocao/" + idPromocao,
          promocaoRequest,
        )
        .then(() => {
          console.log("Promoção alterada com sucesso.");
        })
        .catch((error) => {
          console.log("Erro ao alterar a promoção.");
        });
    } else {
      //Cadastro:
      axios
        .post("http://localhost:8080/api/promocao", promocaoRequest)
        .then((response) => {
          console.log("Promoção cadastrada com sucesso.");
        })
        .catch((error) => {
          console.log("Erro ao incluir a promoção.");
        });
    }
  }

  useEffect(() => {
    if (state != null && state.id != null) {
      axios
        .get("http://localhost:8080/api/promocao/" + state.id)
        .then((response) => {
          setIdPromocao(response.data.id);
          setTitulo(response.data.titulo);
          setDataInicio(formatarData(response.data.dataInicio));
          setDataFim(formatarData(response.data.dataFim));
          setRegra(response.data.regra);
          setValorDesconto(response.data.valorDesconto);
          setPromoValida(response.data.promoValida);
        });
    }
  }, [state]);

  return (
    <div>
      <MenuSistema tela={"promocao"} />
      <div style={{ marginTop: "3%" }}>
        <Container textAlign="justified">
          {idPromocao === undefined && (
            <h2>
              {" "}
              <span style={{ color: "darkgray" }}>
                {" "}
                Promoção &nbsp;
                <Icon name="angle double right" size="small" />{" "}
              </span>{" "}
              Cadastro
            </h2>
          )}
          {idPromocao != undefined && (
            <h2>
              {" "}
              <span style={{ color: "darkgray" }}>
                {" "}
                Promoção &nbsp;
                <Icon name="angle double right" size="small" />{" "}
              </span>{" "}
              Alteração
            </h2>
          )}

          <Divider />

          <div style={{ marginTop: "4%" }}>
            <Form>
              <Form.Group widths="equal">
                <Form.Input
                  required
                  fluid
                  label="Título"
                  maxLength="100"
                  width={14}
                >
                  <InputMask
                    placeholder="Informe o título da promoção"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                  />
                </Form.Input>
              </Form.Group>

              <Form.TextArea
                label="Regra"
                tabIndex="4"
                maxLength="100000"
                value={regra}
                onChange={(e) => setRegra(e.target.value)}
              />

              <Form.Group>
                <Form.Input
                  fluid
                  label="Valor Desconto (R$)"
                  width={8}
                  value={valorDesconto}
                  onChange={(e) => setValorDesconto(e.target.value)}
                ></Form.Input>

                <Form.Input 
                    required 
                    fluid 
                    label="A partir de:" 
                    width={6}>
                  <InputMask
                    placeholder="Ex: 08/04/2026"
                    value={dataInicio}
                    onChange={(e) => setDataInicio(e.target.value)}
                  />
                </Form.Input>

                <Form.Input
                  required
                  fluid
                  label="Terminando em:"
                  width={6}
                >
                  <InputMask
                    placeholder="Ex: 18/04/2026"
                    value={dataFim}
                    onChange={(e) => setDataFim(e.target.value)}
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
