// Menu toggle
$(document).ready(function () {

    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    // Scroll and load events
    $(window).on('scroll load', function () {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if (window.scrollY > 60) {
            document.querySelector('#scroll-top').classList.add('active');
        } else {
            document.querySelector('#scroll-top').classList.remove('active');
        }

        // Scroll spy
        $('section').each(function () {
            let height = $(this).height();
            let offset = $(this).offset().top - 200;
            let top = $(window).scrollTop();
            let id = $(this).attr('id');

            if (top > offset && top < offset + height) {
                $('.navbar ul li a').removeClass('active');
                $('.navbar').find(`[href="#${id}"]`).addClass('active');
            }
        });
    });

    // Smooth scrolling
    $('a[href*="#"]').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top,
        }, 500, 'linear');
    });

    // Initialize EmailJS
    emailjs.init("HrVL6KbLpf3dB0cIu"); // Replace with your actual public key

    // Contact form submission
    $("#contact-form").submit(function (event) {
        event.preventDefault();

        const emailInput = document.querySelector('input[name="email"]');
        emailInput.value = emailInput.value.toLowerCase();

        emailjs.sendForm('service_mmr65mm', 'template_as9gryh', '#contact-form')
            .then(function (response) {
                alert("Form Submitted Successfully! I will get back to you soon.");
                document.getElementById("contact-form").reset();
            }, function (error) {
                alert("Form Submission Failed! Please try again or contact me directly at vedikalohiya4@gmail.com");
            });
    });

    // Typed.js effect
    var typed = new Typed(".typing-text", {
        strings: ["frontend development", "backend development", "web designing", "Python", "web development"],
        loop: true,
        typeSpeed: 50,
        backSpeed: 25,
        backDelay: 500,
    });

    // Page visibility change
    document.addEventListener('visibilitychange', function () {
        if (document.visibilityState === "visible") {
            document.title = "Portfolio | Vedika Lohiya";
            $("#favicon").attr("href", "assets/images/favicon.png");
        } else {
            document.title = "Come Back To Portfolio";
            $("#favicon").attr("href", "assets/images/favhand.png");
        }
    });

    // Fetch skills or projects
    async function fetchData(type = "skills") {
        let response;
        if (type === "skills") {
            response = await fetch("skills.json");
        } else {
            response = await fetch("./projects/projects.json");
        }
        const data = await response.json();
        return data;
    }

    function showSkills(skills) {
        let skillsContainer = document.getElementById("skillsContainer");
        let skillHTML = "";
        skills.forEach(skill => {
            skillHTML += `
            <div class="bar">
                  <div class="info">
                    <img src=${skill.icon} alt="skill" />
                    <span>${skill.name}</span>
                  </div>
            </div>`;
        });
        skillsContainer.innerHTML = skillHTML;
    }

    function showProjects(projects) {
        let projectsContainer = document.querySelector("#work .box-container");
        let projectHTML = "";
        projects.slice(0, 10).filter(project => project.category != "android").forEach(project => {
            projectHTML += `
            <div class="box tilt">
              <img draggable="false" src="/assets/images/projects/${project.image}.png" alt="project" />
              <div class="content">
                <div class="tag">
                  <h3>${project.name}</h3>
                </div>
                <div class="desc">
                  <p>${project.desc}</p>
                  <div class="btns">
                    <a href="${project.links.view}" class="btn" target="_blank"><i class="fas fa-eye"></i> View</a>
                    <a href="${project.links.code}" class="btn" target="_blank">Code <i class="fas fa-code"></i></a>
                  </div>
                </div>
              </div>
            </div>`;
        });
        projectsContainer.innerHTML = projectHTML;

        // Vanilla Tilt
        VanillaTilt.init(document.querySelectorAll(".tilt"), {
            max: 15,
        });
    }

    // Load skills and projects
    fetchData("skills").then(showSkills);
    fetchData("projects").then(showProjects);
});
