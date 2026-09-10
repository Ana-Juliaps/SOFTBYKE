document.getElementById('btnVoltarTopo').addEventListener('click', function(v) {
    v.preventDefault(); //impede de voltar a pagina bruscamente

    window.scrollTo({
        top: 0,
        behavior: 'smooth' // rola a tela suavemente para o topo
    });
});