# Teste Fullstack - Verzel

Site baseado no Devaria.

## Instruções
* As pastas de back e front-end contém as instruções específicas, são necessários dois terminais e **execute o backend antes do frontend!!!**
* O login de administrador é o único disponível, email: admin; password: admin.

## Requisitos 🛠

- [x] Home page pública exibindo os módulos e conforme seleciona o módulo exibe as aulas do módulo.
- [x] Os módulos devem estar ordenados por ordem alfabética assim como as aulas.
- [x] Os módulos devem contabilizar o total de aulas referente.
- [x] Para cadastro das aulas e módulos deverá haver um login administrativo.
 - [ ] Cadastro de usuários é diferencial não obrigatório.
- [x] As páginas de cadastro devem estar seguras e só acessadas após login autenticado.
- [x] Todas as requisições privadas precisam de um token válido gerado no login para funcionamento da requisição.
- [x] O cadastro de aulas deverá ter listagem, criação, edição e deleção de registros
  - [x] Atributos obrigatórios são: Id, Nome, Módulo, Data de início.
    - [x] Adicionada thumbnail de aulas.
- [x] O cadastro de módulos deverá ter listagem, criação, edição e deleção de registros
  - [x] Atributos obrigatórios são: Id e Nome.
    - [x] Adicionada descrição do módulo.
- [x] Back-end deverá ser uma API Rest.
- [x] Todos os dados deverão ser persistidos em um banco de dados.

## Notas 📃
* A tela de login tem um espaçamento vertical que não consegui resetar.
* Duas migrations foram usadas como seeders para o banco, apesar de ferir a responsabilidade das migrations. Optei pelo método pois, por serem apenas 3 registros inseridos, seria um pouquinho exagerado adicionar uma dependência.
* Para manter a facilidade no deploy com o uso do sqlite, foi necessário fazer uma pequena "gambiarra". Na listagem de módulos, é feita uma consulta na contagem de classes que estão relacionadas à certo módulo, ao invés de utilizar uma comunicação "two-way"(onde uma coluna one-to-many "sabe" do lado many-to-one). Isso se deu pelo fato de que o SQLite não possui um tipo de dado array.
* Não é possível editar as imagens das aulas.
* Usar módulos e aulas em inglês não foi uma boa ideia, acabou conflitando com algumas palavras reservadas. 😢
