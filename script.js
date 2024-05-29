fetch('./schema.json')
            .then(resp => resp.json())
            .then((cv) => { 
                const svgIcons = [
                    "css.svg",
                    "flutter.svg",
                    "git.svg",
                    "github.svg",
                    "html.svg",
                    "javaScript.svg",
                    "kotlin.svg",
                    "linkedin.svg",
                    "mail.svg",
                    "next.svg",
                    "node.svg",
                    "phone.svg",
                    "react.svg",
                    "sql.svg",
                    "swift.svg",
                    "swiftui.svg",
                    "tailwind.svg",
                    "type.svg",
                    "wordMap.svg",
                    "x.svg",
                ]; 
                const {name, label, location, email, image, profiles, summary, phone} = cv.basics;
                const {city, region } = location; 
                const {network, url} = profiles; 
                const {work} = cv;
                const {education} = cv;
                const {skills} = cv;  
                const {projects} = cv;
               
                document.getElementById('name').textContent = name;
                document.getElementById('label').textContent = label;
                document.getElementById('location').textContent =  city + ', ' + region;
                //document.getElementById('email').textContent = "Outloook";
                document.getElementById('email').href = `mailto:${email}`; 
                document.getElementById('email').title = `Enviar un correo electronico ${name}`; 
                document.getElementById('image').src = image; 
                document.getElementById('image').alt = "Abatar";
                document.getElementById('insert-about').textContent = summary;
                
                const linkedInfo = profiles.find(({network}) => network === "Linkedin"); 
                const linkedUrl = linkedInfo?.url;  
                const printInfo = [email, phone, linkedUrl].filter(Boolean).join(" "); 

                document.getElementById('print').textContent = printInfo;
                
                /* Mostramos los elementos en el footer de la información */
                const footer = document.querySelector('footer'); 
                /* coloca el icono del phone en la Header */
                if (phone != null){
                    const elementPhone = document.createElement('a'); 
                    elementPhone.title = phone;
                    
                    let searchPhone = svgIcons.find((valor)=> valor.toLowerCase() == "phone.svg");
                    if (searchPhone){
                        const dir = '/iconos/' + searchPhone;
                        const img = `
                            <img src=${dir} alt="icono de ${searchPhone}"></img>
                        `;  
                        elementPhone.innerHTML = img;
                    }
                    footer.appendChild(elementPhone);
                }
                /* Busca y coloca el resto de los iconos de las redes en el Header */
                profiles.forEach(element => {
                    const iconos = document.createElement('a');
                    iconos.href = element.url; 
                    iconos.target = "_blank";
                    iconos.title = element.network;

                    const elementSearch = element.network.toLowerCase()+".svg";     
                    var search = svgIcons.find((valor)=> valor.toLowerCase() == elementSearch.toLowerCase()); 
                    if (search){
                        const dir = '/iconos/' + search;
                        const img = `
                            <img src=${dir} alt="icono de ${element.network}"></img>
                        `;  
                        iconos.innerHTML = img;  
                    }else{
                        iconos.innerHTML = `${element.network}`;
                    }
                    footer.appendChild(iconos);
                });

                /* Mostramos los elementos en la experiencia */
                const listWork = document.querySelector('#list-work');
             
                work.forEach(element =>{
                    const elemWork = document.createElement('li');
                    const startYear = new Date(element.startDate).getFullYear();
                    const endYear = element.endDate != null ? new Date(element.endDate).getFullYear() : "Actual"; 
                    console.log(element.endDate, endYear);                  
                    const years = `${startYear} - ${endYear}`;
              
                    const mostElemet = `
                        <article>
                            <header>
                                <div>
                                    <h3>${element.name}</h3>
                                    <h4>${element.position}</h4>
                                </div>    
                                <time>${years}</time>
                            </header>
                            <footer>
                                <p>${element.summary}</p>
                                <p>${element.url}</p>
                            </footer>                        
                        </article>
                    `; 
                    elemWork.innerHTML = mostElemet;
                    listWork.appendChild(elemWork);
                })
                
                /* Mostramos los elementos en la Educación  */
                const listEducation = document.querySelector('#list-education');
             
                education.forEach(element =>{
                    const elemEducation = document.createElement('li');
                    const startYear = new Date(element.startDate).getFullYear();
                    const endYear = element.endDate != null ? new Date(element.endDate).getFullYear() : "Actual";  
                      
                    const years = `${startYear} - ${endYear}`;

                    const mostElemet = `
                        <article>
                            <header>
                                <div>
                                    <h3>${element.institution}</h3>
                                    <h4>${element.studyType}</h4>
                                </div>    
                                <time>${years}</time>
                            </header>
                            <footer>
                                <p>${element.area}</p>
                                <div>
                                    <p>${element.courses}</p>
                                    <p>${element.score}</p>
                                </div>
                            </footer>                        
                        </article>
                    `; 
                    elemEducation.innerHTML = mostElemet;
                    listEducation.appendChild(elemEducation);
                })

                /* Sección de las Skill */
                const listSkills = document.querySelector('#list-skills'); 
                skills.forEach(skill => { 
                    const elemSkill = document.createElement('li'); 
                    elemSkill.innerHTML = `<span>${skill.name}</spna>`; 
                    listSkills.appendChild(elemSkill); 
                })
                /* Sección de los proyectos */

                const listProjects = document.querySelector('#list-projects'); 
                projects.forEach(project =>{
                                   
                    const elemProject = document.createElement('li');
                    
                    const mostElemet = `
                    <article>
                        <header>
                            <h3>
                            <a href= ${project.url} title="ver el proyecto ${project.name}">
                                ${project.name}      
                            </a>
                            ${project.isActive && `<span>&bullet;</span>`}
                            </h3>
                            <p>${project.description}</p>
                        </header>
                        <footer>
                            ${project.highlights.map(highlight => `<span>${highlight}</span>`).join('')}
                                                                   
                        </footer>                        
                    </article>
                    `;
                    elemProject.innerHTML = mostElemet;
                    listProjects.appendChild(elemProject);  
                })
            }) 
            .catch(err => console.error('Error fetching JSON:', err)); 