/**
 * ============================================================================
 * CYBER SECURITY ASSESSMENT AND PROTECTION SYSTEM (PART 1)
 * Main JavaScript File
 * Controls:
 *  1. Smooth Navigation & Real-Time Active Link Tracking
 *  2. Interactive Endpoint Security Assessment (Score /100 & Remediation)
 *  3. Interactive 10-Question Knowledge Evaluation (Grading & Explanations)
 * ============================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  initNavigation();
  initAssessment();
  initQuiz();
});

/* ============================================================================
   1. NAVIGATION & MOBILE MENU
   ============================================================================ */
function initNavigation() {
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");
  const links = document.querySelectorAll(".nav-link");

  // Mobile menu toggle
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });

    links.forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
      });
    });
  }

  // Active navigation link on scroll
  const sections = document.querySelectorAll("section[id]");
  window.addEventListener("scroll", () => {
    let scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute("id");
      const navItem = document.querySelector(`.nav-link[href*="${sectionId}"]`);

      if (navItem) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navItem.classList.add("active");
        } else {
          navItem.classList.remove("active");
        }
      }
    });
  });
}

/* ============================================================================
   2. BASIC SECURITY ASSESSMENT (Score out of 100)
   Evaluates 5 fundamental personal security controls (20 pts each):
     - Best practice: 20 pts
     - Moderate / Partial: 10 pts
     - Vulnerable / Disabled: 0 pts
   ============================================================================ */
function initAssessment() {
  const form = document.getElementById("assessmentForm");
  const calculateBtn = document.getElementById("calculateScoreBtn");
  const resetBtn = document.getElementById("resetAssessmentBtn");
  const resultCard = document.getElementById("assessmentResult");

  if (!form || !calculateBtn) return;

  // Highlight option pill on selection
  const radioLabels = form.querySelectorAll(".opt-pill");
  radioLabels.forEach(label => {
    const radio = label.querySelector("input[type='radio']");
    radio.addEventListener("change", () => {
      const groupName = radio.getAttribute("name");
      form.querySelectorAll(`input[name="${groupName}"]`).forEach(input => {
        input.closest(".opt-pill").classList.remove("selected");
      });
      if (radio.checked) {
        label.classList.add("selected");
      }
    });
  });

  // Calculate assessment score
  calculateBtn.addEventListener("click", () => {
    const questions = ["firewall", "windows_update", "password", "suspicious_links", "security_software"];
    let totalScore = 0;
    let answeredCount = 0;
    const tips = [];

    questions.forEach(qName => {
      const selected = form.querySelector(`input[name="${qName}"]:checked`);
      if (selected) {
        answeredCount++;
        const points = parseInt(selected.value, 10);
        totalScore += points;

        // Contextual remediation recommendations
        if (points < 20) {
          if (qName === "firewall") {
            tips.push("Enable Windows Defender Firewall across both Private and Public network profiles to filter inbound connection probes.");
          } else if (qName === "windows_update") {
            tips.push("Activate automatic Windows Updates to ensure security patches for discovered CVE vulnerabilities are installed immediately.");
          } else if (qName === "password") {
            tips.push("Upgrade simple or reused passwords to 14+ character passphrases and activate Multi-Factor Authentication (MFA).");
          } else if (qName === "suspicious_links") {
            tips.push("Implement strict URL inspection habits and verify email sender addresses before downloading attachments or clicking links.");
          } else if (qName === "security_software") {
            tips.push("Enable continuous real-time antivirus protection with automatic daily malware signature updates.");
          }
        }
      }
    });

    if (answeredCount < questions.length) {
      alert("Please complete all 5 diagnostic checkpoints before calculating your security score.");
      return;
    }

    // Determine posture tier
    let statusText = "";
    let badgeClass = "";
    let summaryText = "";

    if (totalScore >= 80) {
      statusText = "Good";
      badgeClass = "tier-good";
      summaryText = "Hardened Security Posture: Your essential endpoint defenses and credential practices are effectively established.";
    } else if (totalScore >= 50) {
      statusText = "Moderate";
      badgeClass = "tier-moderate";
      summaryText = "Moderate Vulnerability Exposure: Baseline defenses exist, but unaddressed gaps leave your device vulnerable to common cyber attacks.";
    } else {
      statusText = "Needs Improvement";
      badgeClass = "tier-poor";
      summaryText = "Critical Exposure Warning: Multiple core defenses are inactive, leaving your personal system susceptible to malware, phishing, and network intrusion.";
    }

    // Render results
    document.getElementById("scoreValue").textContent = totalScore;
    const badgeEl = document.getElementById("statusBadge");
    badgeEl.textContent = statusText;
    badgeEl.className = `score-tier ${badgeClass}`;
    document.getElementById("summaryText").textContent = summaryText;

    const tipsList = document.getElementById("assessmentTipsList");
    tipsList.innerHTML = "";
    if (tips.length > 0) {
      tips.forEach(tip => {
        const li = document.createElement("li");
        li.textContent = tip;
        tipsList.appendChild(li);
      });
      document.getElementById("tipsContainer").style.display = "block";
    } else {
      const li = document.createElement("li");
      li.textContent = "All baseline controls configured effectively. Continue monitoring update status and maintaining security vigilance.";
      tipsList.appendChild(li);
      document.getElementById("tipsContainer").style.display = "block";
    }

    resultCard.classList.add("active");
    resultCard.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });

  // Reset assessment
  resetBtn.addEventListener("click", () => {
    form.reset();
    radioLabels.forEach(label => label.classList.remove("selected"));
    resultCard.classList.remove("active");
  });
}

/* ============================================================================
   3. CYBER SECURITY QUIZ (10 Targeted MCQs strictly on Part 1 Topics)
   ============================================================================ */
const quizQuestions = [
  {
    topic: "Viruses & Infections",
    question: "1. What is the fundamental operational difference between a computer virus and a computer worm?",
    options: [
      "A virus requires an existing host file and user execution to spread, whereas a worm replicates independently across networks without user action.",
      "A virus only damages hardware, whereas a worm steals files.",
      "A worm requires email attachments to spread, while a virus does not need a host.",
      "There is no difference; virus and worm are identical technical terms."
    ],
    correct: 0,
    explanation: "Viruses attach themselves to legitimate programs and rely on user execution to replicate. Worms are standalone malicious programs that replicate automatically across network connections without user intervention."
  },
  {
    topic: "Malware Classification",
    question: "2. Which type of malware pretends to be legitimate, desirable software (such as a game or utility) to trick the user into installing it?",
    options: [
      "Ransomware",
      "Trojan Horse",
      "Spyware",
      "Worm"
    ],
    correct: 1,
    explanation: "Named after the historic Greek myth, a Trojan Horse masquerades as harmless or useful software but conceals a hidden malicious payload that compromises the system once executed."
  },
  {
    topic: "Malware Threats",
    question: "3. What is the primary objective of Ransomware?",
    options: [
      "To silently monitor keystrokes and webcam feeds.",
      "To encrypt the victim's critical files and demand payment for the decryption key.",
      "To boost internet connection speed by disabling firewalls.",
      "To delete operating system files immediately without leaving a trace."
    ],
    correct: 1,
    explanation: "Ransomware targets data availability by locking access to files using strong encryption and extorting the user for a ransom (frequently in cryptocurrency) in exchange for restoring access."
  },
  {
    topic: "Personal Computer Security",
    question: "4. Which of the following is considered a primary defense practice for personal computer security?",
    options: [
      "Using the same short password on all accounts so you don't forget it.",
      "Disabling screen lock to speed up system boot times.",
      "Using strong, unique passwords combined with Multi-Factor Authentication (MFA) and locking the PC when unattended.",
      "Connecting to public, unencrypted Wi-Fi networks for banking."
    ],
    correct: 2,
    explanation: "A robust defense for personal computers combines strong unique credentials, multi-factor authentication, physical screen locks (Win + L), and cautious network usage."
  },
  {
    topic: "OS Hardening",
    question: "5. What is the primary defensive purpose of User Account Control (UAC) in modern operating systems?",
    options: [
      "To prevent unauthorized programs from making administrative-level changes without user permission.",
      "To automatically uninstall third-party games.",
      "To limit how many hours a user can use the computer.",
      "To replace the need for an operating system firewall."
    ],
    correct: 0,
    explanation: "UAC enforces the principle of least privilege by notifying users and requiring explicit consent whenever an application attempts to make system-level or administrative modifications."
  },
  {
    topic: "Windows Update",
    question: "6. Why are Windows Updates and security patches critical for system protection?",
    options: [
      "They only change the desktop wallpaper and theme colors.",
      "They fix discovered security vulnerabilities before cybercriminals can exploit them.",
      "They permanently prevent anyone from connecting to the internet.",
      "They eliminate the need to back up your personal files."
    ],
    correct: 1,
    explanation: "Software developers regularly uncover security bugs and vulnerabilities. Security patches distributed via Windows Update close these known security holes before malicious actors can exploit them."
  },
  {
    topic: "Cyber Attacks",
    question: "7. An attacker sends a deceptive email appearing to come from your university, urging you to click a link to reset your account password. What attack is this?",
    options: [
      "Denial of Service (DoS)",
      "Phishing",
      "Trojan injection",
      "Buffer overflow"
    ],
    correct: 1,
    explanation: "Phishing is a social engineering attack where an adversary mimics a trusted institution to manipulate the victim into revealing sensitive information, such as login credentials or financial details."
  },
  {
    topic: "Physical Security",
    question: "8. An unauthorized person closely follows an employee through an access-controlled security door without presenting a valid badge. What physical attack has occurred?",
    options: [
      "Dumpster Diving",
      "Tailgating (Piggybacking)",
      "Phishing",
      "Man-in-the-Middle Attack"
    ],
    correct: 1,
    explanation: "Tailgating (or piggybacking) is a physical social engineering breach where an unauthorized individual gains physical entry into a restricted area by trailing directly behind an authorized badge-holder."
  },
  {
    topic: "Ethical Hacking Basics",
    question: "9. What distinguishes an Ethical Hacker (White Hat) from an Unauthorized Hacker (Black Hat)?",
    options: [
      "Ethical hackers have written permission and authorization from the system owner to discover vulnerabilities legally.",
      "Ethical hackers never write code or use security tools.",
      "Ethical hackers sell stolen personal data on underground forums.",
      "There is no legal difference between ethical and unauthorized hacking."
    ],
    correct: 0,
    explanation: "Ethical hackers operate under explicit authorization, adhering to a defined code of ethics and legal frameworks to identify and help patch vulnerabilities before malicious actors exploit them."
  },
  {
    topic: "Windows Firewall",
    question: "10. What is the fundamental function of the Windows Firewall?",
    options: [
      "To speed up hard drive read and write operations.",
      "To monitor, filter, and control incoming and outgoing network traffic based on configured security rules.",
      "To automatically rewrite source code files.",
      "To delete temporary cookies from your web browser."
    ],
    correct: 1,
    explanation: "Windows Firewall acts as a network barrier, inspecting incoming packets to block unauthorized intrusion attempts and inspecting outgoing packets to prevent unauthorized outbound communication from rogue software."
  }
];

function initQuiz() {
  const container = document.getElementById("quizContainer");
  const submitBtn = document.getElementById("submitQuizBtn");
  const resetBtn = document.getElementById("resetQuizBtn");
  const resultBanner = document.getElementById("quizResultBanner");

  if (!container || !submitBtn) return;

  renderQuizQuestions(container);

  // Submit evaluation
  submitBtn.addEventListener("click", () => {
    let score = 0;

    // Step 1: Ensure all questions are answered
    let unansweredFound = false;
    quizQuestions.forEach((_, index) => {
      const qBlock = document.getElementById(`quiz-q-${index}`);
      const selected = container.querySelector(`input[name="quiz-q-${index}"]:checked`);
      if (!selected) {
        unansweredFound = true;
        qBlock.classList.add("unanswered");
      } else {
        qBlock.classList.remove("unanswered");
      }
    });

    if (unansweredFound) {
      alert("Please answer all 10 questions before submitting your evaluation.");
      return;
    }

    // Step 2: Grade answers and reveal explanations
    quizQuestions.forEach((item, index) => {
      const qBlock = document.getElementById(`quiz-q-${index}`);
      const selected = container.querySelector(`input[name="quiz-q-${index}"]:checked`);
      const explanationEl = document.getElementById(`quiz-exp-${index}`);
      const chosenIndex = parseInt(selected.value, 10);
      const optionLabels = qBlock.querySelectorAll(".quiz-choice-lbl");

      // Highlight correct answer in green
      optionLabels[item.correct].classList.add("correct");

      if (chosenIndex === item.correct) {
        score++;
      } else {
        // Highlight incorrect choice in red
        optionLabels[chosenIndex].classList.add("incorrect");
      }

      // Show explanation
      explanationEl.classList.add("visible");
    });

    // Lock inputs
    container.querySelectorAll("input[type='radio']").forEach(input => {
      input.disabled = true;
    });
    submitBtn.style.display = "none";
    resetBtn.style.display = "inline-flex";

    // Show result summary
    document.getElementById("quizFinalScore").textContent = `${score} / 10`;
    const percentage = (score / 10) * 100;
    let remark = "";
    if (percentage >= 80) {
      remark = "Defensive Competency Verified: Strong comprehension of foundational cyber defense concepts.";
    } else if (percentage >= 50) {
      remark = "Moderate Comprehension: Review the feedback points above to strengthen threat awareness.";
    } else {
      remark = "Remediation Recommended: Revisit the protection controls and retake the evaluation.";
    }
    document.getElementById("quizRemark").textContent = `${remark} (${percentage}%)`;
    resultBanner.classList.add("active");
    resultBanner.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });

  // Reset handler (Try Again)
  resetBtn.addEventListener("click", () => {
    container.innerHTML = "";
    renderQuizQuestions(container);
    submitBtn.style.display = "inline-flex";
    resetBtn.style.display = "none";
    resultBanner.classList.remove("active");
    container.scrollIntoView({ behavior: "smooth", block: "start" });
  });
}

function renderQuizQuestions(container) {
  quizQuestions.forEach((q, index) => {
    const unit = document.createElement("div");
    unit.className = "quiz-unit";
    unit.id = `quiz-q-${index}`;

    let optionsMarkup = "";
    q.options.forEach((optText, optIndex) => {
      optionsMarkup += `
        <label class="quiz-choice-lbl" data-option="${optIndex}">
          <input type="radio" name="quiz-q-${index}" value="${optIndex}">
          <span>${optText}</span>
        </label>
      `;
    });

    unit.innerHTML = `
      <div class="quiz-topic-indicator">CHECKPOINT // ${q.topic}</div>
      <div class="quiz-q-text">${q.question}</div>
      <div class="quiz-choices">
        ${optionsMarkup}
      </div>
      <div class="quiz-exp-box" id="quiz-exp-${index}">
        <strong>Security Explanation:</strong> ${q.explanation}
      </div>
    `;

    // Interactive styling for options
    const labels = unit.querySelectorAll(".quiz-choice-lbl");
    labels.forEach(label => {
      const radio = label.querySelector("input[type='radio']");
      radio.addEventListener("change", () => {
        labels.forEach(l => l.classList.remove("selected"));
        if (radio.checked) {
          label.classList.add("selected");
          unit.classList.remove("unanswered");
        }
      });
    });

    container.appendChild(unit);
  });
}
