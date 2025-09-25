
    function mostrarConteudo() {
        document.getElementById('ola').classList.add('hidden');
        document.getElementById('conteudo').classList.add('visible');

        // Rolagem suave para links internos
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
        
        // Iniciar o observador de interseção após mostrar o conteúdo
        iniciarObservador();
    }

    function iniciarObservador() {
        const sections = document.querySelectorAll('section');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Remover a classe ativa de todas as seções
                    sections.forEach(section => {
                        section.classList.remove('active');
                    });
                    // Adicionar a classe ativa à seção visível
                    entry.target.classList.add('active');
                    
                    // Atualizar a navegação ativa
                    const id = entry.target.getAttribute('id');
                    document.querySelectorAll('nav a').forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, { threshold: 0.6 });

        sections.forEach(sec => {
            observer.observe(sec);
        });
    }

    document.addEventListener("DOMContentLoaded", function() {
        // Código de inicialização adicional pode vir aqui
    });
