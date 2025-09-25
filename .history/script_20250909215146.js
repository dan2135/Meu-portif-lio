    
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
            const sections = document.querySelectorAll('section'); 
            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    entries[0].target.classList.add('active');
                } else {
                    entries[0].target.classList.remove('active');
                }
            }, { threshold: 0.1 });

            sections.forEach(section => {
                observer.observe(section);
            });
        
        document.addEventListener("DOMContentLoaded", function () {

           
        });