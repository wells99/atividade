let listaDeTeams = sessionStorage.getItem("listaDeTeams") ? JSON.parse(sessionStorage.getItem("listaDeTeams")) : [];
carregarTeams(listaDeTeams)
let nomedoGrupo 
let posicao
let limite
let quantidadeMembros
let inputPesquisa = document.querySelector("#pesquisando")


function mostrarOverlay() {
    let modalBG = document.querySelector("#overlay");
    modalBG.classList.remove("invisible", "opacity-0");
}

function esconderOverlay() {
    let modalBG = document.querySelector("#overlay");
    modalBG.classList.add("invisible", "opacity-0");
    esconderCriar();
}

function mostrarCriar() {
    mostrarOverlay();

    let modalCriar = document.querySelector("#criar");
    modalCriar.classList.remove("invisible", "opacity-0");

}

function esconderCriar() {
    let modalCriar = document.querySelector("#criar");
    modalCriar.classList.add("invisible", "opacity-0");
}

function mostrarAdicionar() {
    mostrarOverlay();

    let modalCriar = document.querySelector("#editar");
    modalCriar.classList.remove("invisible", "opacity-0");
     posicao = Number(event.target.id)
    
    
    quantidadeMembros = listaDeTeams[posicao].participantes
    
    limite = listaDeTeams[posicao].capacidade;
    
    
}

function esconderAdicionar() {
   
    let modalCriar = document.querySelector("#editar");
    modalCriar.classList.add("invisible", "opacity-0");
    esconderCriar()

}

function verificarNomeExistente(nomeNovo) {
    return listaDeTeams.some(grupo => grupo.nome === nomeNovo);
}

function criarTeam() {
    event.preventDefault();
    let nomeValue = document.querySelector("#nome");
    let capacidadeValue = document.querySelector("#capacidade");

   

   if (verificarNomeExistente(nomeValue.value) === true) {
    return alert("NOME JÁ EXISTENTE: Por favor escolha outro nome")
   } else {

    listaDeTeams.push({
        nome: nomeValue.value,
        capacidade: capacidadeValue.value,
        participantes: 0,
        membro: [],
    })

    sessionStorage.setItem("listaDeTeams", JSON.stringify(listaDeTeams))

    nomeValue.value = '';
    capacidadeValue.value = '';

    esconderCriar();
    esconderOverlay();
    carregarTeams(listaDeTeams);
   }
   
  
}

function carregarTeams(lista) {
    
    console.log(lista);
    
    if (Array.isArray(lista)) {
        let teamsGrid = document.querySelector("#teams");
        teamsGrid.innerHTML = '';

        lista.forEach((team,index) => {
            teamsGrid.innerHTML += `
                <li id="${index}" class="bg-cinza2 rounded-lg p-4" >
                    <div class="flex items-center justify-between">
                        <h6 class="text-white text-[18px] font-bold">${team.nome}</h6>
                        <box-icon name='show' type='solid' class="fill-white cursor-pointer duration-200 hover:fill-rosa" onclick="mostrarNomes(${index})" ></box-icon>
                    </div>
                    <div class="w-[100px] h-[100px] rounded-full bg-cinza1 flex flex-col justify-center items-center m-auto my-[26px]">
                        <h1 class="text-white text-[50px] leading-[50px]">${team.participantes}</h1>
                        <h6 class="font-bold text-white">/ ${team.capacidade}</h6>
                    </div>
                    <div class="flex gap-4">
                        <button class="flex-1 h-[40px] flex items-center border-2 border-rosa rounded-lg text-white text-[12px] uppercase font-bold relative group">
                            <span class="w-0 h-full absolute top-0 left-0 bg-rosa duration-200 group-hover:w-full"></span>
                            <span class="w-full relative z-10 text-center" onclick="mostrarAdicionar()" id="${index}">Adicionar</span>
                        </button>
                        <button class="w-[40px] h-[40px] flex justify-center items-center border-2 border-rosa rounded-lg text-white text-[12px] uppercase font-bold relative group">
                            <span class="w-0 h-full absolute top-0 left-0 bg-rosa duration-200 group-hover:w-full"></span>
                            <box-icon name='trash' class="fill-white relative z-10" onclick="excluirGrupo()" id="${index}"></box-icon>
                        </button>
                    </div>
                </li>
            `;
        })
        
    } else {
        let teamsGrid = document.querySelector("#teams");
        teamsGrid.innerHTML = '';

        console.error("Erro: A variável 'lista' não é um array", lista);
        teamsGrid.innerHTML += `
                <li id="${this.participantes}" class="bg-cinza2 rounded-lg p-4" >
                    <div class="flex items-center justify-between">
                        <h6 class="text-white text-[18px] font-bold">${this.nome}</h6>
                        <box-icon name='show' type='solid' class="fill-white cursor-pointer duration-200 hover:fill-rosa" onclick="mostrarNomes(${this.nome})" ></box-icon>
                    </div>
                    <div class="w-[100px] h-[100px] rounded-full bg-cinza1 flex flex-col justify-center items-center m-auto my-[26px]">
                        <h1 class="text-white text-[50px] leading-[50px]">${this.participantes}</h1>
                        <h6 class="font-bold text-white">/ ${this.capacidade}</h6>
                    </div>
                    <div class="flex gap-4">
                        <button class="flex-1 h-[40px] flex items-center border-2 border-rosa rounded-lg text-white text-[12px] uppercase font-bold relative group">
                            <span class="w-0 h-full absolute top-0 left-0 bg-rosa duration-200 group-hover:w-full"></span>
                            <span class="w-full relative z-10 text-center" onclick="mostrarAdicionar()" id="${this.participantes}">Adicionar</span>
                        </button>
                        <button class="w-[40px] h-[40px] flex justify-center items-center border-2 border-rosa rounded-lg text-white text-[12px] uppercase font-bold relative group">
                            <span class="w-0 h-full absolute top-0 left-0 bg-rosa duration-200 group-hover:w-full"></span>
                            <box-icon name='trash' class="fill-white relative z-10" onclick="excluirGrupo()" id="${this.participantes}"></box-icon>
                        </button>
                    </div>
                </li>
            `;
    }
    
    
}

function excluirGrupo(lista) {
    
    let posicao = event.target.id

    listaDeTeams.splice(posicao, 1)

   carregarTeams(listaDeTeams);
    
}

function adicionarAoGrupo(index) {

    event.preventDefault();

    let memberinput = document.querySelector("#member")
    
    if (quantidadeMembros === 0 || quantidadeMembros < limite) {
        listaDeTeams[posicao].membro.push(memberinput.value)
        listaDeTeams[posicao].participantes = listaDeTeams[posicao].membro.length
        carregarTeams(listaDeTeams)
    }else{
        alert("Verifique a capacidade do grupo");
    }
    sessionStorage.setItem("listaDeTeams", JSON.stringify(listaDeTeams))
     memberinput.value = ""

}

function mostrarNomes(index) {

    let divMain = document.querySelector("#main")

    let ulExistindo = divMain.querySelector('ul');

    let membros = listaDeTeams[index].membro
    

    if (ulExistindo) {
        ulExistindo.innerHTML = `${listaDeTeams[index].nome}` // Inserindo o nome do Grupo

        membros.map((membro,index) => {
            ulExistindo.innerHTML += 
            `<li ${index} class="text-[18px] text-white font-semibold">${membro}</li>`
        });

    } else {
       
    
        let ul = document.createElement('ul');
        
        ul.classList = "bg-neutral-700 rounded-md p-2 pb-4 mb-4 text-[24px] text-white font-bold"
        ul.textContent = `${listaDeTeams[index].nome}`
    
        membros.map((membro,index) => {
            ul.innerHTML += 
            `<li ${index} class="text-[18px] text-white font-semibold">${membro}</li>`
        });
    
        divMain.prepend(ul)
    }

   
    
}

    // Função para filtrar equipes
    function filtrarEquipes(termo) {
        let arrayPesquisado = listaDeTeams.filter(equipe => 
            equipe.nome.toLowerCase().includes(termo) || 
            equipe.membro.some(colaborador => colaborador.toLowerCase().includes(termo))
        );

        console.log(arrayPesquisado);
        
        return carregarTeams(arrayPesquisado)
    }
    
    // Função para chamar a filtragem, garantindo que o termo tenha ao menos 3 caracteres
    function filtrarEquipesComVerificacao(termo) {
        termo = termo.toLowerCase();
        // captura o valor da pesquisa e coloca em minúsculo
    
    // Verifica se o termo tem pelo menos 3 caracteres antes de chamar a filtragem
    if (termo.length < 3) {
      return []; // Ou pode retornar o estado atual das equipes, caso necessário
    }
    
    return filtrarEquipes(termo);
  }

function pesquisar() {
    let teamsGrid = document.querySelector("#teams");
    let pesquisa = inputPesquisa.value.toLowerCase(); 
  
    filtrarEquipesComVerificacao(pesquisa)
    


}

inputPesquisa.addEventListener("input", pesquisar);

