let qs = el => document.querySelector(el);
let qsa = el => document.querySelectorAll(el);

let seuVotoPara = qs('.d-1-1 span');
let cargo = qs('.d-1-2 span');
let descricao = qs('.d-1-4');
let aviso = qs('.d-2');
let lateral = qs('.d-1--right');
let numeros = qs('.d-1-3');

let etapaAtual = 0;
let numero = ``;
let votoBranco = false;
let votosTotais = [];

qsa('.teclado--linha .teclado--botao').forEach(e => {
    e.addEventListener('click', e => {
        let tecla = e.target.innerHTML;

        if(tecla == 'CONFIRMA') {
            confirma();
        } else if (tecla == 'BRANCO') {
            branco();
        } else if (tecla == 'CORRIGE') {
            corrige();
        } else {
            numeroClick(tecla);
        }

    })
});

function startEtapa() {
    let etapa = etapas[etapaAtual];

    let numeroHTML = ``;
    numero = ``;
    votoBranco = false;

    for(let i = 0; i<etapa.numeros; i++) {
        if(i == 0) {
            numeroHTML += `<div class="numero pisca"></div>`;
        } else {
        numeroHTML += `<div class="numero"></div>`;
        }
    }
    seuVotoPara.style.display = `none`;
    cargo.innerHTML = etapa.titulo;
    descricao.innerHTML = ``;
    aviso.style.display = `none`;
    lateral.innerHTML = ``;
    numeros.innerHTML = numeroHTML;
}

function atualizaInterface() {
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter(item => item.numero === numero);
    
    if(candidato.length > 0) {
        candidato = candidato[0];
        seuVotoPara.style.display = `block`;
        aviso.style.display = `block`;
        descricao.innerHTML = `Nome: ${candidato.nome}</br>Partido: ${candidato.partido}`;
        
        let fotosHTML = ``;
        for(let i in candidato.fotos) {
            if (candidato.fotos[i].small) {
                fotosHTML += `<div class="d-1-image small"><img src="${candidato.fotos[i].url}">${candidato.fotos[i].legenda}</div>`;
            } else {
                fotosHTML += `<div class="d-1-image"><img src="${candidato.fotos[i].url}">${candidato.fotos[i].legenda}</div>`;
            }
        }
        lateral.innerHTML = fotosHTML;
    } else {
        seuVotoPara.style.display = `block`;
        aviso.style.display = `block`;
        descricao.innerHTML = `<div class="aviso--grande pisca">VOTO NULO</div>`
    }
}

function numeroClick(e) {
   let elNumero = qs('.numero.pisca');
   if(elNumero !== null) {
    elNumero.innerHTML =  e;
    numero = `${numero}${e}`;

    elNumero.classList.remove('pisca');
    if(elNumero.nextElementSibling !== null) {
    elNumero.nextElementSibling.classList.add('pisca');
        } else {
            atualizaInterface();
        }
    }
}

function confirma() {
   let etapa = etapas[etapaAtual];
    let votoConfirmado = false;

   if(votoBranco === true) {
    votoConfirmado = true;
    votosTotais.push({
        etapa: etapas[etapaAtual].titulo,
        voto: 'branco'
    });
   } else if(numero.length === etapa.numeros) {
    votoConfirmado = true;
    votosTotais.push({
        etapa: etapas[etapaAtual].titulo,
        voto: numero
    });
   }

    if(votoConfirmado) {
        etapaAtual++;
        if(etapas[etapaAtual] !== undefined) {
           startEtapa(); 
        } else {
            qs('.tela').innerHTML = `<div class="aviso--gigante pisca">FIM</div>`;
            console.log(votosTotais);
        }
    }


}

function branco() {
    numero = ``;    
    votoBranco = true;
    seuVotoPara.style.display = `block`;
    aviso.style.display = `block`;
    numeros.innerHTML = ``;
    descricao.innerHTML = `<div class="aviso--grande pisca">VOTO EM BRANCO</div>`
    lateral.innerHTML = ``;
}

function corrige() {
    startEtapa();
}

startEtapa();
