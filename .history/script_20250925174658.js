     function mostrarConteudo() {
            document.getElementById('ola').classList.add('hidden');
            document.getElementById('conteudo').classList.add('visible');
            
            // Iniciar observadores após mostrar o conteúdo
            setTimeout(() => {
                iniciarObservadorSecoes();
                iniciarObservadorElementos();
                configurarNavegacao();
            }, 300);
        }

        // Observador para as seções principais
        function iniciarObservadorSecoes() {
            const sections = document.querySelectorAll('section');
            const navLinks = document.querySelectorAll('nav a');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Remover a classe ativa de todas as seções
                        sections.forEach(section => {
                            if (section !== entry.target) {
                                section.classList.add('exiting');
                                setTimeout(() => {
                                    section.classList.remove('active', 'exiting');
                                }, 300);
                            }
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
            }, { threshold: 0.5 });
            
            sections.forEach(section => {
                observer.observe(section);
            });
        }

        // Observador para elementos individuais (skills, projetos, contato)
        function iniciarObservadorElementos() {
            const elements = document.querySelectorAll('.skill-card, .projeto-card, .contato-links li');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(() => {
                            entry.target.classList.add('visible');
                        }, 100);
                    }
                });
            }, { threshold: 0.2 });
            
            elements.forEach(element => {
                observer.observe(element);
            });
        }

        // Configurar navegação suave
        function configurarNavegacao() {
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
        }

        document.addEventListener("DOMContentLoaded", function() {
            // Inicialização adicional quando necessário
        });