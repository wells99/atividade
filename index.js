let listaDeTeams = [];
let nomedoGrupo 
let posicao
let limite
let quantidadeMembros

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
    let nomedoGrupo = event.target.id
    posicao = encontrarPosicao(nomedoGrupo)
    
    quantidadeMembros = listaDeTeams[posicao].participantes
    
    limite = listaDeTeams[encontrarPosicao(nomedoGrupo)].capacidade;
    
    
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

    nomeValue.value = '';
    capacidadeValue.value = '';

    esconderCriar();
    esconderOverlay();
    carregarTeams(listaDeTeams);
   }
   
  
}

function carregarTeams(lista) {
    let teamsGrid = document.querySelector("#teams");
    teamsGrid.innerHTML = '';
    lista.map((team,index) => {
        teamsGrid.innerHTML += `
            <div class="bg-cinza2 rounded-lg p-4" >
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
                        <span class="w-full relative z-10 text-center" onclick="mostrarAdicionar()" id="${team.nome}">Adicionar</span>
                    </button>
                    <button class="w-[40px] h-[40px] flex justify-center items-center border-2 border-rosa rounded-lg text-white text-[12px] uppercase font-bold relative group">
                        <span class="w-0 h-full absolute top-0 left-0 bg-rosa duration-200 group-hover:w-full"></span>
                        <box-icon name='trash' class="fill-white relative z-10" onclick="excluirGrupo()" id="${team.nome}"></box-icon>
                    </button>
                </div>
            </div>
        `;
    })
    
}

function encontrarPosicao(nome) {
    return listaDeTeams.findIndex(grupo => grupo.nome === nome);
}

function excluirGrupo(lista) {
    
    let posicao = encontrarPosicao(event.target.id)

    listaDeTeams.splice(posicao, 1)

   carregarTeams(listaDeTeams);
    
}

function adicionarAoGrupo(lista) {

    event.preventDefault();

    let memberinput = document.querySelector("#member")
    
    if (quantidadeMembros === 0 || quantidadeMembros < limite) {
        listaDeTeams[posicao].membro.push(memberinput.value)
        listaDeTeams[posicao].participantes = listaDeTeams[posicao].membro.length
        carregarTeams(listaDeTeams)
    }else{
        alert("Verifique a capacidade do grupo");
    }

     memberinput.value = ""

}

function mostrarNomes(index) {

    let divMain = document.querySelector("#main")

    let ulExistindo = divMain.querySelector('ul');

    let membros = listaDeTeams[index].membro
    

    if (ulExistindo) {
        console.log(ulExistindo)
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

