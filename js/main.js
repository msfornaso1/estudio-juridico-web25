const navToggle = document.querySelector(".nav-toggle");
const navigation = document.querySelector(".site-nav");

if (navToggle && navigation) {
  navToggle.addEventListener("click", () => {
    const expanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!expanded));
    navigation.classList.toggle("open");
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navToggle.setAttribute("aria-expanded", "false");
      navigation.classList.remove("open");
    });
  });
}

const currentYearElement = document.getElementById("current-year");
if (currentYearElement) {
  currentYearElement.textContent = new Date().getFullYear();
}

const contactForm = document.querySelector('form[name="contacto"]');
if (contactForm) {
  const statusMessage = contactForm.querySelector(".form-status");
  const submitButton = contactForm.querySelector('button[type="submit"]');

  const setStatus = (message, isError = false) => {
    if (!statusMessage) {
      return;
    }
    statusMessage.textContent = message;
    statusMessage.classList.toggle("is-error", isError);
    statusMessage.classList.add("is-visible");
  };

  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (statusMessage) {
      statusMessage.textContent = "";
      statusMessage.classList.remove("is-visible", "is-error");
    }

    if (submitButton) {
      submitButton.disabled = true;
    }

    const formData = new FormData(contactForm);
    const payload = new URLSearchParams(formData).toString();

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: payload,
      });

      if (!response.ok) {
        throw new Error("La solicitud no se completó correctamente.");
      }

      contactForm.reset();
      setStatus("¡Enviado!");
    } catch (error) {
      setStatus("Ocurrió un error. Intente nuevamente.", true);
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
      }
    }
  });
}
