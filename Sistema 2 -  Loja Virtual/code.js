
  // Elementos principais do carrinho
  const btnContadorCarrinho = document.getElementById('btn-carrinho');
  const carrinho = document.getElementById('carrinho-lateral');
  const itensCarrinho = document.getElementById('itens-carrinho');
  const totalCarrinho = document.getElementById('total-carrinho');
  const contadorQuantidade = document.getElementById('contador-quantidade');
  const btnFinalizar = document.getElementById('btn-finalizar');

  // Objeto que armazena os produtos adicionados ao carrinho
  let carrinhoProdutos = {};

  contadorQuantidade.style.display = 'none';

  // Função auxiliar para formatar valores para moeda brasileira
  function formatarPreco(valor) {
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  }

  // Adiciona os eventos de clique nos botões de "Adicionar ao carrinho"
  function configurarBotoesAdicionarCarrinho() {
    document.querySelectorAll('.botao-carrinho').forEach((botao, index) => {
      botao.addEventListener('click', () => {
        const produto = botao.closest('.produto');

        // Coleta os dados do produto
        const descricao = produto.querySelector('.descricao').textContent.trim();
        const preco = produto.querySelector('.preco').textContent.trim();
        const precoNum = parseFloat(preco.replace('R$ ', '').replace('.', '').replace(',', '.'));
        const imgEl = produto.querySelector('img');
        const imgSrc = imgEl ? imgEl.src : '';

        // Verifica se o produto já está no carrinho (usando índice como ID)
        if (carrinhoProdutos[index]) {
          carrinhoProdutos[index].quantidade++;
        } else {
          carrinhoProdutos[index] = {
            descricao,
            preco: precoNum,
            img: imgSrc,
            quantidade: 1
          };
        }

        // Atualiza a interface do carrinho e o abre
        atualizarCarrinho();
        carrinho.classList.add('aberto');
      });
    });
  }

  // Atualiza a interface do carrinho lateral
  function atualizarCarrinho(){
    itensCarrinho.innerHTML = '';
    let total = 0;
    let quantidadeTotal = 0;

    // Percorre todos os itens do carrinho
    for (const id in carrinhoProdutos) {
      const item = carrinhoProdutos[id];
      const subtotal = item.preco * item.quantidade;
      total += subtotal;
      quantidadeTotal += item.quantidade;

      // Cria elemento de item no carrinho
      const divItem = document.createElement('div');
      divItem.classList.add('item-carrinho');
      divItem.innerHTML = `
        <img src="${item.img}" alt="${item.descricao}" />
        <div class="item-carrinho-info">
          <p class="descricao">${item.descricao}</p>
          <p class="preco">${formatarPreco(item.preco)} x <span class="quantidade">${item.quantidade}</span> = ${formatarPreco(subtotal)}</p>
          <div class="controle-quantidade">
            <button class="btn-quantidade" data-id="${id}" data-acao="diminuir">-</button>
            <span>${item.quantidade}</span>
            <button class="btn-quantidade" data-id="${id}" data-acao="aumentar">+</button>
          </div>
        </div>
      `;
      itensCarrinho.appendChild(divItem);
    }

    // Atualiza o total e a quantidade exibida
    totalCarrinho.textContent = 'Total: ' + formatarPreco(total);
    contadorQuantidade.textContent = quantidadeTotal;
    contadorQuantidade.style.display = quantidadeTotal > 0 ? 'inline-block' : 'none';

    // Reconfigura os botões de quantidade
    configurarBotoesQuantidade();
    }

  // Configura os eventos de alteração de quantidade dos produtos no carrinho
  function configurarBotoesQuantidade() {
    document.querySelectorAll('.btn-quantidade').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const acao = btn.getAttribute('data-acao');

        if (acao === 'aumentar') {
          carrinhoProdutos[id].quantidade++;
        } else {
          carrinhoProdutos[id].quantidade--;
          if (carrinhoProdutos[id].quantidade < 1) {
            delete carrinhoProdutos[id];
          }
        }

        // Atualiza o carrinho após mudança
        atualizarCarrinho();
      });
    });
  }

  // Alterna a visibilidade do carrinho lateral
  function configurarBotaoAbrirFecharCarrinho() {
    btnContadorCarrinho.addEventListener('click', () => {
      carrinho.classList.toggle('aberto');
    });
  }

  // Redireciona para a página de finalização da compra
  function configurarBotaoFinalizarCompra() {
    btnFinalizar.addEventListener('click', () => {
      window.location.href = 'finalizar.html';
    });
  }

  // Função de inicialização do sistema de carrinho
  function inicializarCarrinho() {
    configurarBotoesAdicionarCarrinho();
    configurarBotaoAbrirFecharCarrinho();
    configurarBotaoFinalizarCompra();
  }

  // Inicializa tudo
  inicializarCarrinho();

