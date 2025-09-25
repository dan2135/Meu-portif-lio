    
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
        }
        
        document.addEventListener("DOMContentLoaded", function () {

            const sections = document.querySelectorAll('section'); 
            const 
        });