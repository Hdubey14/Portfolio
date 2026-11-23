
document.addEventListener("DOMContentLoaded", () => {
  // =====================================
  // CONFIGURATION
  // =====================================

  // Apna personal email yahan add karna.
  // Example: const PORTFOLIO_EMAIL = "yourname@gmail.com";
  const PORTFOLIO_EMAIL = "hdubey4320@gmail.com";

  // =====================================
  // PRELOADER
  // =====================================

  const preloader = document.getElementById("preloader");

  window.addEventListener("load", () => {
    preloader?.classList.add("hide");
  });

  // Fallback in case the load event has already happened.
  setTimeout(() => {
    preloader?.classList.add("hide");
  }, 1800);

  // =====================================
  // NAVBAR
  // =====================================

  const header = document.getElementById("header");
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  const navItems = document.querySelectorAll(".nav-link");

  function closeMenu() {
    menuToggle?.classList.remove("open");
    navLinks?.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
    menuToggle?.setAttribute("aria-label", "Open navigation");
  }

  menuToggle?.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.classList.toggle("open", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation" : "Open navigation"
    );
  });

  navItems.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("click", (event) => {
    if (
      navLinks?.classList.contains("open") &&
      !navLinks.contains(event.target) &&
      !menuToggle.contains(event.target)
    ) {
      closeMenu();
    }
  });

  // =====================================
  // SCROLL EVENTS
  // =====================================

  const scrollTop = document.getElementById("scrollTop");

  function handleScroll() {
    const scrollY = window.scrollY;

    header?.classList.toggle("scrolled", scrollY > 30);
    scrollTop?.classList.toggle("show", scrollY > 450);

    updateActiveNavigation();
  }

  window.addEventListener("scroll", handleScroll, { passive: true });

  scrollTop?.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

  // =====================================
  // ACTIVE NAVIGATION
  // =====================================

  const sections = document.querySelectorAll("main section[id]");

  function updateActiveNavigation() {
    let currentSection = "home";
    const scrollPosition = window.scrollY + 180;

    sections.forEach((section) => {
      if (scrollPosition >= section.offsetTop) {
        currentSection = section.id;
      }
    });

    navItems.forEach((link) => {
      const target = link.getAttribute("href");

      link.classList.toggle(
        "active",
        target === `#${currentSection}`
      );
    });
  }

  handleScroll();

  // =====================================
  // SCROLL REVEAL
  // =====================================

  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -35px 0px"
      }
    );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach((element) => {
      element.classList.add("visible");
    });
  }

  // =====================================
  // PROJECT FILTERS
  // =====================================

  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedFilter = button.dataset.filter;

      filterButtons.forEach((item) => {
        item.classList.remove("active");
      });

      button.classList.add("active");

      projectCards.forEach((card) => {
        const category = card.dataset.category;

        const shouldShow =
          selectedFilter === "all" ||
          category === selectedFilter;

        card.classList.toggle("hidden", !shouldShow);
      });
    });
  });

  // =====================================
  // PROJECT DETAILS
  // =====================================

  const projectData = {
    xlligent: {
      eyebrow: "01 / REACT PROJECT",
      title: "Xlligent Softwares",
      description:
        "A multi-page company website developed to present company information, services and products through a responsive frontend experience.",
      overview:
        "The project focuses on organising multiple website sections, providing navigation between pages and maintaining a consistent visual interface across screen sizes.",
      work: [
        "Worked on frontend website pages and layouts.",
        "Worked with reusable React components.",
        "Worked on responsive styling for different devices.",
        "Worked with navigation and page structure.",
        "Focused on layout consistency and user interface improvements."
      ],
      technologies: [
        "React",
        "JavaScript",
        "CSS",
        "React Router",
        "Responsive Design"
      ]
    },

    hkd: {
      eyebrow: "02 / HTML CSS JAVASCRIPT",
      title: "HKD Dewas QR Code",
      description:
        "A web project built using HTML, CSS and JavaScript, designed around a QR-based digital experience.",
      overview:
        "The project uses core frontend technologies to create the website structure, visual styling and interactive browser-side behavior.",
      work: [
        "Created the website structure using HTML.",
        "Styled the interface using CSS.",
        "Used JavaScript for frontend interactions.",
        "Worked on the website layout and presentation.",
        "Prepared the project for online deployment."
      ],
      technologies: [
        "HTML5",
        "CSS3",
        "JavaScript",
        "Git",
        "GitHub"
      ]
    }
  };

  const projectModal = document.getElementById("projectModal");
  const modalClose = document.getElementById("modalClose");

  const modalTitle = document.getElementById("modalTitle");
  const modalEyebrow = document.getElementById("modalEyebrow");
  const modalDescription = document.getElementById("modalDescription");
  const modalOverview = document.getElementById("modalOverview");
  const modalWork = document.getElementById("modalWork");
  const modalTech = document.getElementById("modalTech");

  function openProjectModal(projectKey) {
    const project = projectData[projectKey];

    if (!project) return;

    modalEyebrow.textContent = project.eyebrow;
    modalTitle.textContent = project.title;
    modalDescription.textContent = project.description;
    modalOverview.textContent = project.overview;

    modalWork.replaceChildren();

    project.work.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      modalWork.appendChild(li);
    });

    modalTech.replaceChildren();

    project.technologies.forEach((technology) => {
      const span = document.createElement("span");
      span.textContent = technology;
      modalTech.appendChild(span);
    });

    projectModal.classList.add("open");
    projectModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");
    modalClose.focus();
  }

  function closeProjectModal() {
    projectModal?.classList.remove("open");
    projectModal?.setAttribute("aria-hidden", "true");
    document.body.classList.remove("no-scroll");
  }

  document.querySelectorAll("[data-project]").forEach((button) => {
    button.addEventListener("click", () => {
      openProjectModal(button.dataset.project);
    });
  });

  modalClose?.addEventListener("click", closeProjectModal);

  document.querySelectorAll("[data-close-modal]").forEach((element) => {
    element.addEventListener("click", closeProjectModal);
  });

  // =====================================
  // FAQ ACCORDION
  // =====================================

  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    item.addEventListener("toggle", () => {
      if (item.open) {
        faqItems.forEach((otherItem) => {
          if (otherItem !== item) {
            otherItem.open = false;
          }
        });
      }
    });
  });

  // =====================================
  // CONTACT FORM
  // =====================================

  const contactForm = document.getElementById("contactForm");
  const formNote = document.getElementById("formNote");

  contactForm?.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!contactForm.reportValidity()) return;

    if (!PORTFOLIO_EMAIL.trim()) {
      formNote.textContent =
        "Please add your personal email in script.js (PORTFOLIO_EMAIL) to enable email preparation.";

      formNote.style.color = "#a34d35";
      return;
    }

    const formData = new FormData(contactForm);

    const name = formData.get("name").trim();
    const senderEmail = formData.get("email").trim();
    const subject = formData.get("subject").trim();
    const message = formData.get("message").trim();

    const emailSubject = encodeURIComponent(subject);

    const emailBody = encodeURIComponent(
      `Hello Harsh,\n\n${message}\n\nRegards,\n${name}\nEmail: ${senderEmail}`
    );

    const mailtoLink =
      `mailto:${PORTFOLIO_EMAIL}` +
      `?subject=${emailSubject}` +
      `&body=${emailBody}`;

    window.location.href = mailtoLink;

    formNote.textContent =
      "Your email application should open with the prepared message.";

    formNote.style.color = "#526044";
  });

  // =====================================
  // CHATBOT
  // =====================================

  const chatToggle = document.getElementById("chatToggle");
  const chatBox = document.getElementById("chatBox");
  const chatClose = document.getElementById("chatClose");
  const chatForm = document.getElementById("chatForm");
  const chatInput = document.getElementById("chatInput");
  const chatMessages = document.getElementById("chatMessages");
  const chatSuggestions = document.querySelectorAll(
    ".chat-suggestions button"
  );

  function toggleChat(open) {
    chatBox.classList.toggle("open", open);
    chatBox.setAttribute("aria-hidden", String(!open));

    if (open) {
      chatInput.focus();
    }
  }

  chatToggle?.addEventListener("click", () => {
    toggleChat(!chatBox.classList.contains("open"));
  });

  chatClose?.addEventListener("click", () => {
    toggleChat(false);
  });

  function addChatMessage(message, type) {
    const messageElement = document.createElement("div");

    messageElement.className =
      type === "user" ? "user-message" : "bot-message";

    messageElement.textContent = message;

    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function getBotResponse(message) {
    const text = message.toLowerCase().trim();

    if (
      text.includes("hello") ||
      text.includes("hi") ||
      text.includes("hey") ||
      text.includes("hola")
    ) {
      return "Hello! Thanks for visiting Harsh's portfolio. You can ask me about his skills, projects, education or internship.";
    }

    if (
      text.includes("skill") ||
      text.includes("technology") ||
      text.includes("tech stack")
    ) {
      return "Harsh works with HTML, CSS, JavaScript and React. He also uses responsive design techniques, Git, GitHub, VS Code and Chrome DevTools.";
    }

    if (
      text.includes("project") ||
      text.includes("work") ||
      text.includes("portfolio")
    ) {
      return "There are two featured projects here: Xlligent Softwares, a React-based multi-page website, and HKD Dewas QR Code, built using HTML, CSS and JavaScript.";
    }

    if (
      text.includes("xlligent") ||
      text.includes("company website")
    ) {
      return "Xlligent Softwares is a multi-page company website project. The frontend work includes page layouts, reusable React components, navigation and responsive styling.";
    }

    if (
      text.includes("hkd") ||
      text.includes("qr")
    ) {
      return "HKD Dewas QR Code is a frontend project built using HTML, CSS and JavaScript.";
    }

    if (
      text.includes("education") ||
      text.includes("college") ||
      text.includes("degree")
    ) {
      return "Harsh completed B.Tech in Computer Science and Engineering from Shri Vaishnav Vishwavidyalaya, Indore, in 2026.";
    }

    if (
      text.includes("internship") ||
      text.includes("experience")
    ) {
      return "Harsh completed a Web Development internship from 28 January to 30 April 2026. He is a fresher and does not claim full-time professional experience.";
    }

    if (
      text.includes("certificate") ||
      text.includes("ibm")
    ) {
      return "The portfolio mentions an IBM certificate with a duration of 5 February to 5 March 2026. The exact certificate title can be added after verification.";
    }

    if (
      text.includes("location") ||
      text.includes("city") ||
      text.includes("where")
    ) {
      return "Harsh is based in Dewas, Madhya Pradesh, India.";
    }

    if (
      text.includes("contact") ||
      text.includes("email") ||
      text.includes("hire") ||
      text.includes("opportunity")
    ) {
      return "You can use the Contact section to prepare a message for Harsh. His personal contact details need to be added to the portfolio.";
    }

    if (
      text.includes("frontend") ||
      text.includes("role") ||
      text.includes("job")
    ) {
      return "Harsh is interested in entry-level Frontend Developer opportunities and wants to grow through practical development work.";
    }

    if (
      text.includes("resume") ||
      text.includes("cv")
    ) {
      return "You can use the Download Resume button in the hero section. Make sure the PDF is saved as files/Harsh-Dubey-Resume.pdf.";
    }

    return "I can help with information about Harsh's skills, projects, education, internship and frontend development interests. Try asking about one of these topics.";
  }

  function sendChatMessage(message) {
    const cleanMessage = message.trim();

    if (!cleanMessage) return;

    addChatMessage(cleanMessage, "user");

    const response = getBotResponse(cleanMessage);

    setTimeout(() => {
      addChatMessage(response, "bot");
    }, 250);

    chatInput.value = "";
  }

  chatForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    sendChatMessage(chatInput.value);
  });

  chatSuggestions.forEach((button) => {
    button.addEventListener("click", () => {
      sendChatMessage(button.dataset.question);
    });
  });

  // =====================================
  // KEYBOARD ACCESSIBILITY
  // =====================================

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeProjectModal();
      toggleChat(false);
      closeMenu();
    }
  });

  // =====================================
  // CURRENT YEAR
  // =====================================

  const currentYear = document.getElementById("currentYear");

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }
});
