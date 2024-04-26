const gM = document.querySelector(".fotos_modal");
const iGM = document.querySelector(".fotos_modal img");

let estrela_cheia = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" aria-hidden="true" role="presentation" focusable="false" style="display: block; height: 0.5625rem; width: 0.5625rem; fill: var(--f-k-smk-x);"><path fill-rule="evenodd" d="m15.1 1.58-4.13 8.88-9.86 1.27a1 1 0 0 0-.54 1.74l7.3 6.57-1.97 9.85a1 1 0 0 0 1.48 1.06l8.62-5 8.63 5a1 1 0 0 0 1.48-1.06l-1.97-9.85 7.3-6.57a1 1 0 0 0-.55-1.73l-9.86-1.28-4.12-8.88a1 1 0 0 0-1.82 0z"></path></svg>`
const nota_a_atualizar = document.getElementById('comente_nota_valor');
const lista_ids = [document.getElementById('comente_No'), document.getElementById('comente_input_link'), document.getElementById('comente_Es'), document.getElementById('comente_Pa'), document.getElementById('comente_estrela'), document.getElementById('comente_d1'), document.getElementById('comente_d2'), document.getElementById('comente_comentario')]

chaves_local_storage = ['nomes', 'imagens', 'lugares_Es', 'lugares_Pa', 'notas', 'datas_entradas', 'datas_saídas', 'comentarios'];


// function fecharGaleria(){
//    gM.style.visibility = "hidden"; 
//    iGM.style.transform = "scale(0)";
//  }

// function abrirGaleria(src){
//     gM.style.visibility = "visible";
//     iGM.style.transform = "scale(1)";
//     iGM.src = src;
//  }


function abrirGaleria(){
    var div = document.getElementById('fotos_abertas'); 
    div.style.display = 'block';
    var div = document.getElementById('teste');
    div.style.display = 'none';
    var div = document.getElementById('nav');
    div.style.display = 'none';
}


function fecharGaleria(){
    var div = document.getElementById('fotos_abertas'); 
    div.style.display = 'none';
    var div = document.getElementById('teste');
    div.style.display = 'flex';
    var div = document.getElementById('nav');
    div.style.display = 'flex';
}


document.getElementById("btn-reservar").addEventListener("click", function() {
    window.location.href = "login.html";
});


const atualizar_nota = () => {
    nota_a_atualizar.innerHTML = `${lista_ids[4].value}`
}


const armazenar = () => {
    let valores_nulos = 0;
    for (let count = 0; count < 8; count++) {
        if (count != 1) {
            if (lista_ids[count].value == '') {
                valores_nulos++;
            }
        }
    }

    if (valores_nulos != 0) {
        alert("Campos obrigtórios não preenchidos");
    } else {
        for (let count = 0; count < 8; count++) {
            let lista_adicionar = (localStorage.getItem(`${chaves_local_storage[count]}`)) ? JSON.parse(localStorage.getItem(`${chaves_local_storage[count]}`)) : []
            lista_adicionar.push(`${lista_ids[count].value}`)
            const dadoJson = JSON.stringify(lista_adicionar)
            localStorage.setItem(`${chaves_local_storage[count]}`, dadoJson)
        }

        const aba_comentarios = document.getElementById('comentarios');
        const novo_comentario = document.createElement('div');
        
        let estrelas = ''
        for (let count = 0; count < parseInt(lista_ids[4].value); count++) {
            estrelas += estrela_cheia
        }
        if(parseInt(lista_ids[4].value) == 0){
            estrelas = "0 estrelas"
        }

        novo_comentario.classList.add('comentario');
        novo_comentario.innerHTML = `
        <div id="dados_usuario">
            <div id="usuario_imagem">
                <img src=${lista_ids[1].value}>
            </div>
            <div id="usuario_texto">
                <div id="usuario_nome">
                    <strong class="letra_forte">${lista_ids[0].value}</strong>
                </div>
                <div id="usuario_local">
                    ${lista_ids[2].value}, ${lista_ids[3].value}
                </div>
            </div>
        </div>
        <div id="comentario_parte_para_inverter">
            <div id="estrelas_data">
                <div id="estrelas" class="ponto">
                    ${estrelas}
                </div>
                <div id="tempo" class="ponto">
                    <strong>Chegou: ${lista_ids[5].value}</strong>
                </div>
                <div id="tempo_estadia">
                    Saiu: ${lista_ids[6].value}
                </div>
            </div>
            <div id="comentario_texto">
                ${lista_ids[7].value}
            </div>
        </div>`
        aba_comentarios.insertBefore(novo_comentario, aba_comentarios.children[1].nextSibling);
    }

}


const atualizar_comentarios = () => {
    if (!(localStorage.getItem('nomes'))) { }
    else {

        const quant_comentario = (JSON.parse(localStorage.getItem('nomes'))).length
        let comentarios = []
        for (let classe_num = 0; classe_num < quant_comentario; classe_num++) {
            const nova_classe = {
                nome: (JSON.parse(localStorage.getItem(`${chaves_local_storage[0]}`)))[classe_num],
                imagem: (JSON.parse(localStorage.getItem(`${chaves_local_storage[1]}`)))[classe_num],
                lugar_Es: (JSON.parse(localStorage.getItem(`${chaves_local_storage[2]}`)))[classe_num],
                lugar_Pa: (JSON.parse(localStorage.getItem(`${chaves_local_storage[3]}`)))[classe_num],
                nota: (JSON.parse(localStorage.getItem(`${chaves_local_storage[4]}`)))[classe_num],
                data_entrada: (JSON.parse(localStorage.getItem(`${chaves_local_storage[5]}`)))[classe_num],
                data_saida: (JSON.parse(localStorage.getItem(`${chaves_local_storage[6]}`)))[classe_num],
                comentario: (JSON.parse(localStorage.getItem(`${chaves_local_storage[7]}`)))[classe_num]
            }
            comentarios.push(nova_classe)

            const aba_comentarios = document.getElementById('comentarios');
            const novo_comentario = document.createElement('div');
            let estrelas = ''

            for (let count = 0; count < parseInt(nova_classe.nota); count++) {
                estrelas += estrela_cheia
            }
            if(parseInt(nova_classe.nota) == 0){
                estrelas = "0 estrelas"
            }

            novo_comentario.classList.add('comentario');
            novo_comentario.innerHTML = `
        <div id="dados_usuario">
            <div id="usuario_imagem">
                <img src=${nova_classe.imagem}>
            </div>
            <div id="usuario_texto">
                <div id="usuario_nome">
                    <strong class="letra_forte">${nova_classe.nome}</strong>
                </div>
                <div id="usuario_local">
                    ${nova_classe.lugar_Es}, ${nova_classe.lugar_Pa}
                </div>
            </div>
        </div>
        <div id="comentario_parte_para_inverter">
            <div id="estrelas_data">
                <div id="estrelas" class="ponto">
                    ${estrelas}
                </div>
                <div id="tempo" class="ponto">
                    <strong>Chegou: ${nova_classe.data_entrada}</strong>
                </div>
                <div id="tempo_estadia">
                    Saiu: ${nova_classe.data_saida}
                </div>
            </div>
            <div id="comentario_texto">
                ${nova_classe.comentario}
            </div>
        </div>`
            aba_comentarios.insertBefore(novo_comentario, aba_comentarios.children[1].nextSibling);
        }
    }
}


atualizar_comentarios()

document.addEventListener('scroll', function() {
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    var parteDireita = document.getElementById('parte_direita');
    var stopTop = 400; 
    var stopBottom = document.body.scrollHeight - 2700; 

    if (scrollTop > stopTop && scrollTop < stopBottom) {
        parteDireita.style.position = 'fixed';
        parteDireita.style.top = '10px';
    } else if (scrollTop <= stopTop) {
        parteDireita.style.position = 'absolute';
        parteDireita.style.top = '10px';
    } else {
        parteDireita.style.position = 'absolute';
        parteDireita.style.top = (stopBottom - stopTop) + 'px';
    }
});
