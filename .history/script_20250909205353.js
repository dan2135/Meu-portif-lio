function mostrarconteudo() {
    
    document.getElementById("conteudo").style.display = "none";

    const conteudo = document.getElementById("conteudo");
    conteudo.style.display = "block";
    setTimeout(() => {
        conteudo.style.opacity = "1";
    }, 100);    
    document.getElementById("ola").style.display = "none";
}