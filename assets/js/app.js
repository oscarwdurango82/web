document.addEventListener('DOMContentLoaded',()=>{
  const buttons = document.querySelectorAll('.nav-btn');
  const sections = document.querySelectorAll('.section');
  const statusEl = document.getElementById('formStatus');
  const form = document.getElementById('contactForm');

  function show(sectionId){
    sections.forEach(s=>s.classList.remove('visible'));
    document.getElementById(sectionId).classList.add('visible');
    buttons.forEach(b=>b.classList.toggle('active', b.dataset.section===sectionId));
    window.scrollTo({top:0, behavior:'smooth'});
  }

  buttons.forEach(btn=> btn.addEventListener('click',()=> show(btn.dataset.section)));

  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', (e)=>{
      const id = a.getAttribute('href').slice(1);
      if(document.getElementById(id)){
        e.preventDefault();
        show(id);
      }
    });
  });

  if(form){
    form.addEventListener('submit', (e)=>{
      e.preventDefault();
      const data = new FormData(form);
      const nombre = data.get('nombre');
      const correo = data.get('correo');
      const mensaje = data.get('mensaje');
      const mailto = `mailto:oscardurango82@gmail.com?subject=Nuevo%20mensaje%20de%20${encodeURIComponent(nombre)}&body=${encodeURIComponent(mensaje + '\n\nContacto: ' + correo)}`;
      statusEl.textContent = 'Abriendo tu cliente de correo...';
      window.location.href = mailto;
      setTimeout(()=>{ statusEl.textContent = 'Si no se abrió tu correo, escribe a: oscardurango82@gmail.com'; }, 1500);
      form.reset();
    });
  }
});