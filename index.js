let participantes = [
    {
        nome: "Diego Samuel",
        email: "diego3s@gmail.com",
        dataInscricao: new Date(2024, 2, 22, 19, 20),
        dataCheckIn: new Date(2024, 2, 25, 21, 0)    
    },
    {
        nome: "Diego Fernandes",
        email: "diego3g@gmail.com",
        dataInscricao: new Date(2024, 2, 21, 19, 20),
        dataCheckIn: null  
    },
    {
        nome: "Maria Silva",
        email: "maria.silva@example.com",
        dataInscricao: new Date(2024, 2, 20, 14, 30),
        dataCheckIn: new Date(2024, 2, 25, 9, 45)  
    },
    {
        nome: "João Oliveira",
        email: "joao.oliveira@example.com",
        dataInscricao: new Date(2024, 2, 19, 10, 0),
        dataCheckIn: null  
    },
    {
        nome: "Ana Rodrigues",
        email: "ana.rodrigues@example.com",
        dataInscricao: new Date(2024, 2, 18, 16, 45),
        dataCheckIn: new Date(2024, 2, 23, 14, 20)  
    },
    {
        nome: "Pedro Sousa",
        email: "pedro.sousa@example.com",
        dataInscricao: new Date(2024, 2, 17, 12, 0),
        dataCheckIn: new Date(2024, 2, 22, 10, 30)  
    },
    {
        nome: "Carla Santos",
        email: "carla.santos@example.com",
        dataInscricao: new Date(2024, 2, 16, 9, 15),
        dataCheckIn: new Date(2024, 2, 21, 15, 45)  
    },
    {
        nome: "Rafaela Martins",
        email: "rafaela.martins@example.com",
        dataInscricao: new Date(2024, 2, 15, 18, 30),
        dataCheckIn: new Date(2024, 2, 20, 12, 10)  
    },
    {
        nome: "Bruno Costa",
        email: "bruno.costa@example.com",
        dataInscricao: new Date(2024, 2, 14, 13, 45),
        dataCheckIn: null  
    },
    {
        nome: "Mariana Almeida",
        email: "mariana.almeida@example.com",
        dataInscricao: new Date(2024, 2, 13, 11, 0),
        dataCheckIn: new Date(2024, 2, 18, 16, 25)  
    }
]

const criarNovoParticipante = (participante) => {
    const dataInscricao = dayjs(Date.now()).to(participante.dataInscricao)
    let dataCheckIn = dayjs(Date.now()).to(participante.dataCheckIn)

    if(participante.dataCheckIn == null) {
        dataCheckIn = `
            <button data-email="${participante.email}" onclick="fazerCheckIn(event)">
                Confirmar check-in
            </button>
        `
    }
    
    return `
    <tr>
        <td>
            <strong>${participante.nome}<strong>
            <br>
            <small>${participante.email}</small>    
        </td>
        <td>${dataInscricao}</td>
        <td>${dataCheckIn}</td>
    </tr>
    `
}

const atualizarLista = (participantes) => {
    let output = ""
    
    for(let participante of participantes) {
        output = output + criarNovoParticipante(participante)
    }

    // TO-DO: Pegar informação do HTML

    // Substituir informação do HTML
    document
    .querySelector('tbody')
    .innerHTML = output
}

atualizarLista(participantes)

const adicionarParticipante = (event) => {
    event.preventDefault()

    const dadosDoFormulario = new FormData(event.target)

    const participante = {
        nome: dadosDoFormulario.get('nome'),
        email: dadosDoFormulario.get('email'),
        dataInscricao: new Date(),
        dataCheckIn: null
    }

    // Verificar se o participante já existe
    const participanteExiste = participantes.find( (p) => p.email == participante.email)

    if(participanteExiste) {
        alert("Email já cadastrado")
        return
    }

    participantes = [participante, ...participantes]
    atualizarLista(participantes)

    // Limpar o formulário
    event.target.querySelector('[name="nome"]').value = ""
    event.target.querySelector('[name="email"]').value = ""
}

const fazerCheckIn = (event) => {
    // Confirmar se realmente quer fazer o check-in
    if(confirm('Tem certeza que deseja fazer o check-in') == false) {
        return     
    }

    // Encontrar o participante dentro da lista
    const participante = participantes.find((p) => {
        return p.email == event.target.dataset.email
    })

    // Atualizar o check-in do participante
    participante.dataCheckIn = new Date()

    // Atualizar a lista de participantes
    atualizarLista(participantes)
}