function mostrarconteudo() {
    
    document.getElementById("conteudo").style.display = "none";

    const conteudo = document.getElementById("conteudo");
    conteudo.style.display = "block";
    setTimeout(() => {
        conteudo.style.opacity = "1";
    }, 100);    
    document.getElementById("ola").style.display = "none";
}

 function initIntersectionObserver() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('nav a');
        
        // Opções para o observador de interseção
        const options = {
            root: null, // observar no viewport
            rootMargin: '0px',
            threshold: 0.5 // 50% da seção visível
        };
        
        // Criar o observador
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Remover a classe ativa de todas as seções
                    sections.forEach(section => {
                        section.classList.remove('active');
                    });
                    
                    // Adicionar a classe ativa à seção visível
                    entry.target.classList.add('active');
                    
                    // Atualizar o link de navegação ativo
                    const id = entry.target.getAttribute('id');
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, options);
        
        // Observar cada seção
        sections.forEach(section => {
            observer.observe(section);
        });
    }

    // Adicionar evento de clique suave para os links de navegação
    document.addEventListener('DOMContentLoaded', function() {
        document.querySelectorAll('nav a').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            });
        });