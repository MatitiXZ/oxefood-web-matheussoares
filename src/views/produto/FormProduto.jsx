import axios from "axios";
import InputMask from "comigo-tech-react-input-mask";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Button, Container, Divider, Form, Icon, Image } from "semantic-ui-react";
import MenuSistema from "../../MenuSistema";
import { notifyError, notifySuccess } from "../../views/util/Util";

export default function FormProduto() {
  const [codigo, setCodigo] = useState();
  const [titulo, setTitulo] = useState();
  const [descricao, setDescricao] = useState();
  const [valorUnitario, setValorUnitario] = useState();
  const [tempoEntregaMinimo, setTempoEntregaMinimo] = useState();
  const [tempoEntregaMaximo, setTempoEntregaMaximo] = useState();
  const [listaCategoria, setListaCategoria] = useState([]);
  const [idCategoria, setIdCategoria] = useState();
  const [imagem, setImagem] = useState(null);
  const [preview, setPreview] = useState(null);

  const { state } = useLocation();
  const [idProduto, setIdProduto] = useState();

  function salvar() {
    let produtoRequest = {
      idCategoria: idCategoria,
      codigo: codigo,
      titulo: titulo,
      descricao: descricao,
      valorUnitario: valorUnitario,
      tempoEntregaMinimo: tempoEntregaMinimo,
      tempoEntregaMaximo: tempoEntregaMaximo,
    };

    if (idProduto != null) {
      //Alteração:
      axios
        .put("http://localhost:8080/api/Produto/" + idProduto, produtoRequest)
        .then(() => {
          notifySuccess("Produto alterado com sucesso.");
          atualizaImagem(idProduto);
        })
        .catch((error) => {
          notifyError("Erro ao alterar o produto.");
        });
    } else {
      //Cadastro:
      axios
        .post("http://localhost:8080/api/Produto", produtoRequest)
        .then((response) => {
          notifySuccess("Produto cadastrado com sucesso.");
          atualizaImagem(response.data.id);
        })
        .catch((error) => {
          notifyError("Erro ao cadastrar o produto.");
        });
    }
  }

  function atualizaImagem(idProduto) {
    let formData = new FormData();
    formData.append("imagem", imagem);

    axios
      .post("http://localhost:8080/api/produto/" + idProduto, formData)
      .then((response) => {
        notifySuccess("Imagem cadastrada com sucesso.");
      })
      .catch((error) => {
        if (error.response) {
          notifyError(error.response.data.errors[0].defaultMessage);
        } else {
          notifyError("Erro inesperado no sistema!");
        }
      });
  }

  useEffect(() => {
    if (state != null && state.id != null) {
      axios
        .get("http://localhost:8080/api/produto/" + state.id)
        .then((response) => {
          setIdProduto(response.data.id);
          setCodigo(response.data.codigo);
          setTitulo(response.data.titulo);
          setDescricao(response.data.descricao);
          setValorUnitario(response.data.valorUnitario);
          setTempoEntregaMinimo(response.data.tempoEntregaMinimo);
          setTempoEntregaMaximo(response.data.tempoEntregaMaximo);
          setIdCategoria(response.data.categoria.id);
          setImagem(response.data.imagem);
        });
    }

    axios.get("http://localhost:8080/api/CategoriaProduto").then((response) => {
      const dropDownCategorias = response.data.map((c) => ({
        text: c.descricao,
        value: c.id,
      }));
      setListaCategoria(dropDownCategorias);
    });
  }, [state]);

  const handleImagemChange = (event) => {
    const file = event.target.files[0];
    setImagem(file);

    // Gera uma URL para visualização da imagem
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  return (
    <div>
      <MenuSistema tela={"produto"} />
      <div style={{ marginTop: "3%" }}>
        <Container textAlign="justified">
          {idProduto === undefined && (
            <h2>
              {" "}
              <span style={{ color: "darkgray" }}>
                {" "}
                Produto &nbsp;
                <Icon name="angle double right" size="small" />{" "}
              </span>{" "}
              Cadastro
            </h2>
          )}
          {idProduto != undefined && (
            <h2>
              {" "}
              <span style={{ color: "darkgray" }}>
                {" "}
                Produto &nbsp;
                <Icon name="angle double right" size="small" />{" "}
              </span>{" "}
              Alteração
            </h2>
          )}

          <Divider />

          <div style={{ marginTop: "4%" }}>
            <Form>
              <Form.Input
                label="Imagem do Produto"
                type="file"
                accept="image/*"
                onChange={handleImagemChange}
              />

              {preview && (
                <Image
                  src={preview}
                  size="small"
                  bordered
                  style={{ marginTop: "1em" }}
                />
              )}
              {!preview && imagem && (
                <Image
                  src={`imagens_cadastradas/${imagem}`}
                  bordered
                  style={{ marginTop: "1em" }}
                />
              )}

              <br />

              <Form.Group widths="equal">
                <Form.Input
                  required
                  fluid
                  label="Título"
                  maxLength="100"
                  width={14}
                >
                  <InputMask
                    placeholder="Informe o título do produto"
                    value={titulo || ''}
                    onChange={(e) => setTitulo(e.target.value)}
                  />
                </Form.Input>

                <Form.Input required fluid label="Código do Produto" width={6}>
                  <InputMask
                    placeholder="Informe o código do produto"
                    value={codigo || ''}
                    onChange={(e) => setCodigo(e.target.value)}
                  />
                </Form.Input>
              </Form.Group>

              <Form.Select
                required
                fluid
                tabIndex="3"
                placeholder="Selecione"
                label="Categoria"
                options={listaCategoria}
                value={idCategoria}
                onChange={(e, { value }) => {
                  setIdCategoria(value);
                }}
              />

              <Form.TextArea
                label="Descrição"
                placeholder="Informe a descrição do produto"
                tabIndex="4"
                maxLength="100000"
                value={descricao || ''}
                onChange={(e) => setDescricao(e.target.value)}
              />

              <Form.Group>
                <Form.Input
                  required
                  fluid
                  label="Valor Unitário"
                  width={8}
                  value={valorUnitario || ''}
                  onChange={(e) => setValorUnitario(e.target.value)}
                ></Form.Input>

                <Form.Input
                  fluid
                  label="Tempo de Entrega Mínimo em Minutos"
                  width={6}
                >
                  <InputMask
                    placeholder="30"
                    value={tempoEntregaMinimo || ''}
                    onChange={(e) => setTempoEntregaMinimo(e.target.value)}
                  />
                </Form.Input>

                <Form.Input
                  fluid
                  label="Tempo de Entrega Máximo em Minutos"
                  width={6}
                >
                  <InputMask
                    placeholder="30"
                    value={tempoEntregaMaximo || ''}
                    onChange={(e) => setTempoEntregaMaximo(e.target.value)}
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
